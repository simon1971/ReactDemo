import { useMemo, useState } from 'react'
import { Button } from '../components/ui/Button'
import { Card } from '../components/ui/Card'
import { Input } from '../components/ui/Input'
import { Select } from '../components/ui/Select'
import { useAppState } from '../state/AppContext'
import { formatCurrency } from '../utils/currency'
import { required, validatePositiveAmount } from '../utils/validation'

const defaultForm = {
  id: '', amount: '', type: 'expense', categoryId: '', date: new Date().toISOString().slice(0, 10), note: '',
}

export function TransactionsPage() {
  const { transactions, setTransactions, categories } = useAppState()
  const [form, setForm] = useState({ ...defaultForm, categoryId: categories[0]?.id || '' })
  const [filterMonth, setFilterMonth] = useState(new Date().toISOString().slice(0, 7))
  const [filterType, setFilterType] = useState('all')
  const [filterCategory, setFilterCategory] = useState('all')

  const isExpense = form.type === 'expense'
  const formValid = validatePositiveAmount(form.amount) && required(form.date) && (!isExpense || required(form.categoryId))

  const filtered = useMemo(() => transactions.filter((t) => {
    const monthMatch = filterMonth ? t.date?.startsWith(filterMonth) : true
    const typeMatch = filterType === 'all' ? true : t.type === filterType
    const categoryMatch = filterCategory === 'all' ? true : t.categoryId === filterCategory
    return monthMatch && typeMatch && categoryMatch
  }), [transactions, filterMonth, filterType, filterCategory])

  function resetForm() { setForm({ ...defaultForm, categoryId: categories[0]?.id || '' }) }

  function submitForm(e) {
    e.preventDefault()
    if (!formValid) return
    const next = {
      id: form.id || crypto.randomUUID(),
      amount: Number(form.amount),
      type: form.type,
      categoryId: form.type === 'income' ? 'income' : form.categoryId,
      note: form.note.trim(),
      date: form.date,
    }
    setTransactions((prev) => (form.id ? prev.map((t) => (t.id === form.id ? next : t)) : [next, ...prev]))
    resetForm()
  }

  function editTransaction(tx) {
    setForm({ id: tx.id, amount: String(tx.amount), type: tx.type, categoryId: tx.type === 'income' ? '' : tx.categoryId, date: tx.date, note: tx.note || '' })
  }

  function deleteTransaction(id) {
    if (!window.confirm('Delete this transaction?')) return
    setTransactions((prev) => prev.filter((t) => t.id !== id))
    if (form.id === id) resetForm()
  }

  return (
    <div className="split">
      <Card title="Add / Edit Transaction" subtitle="Track income and expenses quickly">
        <form className="form-grid" onSubmit={submitForm}>
          <Input id="amount" label="Amount" type="number" min="0" step="0.01" value={form.amount} onChange={(e) => setForm((p) => ({ ...p, amount: e.target.value }))} required />
          <Select id="type" label="Type" value={form.type} onChange={(e) => setForm((p) => ({ ...p, type: e.target.value }))} options={[{ value: 'expense', label: 'Expense' }, { value: 'income', label: 'Income' }]} />
          {isExpense ? <Select id="category" label="Category" value={form.categoryId} onChange={(e) => setForm((p) => ({ ...p, categoryId: e.target.value }))} options={categories.map((c) => ({ value: c.id, label: c.name }))} /> : null}
          <Input id="date" label="Date" type="date" value={form.date} onChange={(e) => setForm((p) => ({ ...p, date: e.target.value }))} required />
          <Input id="note" label="Note" type="text" value={form.note} onChange={(e) => setForm((p) => ({ ...p, note: e.target.value }))} placeholder="Optional note" />
          <div className="row-wrap">
            <Button type="submit" disabled={!formValid}>{form.id ? 'Update transaction' : 'Add transaction'}</Button>
            {form.id ? <Button type="button" variant="secondary" onClick={resetForm}>Cancel edit</Button> : null}
          </div>
        </form>
      </Card>

      <Card title="Filters + Results" subtitle="Narrow by month, type, and category">
        <div className="form-grid" style={{ marginBottom: '0.9rem' }}>
          <Input id="filter-month" label="Month" type="month" value={filterMonth} onChange={(e) => setFilterMonth(e.target.value)} />
          <Select id="filter-type" label="Type" value={filterType} onChange={(e) => setFilterType(e.target.value)} options={[{ value: 'all', label: 'All' }, { value: 'expense', label: 'Expense' }, { value: 'income', label: 'Income' }]} />
          <Select id="filter-category" label="Category" value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)} options={[{ value: 'all', label: 'All categories' }, ...categories.map((c) => ({ value: c.id, label: c.name }))]} />
        </div>
        <ul className="list-reset">
          {filtered.map((t) => (
            <li className="list-row" key={t.id}>
              {t.date} • {t.type} • {formatCurrency(t.amount)} • {t.categoryId}{t.note ? ` • ${t.note}` : ''}
              <div className="row-wrap" style={{ marginTop: '0.3rem' }}>
                <Button type="button" variant="secondary" onClick={() => editTransaction(t)}>Edit</Button>
                <Button type="button" variant="secondary" onClick={() => deleteTransaction(t.id)}>Delete</Button>
              </div>
            </li>
          ))}
          {filtered.length === 0 ? <li>No transactions match your filters.</li> : null}
        </ul>
      </Card>
    </div>
  )
}
