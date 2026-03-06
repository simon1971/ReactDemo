# Manual QA Checklist (MVP)

## Critical flows
- [ ] Add expense transaction
- [ ] Edit existing transaction
- [ ] Delete transaction
- [ ] Filter by month/type/category
- [ ] Set monthly budget target
- [ ] Confirm over-budget highlight appears
- [ ] Verify dashboard totals and recent transactions
- [ ] Refresh browser and confirm data persistence
- [ ] Test mobile viewport (320px width) for no horizontal overflow
- [ ] Keyboard tab navigation shows visible focus

## Release gate
- [ ] `npm run build` passes
- [ ] `npm run test:unit` passes
- [ ] `npm run test` passes (Playwright)
