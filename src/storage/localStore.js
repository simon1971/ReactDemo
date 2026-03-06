const STORAGE_KEY = 'reactdemo.budget.v1'

const defaultData = {
  transactions: [],
  categories: [
    { id: 'groceries', name: 'Groceries' },
    { id: 'utilities', name: 'Utilities' },
    { id: 'transport', name: 'Transport' },
  ],
  budgetTargets: [],
}

export function loadAppData() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return { ...defaultData }
    const parsed = JSON.parse(raw)
    return {
      transactions: Array.isArray(parsed.transactions) ? parsed.transactions : [],
      categories: Array.isArray(parsed.categories) ? parsed.categories : defaultData.categories,
      budgetTargets: Array.isArray(parsed.budgetTargets) ? parsed.budgetTargets : [],
    }
  } catch {
    return { ...defaultData }
  }
}

export function saveAppData(data) {
  const safeData = {
    transactions: Array.isArray(data.transactions) ? data.transactions : [],
    categories: Array.isArray(data.categories) ? data.categories : [],
    budgetTargets: Array.isArray(data.budgetTargets) ? data.budgetTargets : [],
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(safeData))
}

export function clearAppData() {
  localStorage.removeItem(STORAGE_KEY)
}
