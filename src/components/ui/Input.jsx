import './ui.css'

export function Input({ label, id, ...props }) {
  return (
    <label className="ui-field" htmlFor={id}>
      <span>{label}</span>
      <input id={id} className="ui-input" {...props} />
    </label>
  )
}
