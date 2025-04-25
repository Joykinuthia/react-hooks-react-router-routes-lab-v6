import React from "react";
import { render, screen, act } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import Movie from "../pages/Movie";
import { mockMovies } from "./testData";
import { vi } from "vitest";

describe("Movie Component", () => {
  const renderMovie = (movieId) => {
    return render(
      <MemoryRouter initialEntries={[`/movie/${movieId}`]}>
        <Routes>
          <Route path="/movie/:id" element={<Movie />} />
        </Routes>
      </MemoryRouter>
    );
  };

  beforeEach(() => {
    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockMovies[0]),
      })
    );
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("renders without any errors", async () => {
    await act(async () => {
      renderMovie(1);
    });
  });

  it("renders movie's title in an h1", async () => {
    await act(async () => {
      renderMovie(1);
    });
    const title = await screen.findByText(mockMovies[0].title);
    expect(title).toBeInTheDocument();
    expect(title.tagName).toBe("H1");
  });

  it("renders movie's time within a p tag", async () => {
    await act(async () => {
      renderMovie(1);
    });
    const time = await screen.findByText(mockMovies[0].time.toString());
    expect(time).toBeInTheDocument();
    expect(time.tagName).toBe("P");
  });

  it("renders a span for each genre", async () => {
    await act(async () => {
      renderMovie(1);
    });
    for (const genre of mockMovies[0].genres) {
      const genreElement = await screen.findByText(genre);
      expect(genreElement).toBeInTheDocument();
      expect(genreElement.tagName).toBe("SPAN");
    }
  });

  it("renders the <NavBar /> component", async () => {
    await act(async () => {
      renderMovie(1);
    });
    const navBar = await screen.findByRole("navigation");
    expect(navBar).toBeInTheDocument();
  });
});