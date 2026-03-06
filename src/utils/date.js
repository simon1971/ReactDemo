export function toMonthKey(dateInput = new Date()) {
  const d = new Date(dateInput)
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  return `${y}-${m}`
}

export function formatDate(dateInput) {
  const d = new Date(dateInput)
  if (Number.isNaN(d.getTime())) return ''
  return d.toLocaleDateString('en-AU', { day: '2-digit', month: 'short', year: 'numeric' })
}
