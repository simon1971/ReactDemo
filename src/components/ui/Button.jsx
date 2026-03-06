import './ui.css'

export function Button({ variant = 'primary', type = 'button', children, ...props }) {
  return (
    <button type={type} className={`ui-button ui-button-${variant}`} {...props}>
      {children}
    </button>
  )
}
