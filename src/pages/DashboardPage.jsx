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
    <div className="section-grid">
      <Card className="hero" title="Monthly Snapshot" subtitle={`Period: ${currentMonth}`}>
        <div className="metric-grid">
          <div className="metric"><p className="metric-label">Income</p><p className="metric-value">{formatCurrency(income)}</p></div>
          <div className="metric"><p className="metric-label">Expenses</p><p className="metric-value">{formatCurrency(expenses)}</p></div>
          <div className="metric"><p className="metric-label">Net Position</p><p className="metric-value">{formatCurrency(net)}</p></div>
          <div className="metric"><p className="metric-label">Remaining Budget</p><p className={`metric-value ${remainingBudget < 0 ? 'text-danger' : ''}`}>{formatCurrency(remainingBudget)}</p></div>
        </div>
      </Card>

      <Card title="Top Spending Categories" subtitle="Highest expense buckets this month">
        <ul className="list-reset">
          {top3.map((row) => (
            <li className="list-row" key={row.categoryId}>{row.label}: {formatCurrency(row.total)}</li>
          ))}
          {top3.length === 0 ? <li>No spending recorded yet.</li> : null}
        </ul>
      </Card>

      <Card title="Recent Transactions" subtitle="Latest activity in this month">
        <ul className="list-reset">
          {recent.map((t) => (
            <li className="list-row" key={t.id}>{t.date} • {t.type} • {formatCurrency(t.amount)} • {t.categoryId}</li>
          ))}
          {recent.length === 0 ? <li>No transactions yet.</li> : null}
        </ul>
      </Card>
    </div>
  )
}
