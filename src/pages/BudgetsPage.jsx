import { useMemo, useState } from 'react'
import { Button } from '../components/ui/Button'
import { Card } from '../components/ui/Card'
import { Input } from '../components/ui/Input'
import { Select } from '../components/ui/Select'
import { useAppState } from '../state/AppContext'
import { formatCurrency } from '../utils/currency'
import { toMonthKey } from '../utils/date'
import { validatePositiveAmount } from '../utils/validation'

export function BudgetsPage() {
  const { budgetTargets, setBudgetTargets, categories, transactions } = useAppState()
  const [monthKey, setMonthKey] = useState(toMonthKey())
  const [categoryId, setCategoryId] = useState(categories[0]?.id || '')
  const [limit, setLimit] = useState('')

  const monthExpenses = useMemo(
    () =>
      transactions.filter((t) => t.type === 'expense' && t.date?.startsWith(monthKey)).reduce((acc, t) => {
        acc[t.categoryId] = (acc[t.categoryId] || 0) + t.amount
        return acc
      }, {}),
    [transactions, monthKey],
  )

  const monthTargets = budgetTargets.filter((b) => b.monthKey === monthKey)

  function saveTarget(e) {
    e.preventDefault()
    if (!categoryId || !validatePositiveAmount(limit)) return

    setBudgetTargets((prev) => {
      const existing = prev.find((x) => x.monthKey === monthKey && x.categoryId === categoryId)
      if (existing) {
        return prev.map((x) => (x.id === existing.id ? { ...x, limit: Number(limit) } : x))
      }
      return [
        ...prev,
        {
          id: crypto.randomUUID(),
          monthKey,
          categoryId,
          limit: Number(limit),
        },
      ]
    })

    setLimit('')
  }

  return (
    <Card title="Budgets">
      <form onSubmit={saveTarget} style={{ display: 'grid', gap: '0.75rem', marginBottom: '1rem' }}>
        <Input id="month" label="Month" type="month" value={monthKey} onChange={(e) => setMonthKey(e.target.value)} required />
        <Select
          id="category-budget"
          label="Category"
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}
          options={categories.map((c) => ({ value: c.id, label: c.name }))}
        />
        <Input
          id="limit"
          label="Monthly limit"
          type="number"
          min="0"
          step="0.01"
          value={limit}
          onChange={(e) => setLimit(e.target.value)}
          required
        />
        <Button type="submit" disabled={!validatePositiveAmount(limit)}>
          Save budget target
        </Button>
      </form>

      <Card title={`Status for ${monthKey}`}>
        <ul style={{ margin: 0, paddingLeft: '1.25rem' }}>
          {monthTargets.map((target) => {
            const spent = monthExpenses[target.categoryId] || 0
            const remaining = target.limit - spent
            const over = remaining < 0
            return (
              <li key={target.id} style={{ marginBottom: '0.5rem', color: over ? '#b91c1c' : 'inherit' }}>
                {target.categoryId}: spent {formatCurrency(spent)} / budget {formatCurrency(target.limit)} •
                {over ? ` over by ${formatCurrency(Math.abs(remaining))}` : ` remaining ${formatCurrency(remaining)}`}
              </li>
            )
          })}
          {monthTargets.length === 0 ? <li>No budget targets set for this month yet.</li> : null}
        </ul>
      </Card>
    </Card>
  )
}
