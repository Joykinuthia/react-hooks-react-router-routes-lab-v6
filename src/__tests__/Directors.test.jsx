import React from "react";
import { render, screen, act } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Directors from "../pages/Directors";
import { mockDirectors } from "./testData";
import { vi } from "vitest";

describe("Directors Component", () => {
  beforeEach(() => {
    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockDirectors),
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
          <Directors />
        </MemoryRouter>
      );
    });
  });

  it("renders the NavBar component", async () => {
    await act(async () => {
      render(
        <MemoryRouter>
          <Directors />
        </MemoryRouter>
      );
    });
    const navBar = await screen.findByRole("navigation");
    expect(navBar).toBeInTheDocument();
  });

  it("renders the Directors Page heading", async () => {
    await act(async () => {
      render(
        <MemoryRouter>
          <Directors />
        </MemoryRouter>
      );
    });
    const heading = await screen.findByText("Directors Page");
    expect(heading).toBeInTheDocument();
    expect(heading.tagName).toBe("H1");
  });

  it("renders each director's name", async () => {
    await act(async () => {
      render(
        <MemoryRouter>
          <Directors />
        </MemoryRouter>
      );
    });
    for (const director of mockDirectors) {
      const name = await screen.findByText(director.name);
      expect(name).toBeInTheDocument();
    }
  });

  it("renders a <li /> for each movie", async () => {
    await act(async () => {
      render(
        <MemoryRouter>
          <Directors />
        </MemoryRouter>
      );
    });
    for (const director of mockDirectors) {
      for (const movie of director.movies) {
        const li = await screen.findByText(movie);
        expect(li).toBeInTheDocument();
        expect(li.tagName).toBe("LI");
      }
    }
  });
});