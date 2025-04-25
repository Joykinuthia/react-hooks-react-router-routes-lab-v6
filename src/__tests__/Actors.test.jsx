import React from "react";
import { render, screen, act } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Actors from "../pages/Actors";
import { mockActors } from "./testData";
import { vi } from "vitest";

describe("Actors Component", () => {
  beforeEach(() => {
    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockActors),
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
          <Actors />
        </MemoryRouter>
      );
    });
  });

  it("renders the NavBar component", async () => {
    await act(async () => {
      render(
        <MemoryRouter>
          <Actors />
        </MemoryRouter>
      );
    });
    const navBar = await screen.findByRole("navigation");
    expect(navBar).toBeInTheDocument();
  });

  it("renders the Actors Page heading", async () => {
    await act(async () => {
      render(
        <MemoryRouter>
          <Actors />
        </MemoryRouter>
      );
    });
    const heading = await screen.findByText("Actors Page");
    expect(heading).toBeInTheDocument();
    expect(heading.tagName).toBe("H1");
  });

  it("renders each actor's name", async () => {
    await act(async () => {
      render(
        <MemoryRouter>
          <Actors />
        </MemoryRouter>
      );
    });
    for (const actor of mockActors) {
      const name = await screen.findByText(actor.name);
      expect(name).toBeInTheDocument();
    }
  });

  it("renders a <li /> for each movie", async () => {
    await act(async () => {
      render(
        <MemoryRouter>
          <Actors />
        </MemoryRouter>
      );
    });
    for (const actor of mockActors) {
      for (const movie of actor.movies) {
        const li = await screen.findByText(movie);
        expect(li).toBeInTheDocument();
        expect(li.tagName).toBe("LI");
      }
    }
  });
});