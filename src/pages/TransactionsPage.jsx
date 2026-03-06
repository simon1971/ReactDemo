import { Card } from '../components/ui/Card'
import { Input } from '../components/ui/Input'
import { Select } from '../components/ui/Select'
import { Button } from '../components/ui/Button'
import { useAppState } from '../state/AppContext'
import { useState } from 'react'
import { validatePositiveAmount } from '../utils/validation'

export function TransactionsPage() {
  const { transactions, setTransactions, categories } = useAppState()
  const [amount, setAmount] = useState('')
  const [type, setType] = useState('expense')
  const [categoryId, setCategoryId] = useState(categories[0]?.id || '')
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10))

  const canAdd = validatePositiveAmount(amount) && Boolean(date) && (type === 'income' || Boolean(categoryId))

  function addTransaction() {
    if (!canAdd) return
    setTransactions((prev) => [
      {
        id: crypto.randomUUID(),
        amount: Number(amount),
        type,
        categoryId: type === 'income' ? 'income' : categoryId,
        note: '',
        date,
      },
      ...prev,
    ])
    setAmount('')
  }

  return (
    <Card title="Transactions">
      <div style={{ display: 'grid', gap: '0.75rem', marginBottom: '1rem' }}>
        <Input id="amount" label="Amount" type="number" min="0" step="0.01" value={amount} onChange={(e) => setAmount(e.target.value)} />
        <Select
          id="type"
          label="Type"
          value={type}
          onChange={(e) => setType(e.target.value)}
          options={[
            { value: 'expense', label: 'Expense' },
            { value: 'income', label: 'Income' },
          ]}
        />
        {type === 'expense' ? (
          <Select
            id="category"
            label="Category"
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
            options={categories.map((c) => ({ value: c.id, label: c.name }))}
          />
        ) : null}
        <Input id="date" label="Date" type="date" value={date} onChange={(e) => setDate(e.target.value)} />
        <Button onClick={addTransaction} disabled={!canAdd}>Add transaction</Button>
      </div>

      <ul style={{ margin: 0, paddingLeft: '1.25rem' }}>
        {transactions.map((t) => (
          <li key={t.id}>
            {t.date} • {t.type} • ${t.amount.toFixed(2)} • {t.categoryId}
          </li>
        ))}
      </ul>
    </Card>
  )
}
