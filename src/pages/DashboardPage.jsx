import { Card } from '../components/ui/Card'
import { formatCurrency } from '../utils/currency'
import { toMonthKey } from '../utils/date'
import { useAppState } from '../state/AppContext'

export function DashboardPage() {
  const { transactions } = useAppState()
  const currentMonth = toMonthKey()

  const monthTx = transactions.filter((t) => t.date?.startsWith(currentMonth))
  const income = monthTx.filter((t) => t.type === 'income').reduce((acc, t) => acc + t.amount, 0)
  const expense = monthTx.filter((t) => t.type === 'expense').reduce((acc, t) => acc + t.amount, 0)

  return (
    <>
      <Card title="Dashboard">
        <p>Current month: {currentMonth}</p>
        <p>Total income: {formatCurrency(income)}</p>
        <p>Total expense: {formatCurrency(expense)}</p>
        <p>Net: {formatCurrency(income - expense)}</p>
      </Card>
    </>
  )
}
