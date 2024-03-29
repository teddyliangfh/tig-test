import { render, screen } from "@testing-library/react";
import Header from "..";

describe("Header component", () => {
  test("renders header with company name", () => {
    render(<Header />);
    expect(screen.getByText(/COMPANY CO./i)).toBeTruthy();
  });
});
