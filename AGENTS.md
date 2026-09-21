<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## デザインシステムの参照（必須）

- 各タスクの開始時に、必ず [デザインシステム](docs/design-system.md) を読み、アプリ共通のデザイン基準を確認する。
- 機能要件・UI・ページを追加または変更する際は、同ガイドと関連する既存実装を参照し、共通レイアウト・部品・スタイルを優先して再利用する。
- ページ単位で独自の配色、書体、余白、角丸、操作パターンを増やさない。新たな共通パターンが必要な場合は共通定義を追加し、既存画面との一貫性を確認する。
- UI 変更時は同ガイドの確認手順に従い、PC・モバイル、ライト・ダーク、キーボード操作、関連する表示状態を確認する。確認できなかった事項は完了報告に明記する。
- 共通デザインの仕様を変更・追加した際は、実装と `docs/design-system.md` を同じタスクで更新する。ユーザーから明示された変更方針を優先し、ガイドもそれに合わせる。

## Required Checks After Changes

- After any repository change, including documentation or configuration changes, run both `npm run typecheck` and `npm run lint` from the repository root before reporting completion.
- Fix errors introduced by the changes and rerun both checks after any further edits.
- Report the results of both checks in the final response. If a check cannot run or an existing error remains, clearly state the reason and do not claim that verification passed.

## Using Jest

- Run commands from the repository root: `npm test` runs the test suite once; `npm run test:watch` watches for changes during development.
- Run a specific test file with `npm test -- --runTestsByPath __tests__/page.test.tsx`. Use `npm test -- --runInBand` when tests need to run serially.
- Place tests in `__tests__/` using `.test.ts` for logic and `.test.tsx` for React components. See `__tests__/page.test.tsx` for an existing example.
- Use React Testing Library (`@testing-library/react`) to render components and query their output. `jest.setup.ts` loads `@testing-library/jest-dom` globally, so matchers such as `toBeInTheDocument()` are available without additional imports.
- `jest.config.mjs` uses `next/jest`, the `jsdom` environment, and the `@/` alias mapped to the repository root. Keep shared test setup in `jest.setup.ts`.
- Jest supports synchronous Server Components and Client Components. Use E2E tests for async Server Components; see `node_modules/next/dist/docs/01-app/02-guides/testing/jest.md` for the local Next.js guide.
- After changing application code or tests, run the relevant Jest tests and report the results. Jest does not replace the required typecheck and lint checks above.

## Test-Driven Development

- Use test-driven development (TDD) for new features and bug fixes. Before changing implementation code, write or update a test that describes the expected behavior; for bug fixes, first add a regression test that reproduces the bug.
- Follow the Red-Green-Refactor cycle in small steps:
  1. Red: Run the test and confirm that it fails for the expected missing behavior or bug, not because of an unrelated setup or syntax error.
  2. Green: Write the minimum implementation needed to make the test pass, then run the relevant tests.
  3. Refactor: Improve the implementation and tests while preserving behavior, then rerun the relevant tests to confirm they still pass.
- Test observable behavior rather than implementation details. Use Jest and React Testing Library where supported, and E2E tests for async Server Components as described above.
- For behavior-preserving refactoring, first confirm that existing tests pass and add any missing coverage before changing the implementation. Documentation-only changes do not require new tests.
- Before reporting implementation work complete, run the full Jest suite, typecheck, and lint, and report their results. If a check cannot run, explain why and do not claim it passed.

## プロジェクトの目的と機能計画

このリポジトリでは、Next.js と Supabase を使ったメモアプリを開発する。
以下はユーザーと共有している機能・デザイン方針であり、今後の実装時の前提とする。
各タスクでは依頼された範囲を実装し、予定の機能を実装済みとして扱わない。

### 実現する機能

- メモの作成・一覧表示・閲覧・編集・削除と、Supabase への永続化。
- メモにカテゴリを付け、テーマごとに整理する機能。
- メモにタグを付け、キーワードで整理する機能。
- Markdown 形式でのメモ入力と、表示時の適切な変換・整形。入力内容を安全に表示できるレンダリング方法を採用する。
- ユーザー認証。ユーザーごとのメモ管理に合わせ、アクセス制御と Supabase の Row Level Security（RLS）を実装する。

認証方式・プロバイダー、テーブルの詳細設計、カテゴリとメモの関連数、
Markdown の対応構文や編集 UI の詳細は未確定。既に決定済みとみなさず、
該当機能を実装する際に要件を具体化する。

### UI/UX 方針

- Apple の Human Interface Guidelines を参考に、モダンで高級感があり、使いやすい UI/UX を目指す。
  参考: https://developer.apple.com/design/human-interface-guidelines/
- 余白、読みやすい文字、明確な情報階層、控えめな装飾を重視する。
- 現在の白・温かみのあるグレー・落ち着いたグリーンを基調とする共通スタイルを起点に、画面全体の一貫性を保つ。
- PC とスマートフォンの両方に対応し、ダークモード、キーボード操作、フォーカス表示、動きを減らす設定への配慮を継続する。
- 共通ヘッダー、ナビゲーション、ページコンテナーを再利用する。必要なライブラリの導入は許可されており、アイコンには現在 `lucide-react` を使用している。

### 現在の実装状況

- Supabase のブラウザ用・サーバー用クライアントと、Proxy によるセッション更新の基盤を用意済み。サインイン画面やルートの認可まで実装済みという意味ではない。
- `.env.local` の `NEXT_PUBLIC_SUPABASE_URL` と `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` を使う接続設定を用意済み。実際の値はドキュメントへ記載しない。
- `GET /api/supabase/health` を実装済み。Supabase の公開 Auth 設定エンドポイントへの通信を確認するもので、データベース操作・認証フロー・RLS の検証ではない。
- `components/layout/app-shell.tsx` に共通ヘッダー、サイドバー、モバイル用開閉メニュー、本文スキップリンクを実装し、`app/layout.tsx` で適用済み。
- `app/page.tsx` にトップページとメモ・カテゴリ・タグの空状態を用意済み。現在のナビゲーションはページ内の各セクションへ移動する。
- `app/globals.css` に共通スタイル、レスポンシブ表示、ダークモードを用意済み。
- メモの保存・編集、カテゴリ／タグの管理、Markdown の変換表示、ユーザー認証の機能と関連テーブルは未実装。

### 今後の進め方

1. 認証方式と、メモ・カテゴリ・タグ・所有ユーザーのデータ構造を具体化する。
2. Supabase のテーブルと RLS、ユーザー認証を実装する。
3. メモの基本操作と永続化を実装する。
4. Markdown の入力・変換表示、カテゴリ・タグによる整理を組み込む。
5. 共通レイアウトを生かして、読み込み中・空状態・エラー時を含む操作体験を整える。

上記は実装の目安であり、順序や詳細は各タスクの依頼に合わせて調整する。
機能を追加した際は、この実装状況も更新する。既存の TDD と検証ルールに従う。