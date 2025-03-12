import { render, screen } from "@testing-library/react";
import PrincipalCard from "./PrincipalCard";
import "@testing-library/jest-dom";

const principalMock = {
  id: 1,
  category: "Lead Actor",
  characters: ["John Doe", "Jane Doe"],
  tconst: "tt1234567",
  nconst: "nm1234567",
};

const actorNameMock = "Robert Downey Jr.";

test("should render PrincipalCard component correctly", () => {
  render(<PrincipalCard principal={principalMock} actorName={actorNameMock} />);
  const actorName = screen.getByText(actorNameMock);
  const category = screen.getByText(principalMock.category);
  const characters = screen.getByText(principalMock.characters.join(", "));
  expect(actorName).toBeInTheDocument();
  expect(category).toBeInTheDocument();
  expect(characters).toBeInTheDocument();
});

test("should not render Characters if empty or undefined", () => {
  const principalMockWithoutCharacters = {
    ...principalMock,
    characters: [],
  };

  render(
    <PrincipalCard
      principal={principalMockWithoutCharacters}
      actorName={actorNameMock}
    />
  );

  const characters = screen.queryByText(/Characters:/i);
  expect(characters).toBeNull();
});
