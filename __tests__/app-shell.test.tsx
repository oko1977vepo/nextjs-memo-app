import { fireEvent, render, screen, within } from "@testing-library/react";
import { AppShell } from "@/components/layout/app-shell";

test("provides shared landmarks and a skip link for page content", () => {
  render(<AppShell><h1>ページの内容</h1></AppShell>);
  expect(screen.getByRole("banner")).toBeInTheDocument();
  expect(within(screen.getByRole("main")).getByRole("heading", { name: "ページの内容" })).toBeInTheDocument();
  expect(screen.getByRole("link", { name: "本文へスキップ" })).toHaveAttribute("href", "#main-content");
  const nav = screen.getByRole("navigation", { name: "ワークスペース" });
  expect(within(nav).getByRole("link", { name: "カテゴリ" })).toHaveAttribute("href", "/#categories");
  expect(within(nav).getByRole("link", { name: "タグ" })).toHaveAttribute("href", "/#tags");
});

test("opens navigation and closes it with Escape, returning keyboard focus", () => {
  render(<AppShell>内容</AppShell>);
  const toggle = screen.getByRole("button", { name: "ナビゲーションを開く" });
  expect(toggle).toHaveAttribute("aria-expanded", "false");
  fireEvent.click(toggle);
  expect(toggle).toHaveAttribute("aria-expanded", "true");
  const link = screen.getByRole("link", { name: "カテゴリ" });
  link.focus();
  fireEvent.keyDown(link, { key: "Escape" });
  expect(toggle).toHaveAttribute("aria-expanded", "false");
  expect(toggle).toHaveFocus();
});

test("closes mobile navigation when a destination is selected", () => {
  render(<AppShell>内容</AppShell>);
  const toggle = screen.getByRole("button", { name: "ナビゲーションを開く" });
  fireEvent.click(toggle);
  fireEvent.click(screen.getByRole("link", { name: "タグ" }));
  expect(toggle).toHaveAttribute("aria-expanded", "false");
});
