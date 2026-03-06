import { Card } from '../components/ui/Card'
import { Button } from '../components/ui/Button'
import { useAppState } from '../state/AppContext'
import { clearAppData } from '../storage/localStore'

export function SettingsPage() {
  const { setTransactions, setCategories, setBudgetTargets } = useAppState()

  function resetData() {
    clearAppData()
    setTransactions([])
    setCategories([
      { id: 'groceries', name: 'Groceries' },
      { id: 'utilities', name: 'Utilities' },
      { id: 'transport', name: 'Transport' },
    ])
    setBudgetTargets([])
  }

  return (
    <Card title="Settings">
      <p>Local data is stored in your browser for this device.</p>
      <div style={{ marginTop: '0.75rem' }}>
        <Button variant="secondary" onClick={resetData}>Reset local app data</Button>
      </div>
    </Card>
  )
}
