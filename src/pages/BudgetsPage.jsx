import { Card } from '../components/ui/Card'
import { useAppState } from '../state/AppContext'
import { toMonthKey } from '../utils/date'

export function BudgetsPage() {
  const { budgetTargets } = useAppState()
  const monthKey = toMonthKey()
  const monthBudgets = budgetTargets.filter((b) => b.monthKey === monthKey)

  return (
    <Card title="Budgets">
      <p>Monthly budget targets will be managed here.</p>
      <p>Current month targets: {monthBudgets.length}</p>
    </Card>
  )
}
