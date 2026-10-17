import React, { useEffect, useRef, useState } from "react";
import "./HeroRibbon.css";

// Original campaign media is gently deformed on the GPU; copy remains real HTML.
const vertex = `attribute vec2 position; varying vec2 uv;
void main(){ uv=position*.5+.5; gl_Position=vec4(position,0.,1.); }`;
const fragment = `precision mediump float;
varying vec2 uv; uniform sampler2D artwork; uniform float time;
uniform float aspect; uniform float imageAspect;
void main(){
  vec2 p=(uv-.5)*vec2(min(1.,aspect/imageAspect),min(1.,imageAspect/aspect))+.5;
  float weight=smoothstep(.30,.85,p.x);
  p.x+=weight*.022*sin(p.y*7.0+time*.31)*sin(time*.19);
  p.y+=weight*.035*sin(p.x*6.0-time*.26)*sin(time*.23);
  gl_FragColor=texture2D(artwork,clamp(p,.001,.999));
}`;

export default function HeroRibbon() {
  const canvas = useRef(null);
  const draw = useRef(null);
  const clock = useRef(0);
  const [ready, setReady] = useState(false);
  const [permitted, setPermitted] = useState(false);
  const [visible, setVisible] = useState(true);
  const [hidden, setHidden] = useState(document.hidden);

  useEffect(() => {
    const preference = window.matchMedia?.("(prefers-reduced-motion: reduce)");
    const update = () =>
      setPermitted(!preference?.matches && !navigator.connection?.saveData);
    update();
    preference?.addEventListener?.("change", update);
    navigator.connection?.addEventListener?.("change", update);
    const visibility = () => setHidden(document.hidden);
    document.addEventListener("visibilitychange", visibility);
    const observer = window.IntersectionObserver
      ? new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting))
      : null;
    observer?.observe(canvas.current);
    return () => {
      preference?.removeEventListener?.("change", update);
      navigator.connection?.removeEventListener?.("change", update);
      document.removeEventListener("visibilitychange", visibility);
      observer?.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!permitted || !window.WebGLRenderingContext) return undefined;
    const element = canvas.current;
    let gl;
    try {
      gl = element.getContext("webgl", {
        alpha: false,
        antialias: false,
        depth: false,
      });
    } catch {
      return undefined;
    }
    if (!gl) return undefined;
    let disposed = false;
    const shaders = [];
    let program, buffer, texture, resize;
    function compile(type, source) {
      const shader = gl.createShader(type);
      shaders.push(shader);
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS))
        throw new Error("Shader unavailable");
      return shader;
    }
    function contextLost(event) {
      event.preventDefault();
      setReady(false);
      draw.current = null;
    }
    element.addEventListener("webglcontextlost", contextLost);
    try {
      program = gl.createProgram();
      gl.attachShader(program, compile(gl.VERTEX_SHADER, vertex));
      gl.attachShader(program, compile(gl.FRAGMENT_SHADER, fragment));
      gl.linkProgram(program);
      if (!gl.getProgramParameter(program, gl.LINK_STATUS))
        throw new Error("Program unavailable");
      gl.useProgram(program);
      buffer = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
      gl.bufferData(
        gl.ARRAY_BUFFER,
        new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
        gl.STATIC_DRAW,
      );
      const position = gl.getAttribLocation(program, "position");
      gl.enableVertexAttribArray(position);
      gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);
      texture = gl.createTexture();
      gl.bindTexture(gl.TEXTURE_2D, texture);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
      const timeUniform = gl.getUniformLocation(program, "time");
      const aspectUniform = gl.getUniformLocation(program, "aspect");
      const imageAspectUniform = gl.getUniformLocation(program, "imageAspect");
      const image = new Image();
      image.onload = () => {
        if (disposed) return;
        gl.bindTexture(gl.TEXTURE_2D, texture);
        gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
        gl.texImage2D(
          gl.TEXTURE_2D,
          0,
          gl.RGB,
          gl.RGB,
          gl.UNSIGNED_BYTE,
          image,
        );
        gl.uniform1f(imageAspectUniform, image.width / image.height);
        draw.current = (time) => {
          gl.viewport(0, 0, element.width, element.height);
          gl.uniform1f(aspectUniform, element.width / element.height);
          gl.uniform1f(timeUniform, time);
          gl.drawArrays(gl.TRIANGLES, 0, 6);
        };
        const size = () => {
          const box = element.getBoundingClientRect();
          const ratio = Math.min(
            window.devicePixelRatio || 1,
            1.5,
            1920 / Math.max(box.width, 1),
          );
          element.width = Math.max(1, Math.round(box.width * ratio));
          element.height = Math.max(1, Math.round(box.height * ratio));
          draw.current?.(clock.current);
        };
        if (window.ResizeObserver) {
          resize = new ResizeObserver(size);
          resize.observe(element);
        } else {
          window.addEventListener("resize", size);
          resize = {
            disconnect: () => window.removeEventListener("resize", size),
          };
        }
        size();
        setReady(true);
      };
      image.src =
        window.innerWidth <= 768
          ? "/media/nyrix-violet-ribbon-950.webp"
          : "/media/nyrix-violet-ribbon-1900.webp";
    } catch {
      setReady(false);
    }
    return () => {
      disposed = true;
      setReady(false);
      draw.current = null;
      resize?.disconnect();
      element.removeEventListener("webglcontextlost", contextLost);
      if (texture) gl.deleteTexture(texture);
      if (buffer) gl.deleteBuffer(buffer);
      if (program) gl.deleteProgram(program);
      shaders.forEach((shader) => gl.deleteShader(shader));
    };
  }, [permitted]);

  useEffect(() => {
    if (!ready || !permitted || !visible || hidden) return undefined;
    let frame, previous;
    function animate(now) {
      if (previous === undefined) previous = now;
      if (now - previous >= 1000 / 30) {
        clock.current += Math.min(now - previous, 100) / 1000;
        previous = now;
        draw.current?.(clock.current);
      }
      frame = requestAnimationFrame(animate);
    }
    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [ready, permitted, visible, hidden]);

  return (
    <>
      <div className="hero-ribbon-art" aria-hidden="true">
        <img
          src="/media/nyrix-violet-ribbon-1900.webp"
          srcSet="/media/nyrix-violet-ribbon-950.webp 950w, /media/nyrix-violet-ribbon-1900.webp 1900w"
          sizes="100vw"
          width="1900"
          height="826"
          alt=""
          fetchpriority="high"
        />
        <canvas ref={canvas} className={ready ? "is-ready" : ""} />
      </div>
    </>
  );
}
