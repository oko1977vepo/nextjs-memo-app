"use client";

import Link from "next/link";
import { useRef, useState, useSyncExternalStore, type ReactNode } from "react";
import { ArrowUpRight, ChevronRight, CircleUserRound, FolderClosed, Menu, NotebookPen, PanelLeftClose, StickyNote, Tags } from "lucide-react";

const destinations = [
  { id: "notes", label: "すべてのメモ", icon: StickyNote },
  { id: "categories", label: "カテゴリ", icon: FolderClosed },
  { id: "tags", label: "タグ", icon: Tags },
];

function subscribeToHash(callback: () => void) {
  window.addEventListener("hashchange", callback);
  return () => window.removeEventListener("hashchange", callback);
}

function getSection() {
  return window.location.hash.slice(1) || "notes";
}

export function AppShell({ children }: { children: ReactNode }) {
  const [navigationOpen, setNavigationOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const section = useSyncExternalStore(subscribeToHash, getSection, () => "notes");

  return (
    <div className="app-shell" onKeyDown={(event) => {
      if (event.key === "Escape" && navigationOpen) {
        setNavigationOpen(false);
        toggleRef.current?.focus();
      }
    }}>
      <a className="skip-link" href="#main-content">本文へスキップ</a>
      <header className="app-header">
        <Link className="brand" href="/" aria-label="memo. ホーム">
          <span className="brand-icon"><NotebookPen size={21} strokeWidth={1.6} aria-hidden="true" /></span>
          <span>memo<span className="brand-dot">.</span></span>
        </Link>
        <div className="header-content">
          <div className="breadcrumb"><span>マイスペース</span><ChevronRight size={14} aria-hidden="true" /><span>ノートブック</span></div>
          <span className="guest"><CircleUserRound size={20} strokeWidth={1.5} aria-hidden="true" /><span>ゲスト</span></span>
          <button className="navigation-toggle" ref={toggleRef} type="button" aria-label={navigationOpen ? "ナビゲーションを閉じる" : "ナビゲーションを開く"} aria-expanded={navigationOpen} aria-controls="workspace-sidebar" onClick={() => setNavigationOpen(!navigationOpen)}>
            {navigationOpen ? <PanelLeftClose size={21} aria-hidden="true" /> : <Menu size={21} aria-hidden="true" />}
          </button>
        </div>
      </header>
      <aside className={`sidebar${navigationOpen ? " is-open" : ""}`} id="workspace-sidebar">
        <div className="sidebar-top">
          <p className="sidebar-label">ワークスペース</p>
          <nav aria-label="ワークスペース">
            {destinations.map(({ id, label, icon: Icon }) => (
              <a className="nav-link" key={id} href={`/#${id}`} aria-current={section === id ? "location" : undefined} onClick={() => setNavigationOpen(false)}>
                <Icon size={19} strokeWidth={1.65} aria-hidden="true" /><span>{label}</span>
              </a>
            ))}
          </nav>
          <div className="sidebar-note"><span className="small-rule" /><p>考えるための、<br />小さな余白。</p></div>
        </div>
        <div className="sidebar-bottom">
          <Link className="guide-link" href="/#getting-started" onClick={() => setNavigationOpen(false)}><NotebookPen size={17} aria-hidden="true" />このノートブックについて<ArrowUpRight size={14} aria-hidden="true" /></Link>
          <p className="sidebar-signature">A LITTLE SPACE FOR YOUR MIND</p>
        </div>
      </aside>
      <div className="workspace">
        <main id="main-content" tabIndex={-1}>{children}</main>
        <footer className="app-footer"><span>ひらめきも、日々のことも。</span><span>ひとつずつ、ここに。</span></footer>
      </div>
    </div>
  );
}
