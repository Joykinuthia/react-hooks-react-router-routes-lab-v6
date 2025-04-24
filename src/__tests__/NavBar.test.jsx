import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import NavBar from "../components/NavBar";

function renderWithRouter(route = "/") {
  render(
    <MemoryRouter initialEntries={[route]}>
      <NavBar />
    </MemoryRouter>
  );
}

test("renders Home <NavLink>", () => {
  renderWithRouter("/");
  const homeLink = screen.getByTestId("home-link");
  expect(homeLink).toBeInTheDocument();
  expect(homeLink).toHaveAttribute("href", "/");
  expect(homeLink).toHaveTextContent("Home");
});

test("renders Actors <NavLink>", () => {
  renderWithRouter("/actors");
  const actorsLink = screen.getByTestId("actors-link");
  expect(actorsLink).toBeInTheDocument();
  expect(actorsLink).toHaveAttribute("href", "/actors");
  expect(actorsLink).toHaveTextContent("Actors");
});

test("renders Directors <NavLink>", () => {
  renderWithRouter("/directors");
  const directorsLink = screen.getByTestId("directors-link");
  expect(directorsLink).toBeInTheDocument();
  expect(directorsLink).toHaveAttribute("href", "/directors");
  expect(directorsLink).toHaveTextContent("Directors");
});