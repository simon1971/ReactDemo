# ReactDemo

Simple home expense budgeting app (React + Vite).

## Routes

- `/dashboard` — monthly overview
- `/transactions` — transaction entry/list
- `/budgets` — monthly category budgets
- `/settings` — app settings placeholder

## Project Structure

```text
src/
  app/                # app-level wiring (reserved)
  components/ui/      # reusable UI primitives (Card, Button, Input, Select, Modal)
  models/             # core domain model definitions
  pages/              # route-level page components
  state/              # central app state/context
  utils/              # formatting, date, validation helpers
  App.jsx             # route map and top-level layout
  main.jsx            # providers + router bootstrap
```

## Core Models

- `Transaction` (id, type, amount, categoryId, note, date)
- `Category` (id, name)
- `BudgetTarget` (id, monthKey, categoryId, limit)
- `Month` (key, year, month)

## Scripts

```bash
npm install
npm run dev
npm run build
```


## Data Persistence

- Uses `localStorage` via `src/storage/localStore.js`
- Storage key: `reactdemo.budget.v1`
- Safe parsing/fallback defaults prevent crashes on corrupt payloads
- State hydrates on load and auto-saves on changes


## UX & Accessibility Baseline

- Responsive layout supports 320px+ widths without horizontal overflow
- Touch-friendly controls (minimum control height around 42px)
- Visible keyboard focus styles via `:focus-visible`
- All form controls use explicit labels
- Over-budget state uses high-contrast warning colour


## QA & Release Notes

- Manual QA checklist: `docs/qa/manual-checklist.md`
- Unit tests (helpers): `npm run test:unit`
- E2E smoke tests (Playwright): `npm run test`
- Add screenshots to `docs/screenshots/` before release


## Modern UI Refresh (Issue #18)

- Introduced a cleaner visual system (spacing, typography, colour tokens, elevation)
- Improved mobile-first navigation and responsive card layouts
- Added polished interaction states (hover/active/focus-visible)
- Preserved accessibility baseline and touch-friendly control sizes
