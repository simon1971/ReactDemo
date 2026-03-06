import { describe, expect, it } from 'vitest'
import { calculateRemainingBudget, calculateTotals } from '../budget'

describe('budget calculations', () => {
  it('calculates totals correctly', () => {
    const tx = [
      { type: 'income', amount: 2000 },
      { type: 'expense', amount: 100 },
      { type: 'expense', amount: 50 },
    ]
    expect(calculateTotals(tx)).toEqual({ income: 2000, expenses: 150, net: 1850 })
  })

  it('calculates remaining budget', () => {
    expect(calculateRemainingBudget(300, 500)).toBe(200)
    expect(calculateRemainingBudget(650, 500)).toBe(-150)
  })
})
