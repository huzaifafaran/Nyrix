import React from "react";
import {
  act,
  cleanup,
  fireEvent,
  render,
  screen,
} from "@testing-library/react";
import FooterBackground from "./FooterBackground";

let observerCallback;
let preference;
let connection;
let hidden;
let disconnect;
let play;
let pause;

beforeEach(() => {
  hidden = false;
  preference = {
    matches: false,
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
  };
  connection = {
    saveData: false,
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
  };
  Object.defineProperty(window, "matchMedia", {
    configurable: true,
    value: jest.fn(() => preference),
  });
  Object.defineProperty(navigator, "connection", {
    configurable: true,
    value: connection,
  });
  jest.spyOn(document, "hidden", "get").mockImplementation(() => hidden);
  disconnect = jest.fn();
  window.IntersectionObserver = jest.fn((callback) => {
    observerCallback = callback;
    return { observe: jest.fn(), disconnect };
  });
  play = jest
    .spyOn(HTMLMediaElement.prototype, "play")
    .mockImplementation(function () {
      this.dispatchEvent(new Event("play"));
      return Promise.resolve();
    });
  pause = jest
    .spyOn(HTMLMediaElement.prototype, "pause")
    .mockImplementation(function () {
      this.dispatchEvent(new Event("pause"));
    });
});

afterEach(() => {
  cleanup();
  jest.restoreAllMocks();
});

function enter() {
  act(() => observerCallback([{ isIntersecting: true }]));
}

test("defers video source until the footer enters view without visible motion controls", () => {
  const { container } = render(<FooterBackground />);
  expect(container.querySelector("video").getAttribute("src")).toBeNull();
  expect(play).not.toHaveBeenCalled();
  enter();
  expect(container.querySelector("video").getAttribute("src")).toBe(
    "/media/nyrix-footer.mp4",
  );
  expect(play).toHaveBeenCalled();
  expect(screen.queryByRole("button")).toBeNull();
});

test.each(["reduced motion", "save data"])(
  "keeps only a static poster for %s",
  (policy) => {
    if (policy === "reduced motion") preference.matches = true;
    else connection.saveData = true;
    const { container } = render(<FooterBackground />);
    enter();
    expect(container.querySelector("video")).toBeNull();
    expect(container.querySelector("img").getAttribute("src")).toBe(
      "/media/nyrix-footer-poster.webp",
    );
    expect(screen.queryByRole("button")).toBeNull();
    expect(play).not.toHaveBeenCalled();
  },
);

test("pauses offscreen and in hidden tabs, resumes only when visible", () => {
  render(<FooterBackground />);
  enter();
  act(() => observerCallback([{ isIntersecting: false }]));
  const offscreenCalls = play.mock.calls.length;
  hidden = true;
  fireEvent(document, new Event("visibilitychange"));
  enter();
  expect(play).toHaveBeenCalledTimes(offscreenCalls);
  hidden = false;
  fireEvent(document, new Event("visibilitychange"));
  expect(play.mock.calls.length).toBeGreaterThan(offscreenCalls);
  expect(pause).toHaveBeenCalled();
});

test("pauses and removes the observer when unmounted", () => {
  const { unmount } = render(<FooterBackground />);
  enter();
  pause.mockClear();
  unmount();
  expect(pause).toHaveBeenCalledTimes(1);
  expect(disconnect).toHaveBeenCalledTimes(1);
});

test("responds to reduced-motion changes while the film is playing", () => {
  const { container } = render(<FooterBackground />);
  enter();
  preference.matches = true;
  const update = preference.addEventListener.mock.calls.find(
    ([event]) => event === "change",
  )[1];
  act(() => update());
  expect(container.querySelector("video")).toBeNull();
  expect(screen.queryByRole("button")).toBeNull();
  expect(pause).toHaveBeenCalled();
});

test("falls back to the poster on a media error and cleans up subscriptions", () => {
  const { container, unmount } = render(<FooterBackground />);
  enter();
  fireEvent.error(container.querySelector("video"));
  expect(container.querySelector("video")).toBeNull();
  expect(container.querySelector("img")).toBeTruthy();
  expect(screen.queryByRole("button")).toBeNull();
  unmount();
  expect(disconnect).toHaveBeenCalled();
  expect(preference.removeEventListener).toHaveBeenCalledWith(
    "change",
    expect.any(Function),
  );
  expect(connection.removeEventListener).toHaveBeenCalledWith(
    "change",
    expect.any(Function),
  );
});

test("retains only the poster after autoplay rejection without exposing controls", async () => {
  play.mockImplementationOnce(() =>
    Promise.reject(new Error("autoplay blocked")),
  );
  const { container } = render(<FooterBackground />);
  await act(async () => enter());
  expect(container.querySelector("video")).toBeNull();
  expect(container.querySelector("img")).toBeTruthy();
  expect(screen.queryByRole("button")).toBeNull();
});
