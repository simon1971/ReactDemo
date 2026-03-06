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
