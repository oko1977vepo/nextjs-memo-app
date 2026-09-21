import { render, screen } from "@testing-library/react";
import Home from "@/app/page";

test("renders the home page", () => {
  render(<Home />);

  expect(screen.getByRole("heading", { level: 1 })).toBeInTheDocument();
});
