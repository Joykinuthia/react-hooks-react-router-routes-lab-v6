import "@testing-library/jest-dom";
import { RouterProvider, createMemoryRouter} from "react-router-dom"
import { render, screen, waitFor } from "@testing-library/react";
import routes from "../routes";

const mockMovie = {
  id: 1,
  title: "Doctor Strange",
  time: "115",
  genres: ["Action", "Adventure", "Fantasy"]
};

const router = createMemoryRouter(routes, {
  initialEntries: [`/movie/${mockMovie.id}`],
  initialIndex: 0
});

beforeEach(() => {
  global.fetch.mockImplementation(() =>
    Promise.resolve({
      ok: true,
      json: () => Promise.resolve(mockMovie),
    })
  );
});

test("renders without any errors", () => {
  const errorSpy = vi.spyOn(global.console, "error");

  render(<RouterProvider router={router}/>);

  expect(errorSpy).not.toHaveBeenCalled();

  errorSpy.mockRestore();
});

test("renders movie's title in an h1", async () => {
  render(<RouterProvider router={router} />);
  const h1 = await screen.findByText(mockMovie.title);
  expect(h1).toBeInTheDocument();
  expect(h1.tagName).toBe("H1");
});

test("renders movie's time within a p tag", async () => {
  render(<RouterProvider router={router} />);
  const p = await screen.findByText(mockMovie.time);
  expect(p).toBeInTheDocument();
  expect(p.tagName).toBe("P");
});

test("renders a span for each genre", async () => {
  render(<RouterProvider router={router} />);
  
  await waitFor(() => {
    mockMovie.genres.forEach(genre => {
      const span = screen.getByText(genre);
      expect(span).toBeInTheDocument();
      expect(span.tagName).toBe("SPAN");
    });
  });
});

test("renders the <NavBar /> component", async () => {
  render(<RouterProvider router={router}/>);
  expect(await screen.findByRole("navigation")).toBeInTheDocument();
});