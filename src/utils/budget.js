export function calculateTotals(transactions = []) {
  const income = transactions.filter((t) => t.type === 'income').reduce((a, t) => a + Number(t.amount || 0), 0)
  const expenses = transactions.filter((t) => t.type === 'expense').reduce((a, t) => a + Number(t.amount || 0), 0)
  return { income, expenses, net: income - expenses }
}

export function calculateRemainingBudget(expenses, budgetLimit) {
  return Number(budgetLimit || 0) - Number(expenses || 0)
}
