<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

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
