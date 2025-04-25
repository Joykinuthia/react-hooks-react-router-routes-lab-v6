import React from "react";
import "@testing-library/jest-dom";
import { render, screen, act } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Home from "../pages/Home";
import { mockMovies } from "./testData";
import { vi } from "vitest";

describe("Home Component", () => {
  beforeEach(() => {
    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockMovies),
      })
    );
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("renders without any errors", async () => {
    await act(async () => {
      render(
        <MemoryRouter>
          <Home />
        </MemoryRouter>
      );
    });
  });

  it("renders the NavBar component", async () => {
    await act(async () => {
      render(
        <MemoryRouter>
          <Home />
        </MemoryRouter>
      );
    });
    const navBar = await screen.findByRole("navigation");
    expect(navBar).toBeInTheDocument();
  });

  it("renders the Home Page heading", async () => {
    await act(async () => {
      render(
        <MemoryRouter>
          <Home />
        </MemoryRouter>
      );
    });
    const heading = await screen.findByText("Home Page");
    expect(heading).toBeInTheDocument();
    expect(heading.tagName).toBe("H1");
  });

  it("renders a MovieCard for each movie", async () => {
    await act(async () => {
      render(
        <MemoryRouter>
          <Home />
        </MemoryRouter>
      );
    });
    for (const movie of mockMovies) {
      const title = await screen.findByText(movie.title);
      expect(title).toBeInTheDocument();
    }
  });
});