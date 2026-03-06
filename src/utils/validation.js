export function validatePositiveAmount(amount) {
  const num = Number(amount)
  return Number.isFinite(num) && num > 0
}

export function required(value) {
  return String(value ?? '').trim().length > 0
}
