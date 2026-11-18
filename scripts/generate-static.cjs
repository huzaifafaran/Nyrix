"use strict";

// Build-time rendering of the actual app. No browser, HTTP request, provider or DOM shim.
process.env.NODE_ENV ||= "production";
const fs = require("node:fs");
const path = require("node:path");
const Module = require("node:module");
const { PassThrough } = require("node:stream");
const parse5 = require("parse5");
const ROOT = path.resolve(__dirname, "..");
const BUILD = path.join(ROOT, "build");

let appModules;
function loadApp() {
  if (appModules) return appModules;
  const babel = require("@babel/core");
  const originalJs = Module._extensions[".js"];
  const sourcePrefix = path.join(ROOT, "src") + path.sep;
  Module._extensions[".css"] = () => {};
  Module._extensions[".js"] = function compileSource(module, filename) {
    if (!filename.startsWith(sourcePrefix)) return originalJs(module, filename);
    const transformed = babel.transformSync(fs.readFileSync(filename, "utf8"), {
      filename, babelrc: false, configFile: false, sourceMaps: false,
      presets: [
        [require.resolve("@babel/preset-env"), { targets: { node: "current" }, modules: "commonjs" }],
        [require.resolve("@babel/preset-react"), { runtime: "automatic" }],
      ],
      plugins: [require.resolve("@babel/plugin-transform-dynamic-import")],
    });
    module._compile(transformed.code, filename);
  };
  appModules = {
    React: require("react"),
    renderToPipeableStream: require("react-dom/server").renderToPipeableStream,
    StaticRouter: require("react-router-dom/server").StaticRouter,
    App: require(path.join(ROOT, "src/App.js")).default,
    ...require(path.join(ROOT, "src/content/pageMetadata.js")),
  };
  return appModules;
}

async function renderRoute(pathname) {
  const { React, renderToPipeableStream, StaticRouter, App } = loadApp();
  return new Promise((resolve, reject) => {
    const destination = new PassThrough();
    const chunks = [];
    let renderError;
    let timer;
    destination.on("data", chunk => chunks.push(chunk));
    destination.on("error", reject);
    destination.on("end", () => {
      clearTimeout(timer);
      if (renderError) reject(renderError);
      else resolve(Buffer.concat(chunks).toString("utf8"));
    });
    const stream = renderToPipeableStream(
      React.createElement(StaticRouter, { location: pathname }, React.createElement(App, { staticRender: true })),
      {
        onAllReady() { stream.pipe(destination); },
        onShellError(error) { clearTimeout(timer); reject(error); },
        onError(error) { renderError = error; },
      },
    );
    timer = setTimeout(() => { stream.abort(); reject(new Error(`Static render timed out: ${pathname}`)); }, 15000);
    timer.unref?.();
  });
}

function find(node, predicate) {
  if (predicate(node)) return node;
  for (const child of node.childNodes || []) {
    const match = find(child, predicate);
    if (match) return match;
  }
  return null;
}
const attr = (node, name) => node.attrs?.find(attribute => attribute.name === name)?.value;
const escapeText = text => String(text).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

function composeDocument(template, markup, metadata, stylesheets = []) {
  const document = parse5.parse(template);
  const head = find(document, node => node.tagName === "head");
  const root = find(document, node => attr(node, "id") === "root");
  if (!head || !root) throw new Error("CRA template must contain a head and #root");
  // Replacing the root also makes a re-run safe when index.html already contains Home.
  root.childNodes = parse5.parseFragment(markup).childNodes;
  root.childNodes.forEach(child => { child.parentNode = root; });
  root.attrs = root.attrs.filter(attribute => attribute.name !== "data-prerendered");
  root.attrs.push({ name: "data-prerendered", value: "true" });
  const names = new Set(["description", "robots", "twitter:card", "twitter:title", "twitter:description", "twitter:image"]);
  const properties = new Set(["og:type", "og:title", "og:description", "og:url", "og:image"]);
  head.childNodes = head.childNodes.filter(node => node.tagName !== "title"
    && !(node.tagName === "link" && attr(node, "rel") === "canonical")
    && !(stylesheets.length && node.tagName === "link" && attr(node, "rel") === "stylesheet"
      && (stylesheets.includes(attr(node, "href")) || attr(node, "href")?.startsWith("/static/css/")))
    && !(node.tagName === "meta" && (names.has(attr(node, "name")) || properties.has(attr(node, "property")))));
  const tags = [
    // CRA normally loads lazy-family CSS with its JS. Static HTML needs those
    // scoped styles at first paint, including when JavaScript is disabled.
    ...stylesheets.map(href => `<link rel="stylesheet" href="${escapeText(href)}">`),
    `<title>${escapeText(metadata.title)}</title>`,
    `<meta name="description" content="${escapeText(metadata.description)}">`,
    `<meta name="robots" content="${escapeText(metadata.robots)}">`,
    ...(metadata.canonical ? [`<link rel="canonical" href="${escapeText(metadata.canonical)}">`] : []),
    ...Object.entries({ "og:type": "website", "og:title": metadata.title, "og:description": metadata.description, "og:url": metadata.url, "og:image": metadata.image })
      .map(([key, value]) => `<meta property="${key}" content="${escapeText(value)}">`),
    ...Object.entries({ "twitter:card": "summary_large_image", "twitter:title": metadata.title, "twitter:description": metadata.description, "twitter:image": metadata.image })
      .map(([key, value]) => `<meta name="${key}" content="${escapeText(value)}">`),
  ];
  for (const node of parse5.parseFragment(tags.join("")).childNodes) { node.parentNode = head; head.childNodes.push(node); }
  return "<!DOCTYPE html>" + parse5.serialize(document).replace(/^<!DOCTYPE html>/i, "");
}

async function generateStatic({ outputDirectory = BUILD, templatePath = path.join(BUILD, "index.html") } = {}) {
  const { pageMetadata, getPageMetadata } = loadApp();
  // Keep one immutable template in memory throughout this run. Nothing is cached on C:.
  const template = fs.readFileSync(templatePath, "utf8");
  const manifest = JSON.parse(fs.readFileSync(path.join(path.dirname(templatePath), "asset-manifest.json"), "utf8"));
  const css = [...new Set(Object.values(manifest.files).filter(value => typeof value === "string" && value.endsWith(".css")))];
  const mainCss = manifest.files["main.css"];
  // Main preserves the shared-system baseline; all five currently emitted lazy
  // families are class-scoped. No assumptions about changing chunk IDs are needed.
  const stylesheets = [mainCss, ...css.filter(href => href !== mainCss).sort()].filter(Boolean);
  const sitemap = fs.readFileSync(path.join(ROOT, "public/sitemap.xml"), "utf8");
  const sitemapPaths = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(match => new URL(match[1]).pathname);
  if (JSON.stringify([...sitemapPaths].sort()) !== JSON.stringify(Object.keys(pageMetadata).sort())) {
    throw new Error("Static metadata and sitemap route sets differ");
  }
  const emitted = [];
  for (const pathname of sitemapPaths) {
    const markup = await renderRoute(pathname);
    const file = path.join(outputDirectory, pathname === "/" ? "index.html" : pathname.slice(1), pathname === "/" ? "" : "index.html");
    fs.mkdirSync(path.dirname(file), { recursive: true });
    fs.writeFileSync(file, composeDocument(template, markup, getPageMetadata(pathname), stylesheets));
    emitted.push(pathname);
  }
  const notFound = composeDocument(template, await renderRoute("/404"), getPageMetadata("/404"), stylesheets);
  fs.writeFileSync(path.join(outputDirectory, "404.html"), notFound);
  console.log(`Static HTML generated: ${emitted.length} canonical pages + useful noindex 404`);
  return emitted;
}

module.exports = { composeDocument, generateStatic, loadApp, renderRoute };
if (require.main === module) generateStatic().catch(error => { console.error(error); process.exitCode = 1; });
