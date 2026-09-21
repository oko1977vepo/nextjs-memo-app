import { render, screen } from "@testing-library/react";
import Home from "@/app/page";

test("shows the memo workspace and its empty state", () => {
  render(<Home />);
  expect(screen.getByRole("heading", { level: 1, name: "すべてのメモ" })).toBeInTheDocument();
  expect(screen.getByRole("heading", { name: "まだメモはありません" })).toBeInTheDocument();
});

test("provides category and tag sections as navigation destinations", () => {
  render(<Home />);
  expect(screen.getByRole("region", { name: "カテゴリ" })).toHaveAttribute("id", "categories");
  expect(screen.getByRole("region", { name: "タグ" })).toHaveAttribute("id", "tags");
  expect(screen.getByText("カテゴリはまだありません")).toBeInTheDocument();
  expect(screen.getByText("タグはまだありません")).toBeInTheDocument();
});
