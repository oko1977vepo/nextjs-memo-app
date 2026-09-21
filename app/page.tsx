import { ArrowDown, Feather, FolderClosed, Hash, NotebookPen, Tags } from "lucide-react";

export default function Home() {
  return (
    <div className="home-content">
      <section className="page-heading" id="notes" aria-labelledby="notes-title" tabIndex={-1}>
        <p className="eyebrow">YOUR NOTEBOOK</p>
        <div className="title-row"><h1 id="notes-title">すべてのメモ</h1><span className="count-badge">0 件</span></div>
        <p className="page-description">日々のひらめきや、大切にしておきたいことを。</p>
      </section>

      <section className="welcome-panel" id="getting-started" aria-labelledby="welcome-title" tabIndex={-1}>
        <div className="welcome-copy">
          <span className="welcome-label"><span />A FRESH PAGE</span>
          <h2 id="welcome-title">あなたの思考に、<br />余白を。</h2>
          <p>ふと思いついたアイデアも、忘れたくない言葉も。<br className="desktop-break" />ここは、あなたの「残しておきたい」が集まる場所。</p>
          <a className="text-link" href="#notebook-guide">ノートブックについて<ArrowDown size={15} aria-hidden="true" /></a>
        </div>
        <div className="paper-scene" aria-hidden="true">
          <div className="paper-back" />
          <div className="paper-front">
            <span className="paper-kicker">a little thought</span>
            <Feather className="paper-feather" size={34} strokeWidth={1} />
            <span className="paper-title">余白から、<br />はじまる。</span>
            <span className="paper-line" /><span className="paper-line short" />
            <span className="paper-footer">MAKE ROOM FOR IDEAS</span>
          </div>
          <span className="scene-label">Your next idea starts here.</span>
        </div>
      </section>

      <section className="memo-section" aria-labelledby="memo-list-title">
        <div className="section-heading"><h2 id="memo-list-title">メモ一覧</h2><span>0 件のメモ</span></div>
        <div className="empty-notes">
          <div className="empty-icon"><NotebookPen size={28} strokeWidth={1.35} aria-hidden="true" /></div>
          <h3>まだメモはありません</h3>
          <p>ここに、あなたの言葉が並んでいきます。</p>
          <span className="empty-caption">小さなひらめきから、少しずつ。</span>
        </div>
      </section>

      <div className="organize-grid">
        <section className="organize-panel" id="categories" aria-labelledby="categories-title" tabIndex={-1}>
          <div className="organize-heading"><span className="section-icon"><FolderClosed size={20} strokeWidth={1.5} aria-hidden="true" /></span><h2 id="categories-title">カテゴリ</h2><span className="subtle-count">0</span></div>
          <p>テーマごとに、すっきりと。</p>
          <div className="organize-empty">カテゴリはまだありません</div>
        </section>
        <section className="organize-panel" id="tags" aria-labelledby="tags-title" tabIndex={-1}>
          <div className="organize-heading"><span className="section-icon"><Tags size={20} strokeWidth={1.5} aria-hidden="true" /></span><h2 id="tags-title">タグ</h2><span className="subtle-count">0</span></div>
          <p>キーワードで、ゆるやかにつなぐ。</p>
          <div className="organize-empty"><Hash size={14} aria-hidden="true" />タグはまだありません</div>
        </section>
      </div>
      <aside className="notebook-guide" id="notebook-guide" aria-labelledby="guide-title" tabIndex={-1}>
        <span className="guide-symbol" aria-hidden="true">M<span>↓</span></span>
        <div><h2 id="guide-title">書くことに、心地よく集中。</h2><p>Markdown で書いて、読みやすく。カテゴリやタグで、自分らしく整理するノートブックへ。</p><span className="coming-soon">メモの編集・整理機能は、ただいま準備中です。</span></div>
      </aside>
    </div>
  );
}
