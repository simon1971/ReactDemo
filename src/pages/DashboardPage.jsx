import { Card } from '../components/ui/Card'
import { formatCurrency } from '../utils/currency'
import { toMonthKey } from '../utils/date'
import { useAppState } from '../state/AppContext'

export function DashboardPage() {
  const { transactions, budgetTargets, categories } = useAppState()
  const currentMonth = toMonthKey()

  const monthTx = transactions.filter((t) => t.date?.startsWith(currentMonth))
  const incomeTx = monthTx.filter((t) => t.type === 'income')
  const expenseTx = monthTx.filter((t) => t.type === 'expense')

  const income = incomeTx.reduce((acc, t) => acc + t.amount, 0)
  const expenses = expenseTx.reduce((acc, t) => acc + t.amount, 0)
  const net = income - expenses

  const monthBudgets = budgetTargets.filter((b) => b.monthKey === currentMonth)
  const budgetTotal = monthBudgets.reduce((acc, b) => acc + b.limit, 0)
  const remainingBudget = budgetTotal - expenses

  const byCategory = expenseTx.reduce((acc, t) => {
    acc[t.categoryId] = (acc[t.categoryId] || 0) + t.amount
    return acc
  }, {})

  const top3 = Object.entries(byCategory)
    .map(([categoryId, total]) => ({
      categoryId,
      total,
      label: categories.find((c) => c.id === categoryId)?.name || categoryId,
    }))
    .sort((a, b) => b.total - a.total)
    .slice(0, 3)

  const recent = [...monthTx].sort((a, b) => b.date.localeCompare(a.date)).slice(0, 5)

  return (
    <>
      <Card title="Dashboard">
        <p>Current month: {currentMonth}</p>
        <p>Total income: {formatCurrency(income)}</p>
        <p>Total expenses: {formatCurrency(expenses)}</p>
        <p>Net balance: {formatCurrency(net)}</p>
        <p>Remaining budget: {formatCurrency(remainingBudget)}</p>
      </Card>

      <Card title="Top 3 spending categories">
        <ul style={{ margin: 0, paddingLeft: '1.25rem' }}>
          {top3.map((row) => (
            <li key={row.categoryId}>{row.label}: {formatCurrency(row.total)}</li>
          ))}
          {top3.length === 0 ? <li>No spending yet this month.</li> : null}
        </ul>
      </Card>

      <Card title="Recent transactions">
        <ul style={{ margin: 0, paddingLeft: '1.25rem' }}>
          {recent.map((t) => (
            <li key={t.id}>{t.date} • {t.type} • {formatCurrency(t.amount)} • {t.categoryId}</li>
          ))}
          {recent.length === 0 ? <li>No transactions yet.</li> : null}
        </ul>
      </Card>
    </>
  )
}
