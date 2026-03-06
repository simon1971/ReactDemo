import { createContext, useContext, useMemo, useState } from 'react'

const AppContext = createContext(null)

const defaultCategories = [
  { id: 'groceries', name: 'Groceries' },
  { id: 'utilities', name: 'Utilities' },
  { id: 'transport', name: 'Transport' },
]

export function AppProvider({ children }) {
  const [transactions, setTransactions] = useState([])
  const [categories, setCategories] = useState(defaultCategories)
  const [budgetTargets, setBudgetTargets] = useState([])

  const value = useMemo(
    () => ({
      transactions,
      setTransactions,
      categories,
      setCategories,
      budgetTargets,
      setBudgetTargets,
    }),
    [transactions, categories, budgetTargets],
  )

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export function useAppState() {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useAppState must be used within AppProvider')
  return ctx
}
