import React from "react";
import { render, within } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Footer from "./Footer";

it("keeps the complete directory beneath the new artwork without the old video", () => {
  const { container } = render(<MemoryRouter><Footer /></MemoryRouter>);
  const footer = within(container.querySelector("footer"));
  expect(footer.getByRole("heading", { name: "Bring us the problem." })).toBeTruthy();
  expect(footer.getByRole("link", { name: /Talk to our team/ }).getAttribute("href")).toBe("/contact");
  expect(footer.getAllByRole("navigation")).toHaveLength(4);
  for (const destination of ["Kinlu", "Artifex", "Numaya", "Veeko", "Agent library", "Our team", "Our advisors", "The Next Question", "Privacy policy"]) {
    expect(footer.getByRole("link", { name: destination })).toBeTruthy();
  }
  expect(footer.getByText(/Decision sciences, AI systems and intelligent workflows/)).toBeTruthy();
  expect(footer.getByText(/Beyond insight. Into foresight./)).toBeTruthy();
  expect(footer.getByRole("link", { name: "Nyrix on LinkedIn" })).toBeTruthy();
  expect(footer.getByRole("link", { name: "Nyrix AI on YouTube" })).toBeTruthy();
  expect(container.querySelector("video")).toBeNull();
  expect(container.querySelector(".footer-background")).toBeNull();
});
