import type { Metadata } from "next";
import { AppShell } from "@/components/layout/app-shell";
import "./globals.css";

export const metadata: Metadata = {
  title: { default: "memo. | あなたの思考に、余白を。", template: "%s | memo." },
  description: "日々のひらめきや大切なことを、すっきりと。あなたのためのノートブック。",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ja">
      <body><AppShell>{children}</AppShell></body>
    </html>
  );
}
