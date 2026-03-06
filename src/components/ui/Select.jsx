import './ui.css'

export function Select({ label, id, options = [], ...props }) {
  return (
    <label className="ui-field" htmlFor={id}>
      <span>{label}</span>
      <select id={id} className="ui-input" {...props}>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </label>
  )
}
