import { render, screen, fireEvent } from "@testing-library/react";
import CardMovie from "./CardMovie";
import "@testing-library/jest-dom";

const movieMock = {
  tconst: "tt1234567",
  title: "Inception",
  original_title: "Origen",
  year: "2010",
  runtime: "148",
  genre: "Action, Sci-Fi",
};

const onHandleClickMock = jest.fn();

test("should render CardMovie component with correct content and handle click", () => {
  render(<CardMovie movie={movieMock} onHandleClick={onHandleClickMock} />);

  const title = screen.getByText(movieMock.title);
  expect(title).toBeInTheDocument();

  const yearAndGenre = screen.getByText(
    `${movieMock.year} - ${movieMock.genre}`
  );
  expect(yearAndGenre).toBeInTheDocument();

  const runtime = screen.getByText(`Runtime: ${movieMock.runtime} min`);
  expect(runtime).toBeInTheDocument();

  const card = screen.getByRole("button");
  fireEvent.click(card);
  expect(onHandleClickMock).toHaveBeenCalledTimes(1);
});
