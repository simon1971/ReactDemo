import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { loadAppData, saveAppData } from '../storage/localStore'

const AppContext = createContext(null)

export function AppProvider({ children }) {
  const [transactions, setTransactions] = useState([])
  const [categories, setCategories] = useState([])
  const [budgetTargets, setBudgetTargets] = useState([])
  const [hydrated, setHydrated] = useState(false)

  useEffect(() => {
    const data = loadAppData()
    setTransactions(data.transactions)
    setCategories(data.categories)
    setBudgetTargets(data.budgetTargets)
    setHydrated(true)
  }, [])

  useEffect(() => {
    if (!hydrated) return
    saveAppData({ transactions, categories, budgetTargets })
  }, [hydrated, transactions, categories, budgetTargets])

  const value = useMemo(
    () => ({
      transactions,
      setTransactions,
      categories,
      setCategories,
      budgetTargets,
      setBudgetTargets,
      hydrated,
    }),
    [transactions, categories, budgetTargets, hydrated],
  )

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export function useAppState() {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useAppState must be used within AppProvider')
  return ctx
}
