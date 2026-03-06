import { Button } from './Button'
import './ui.css'

export function Modal({ open, title, children, onClose }) {
  if (!open) return null

  return (
    <div className="ui-modal-backdrop" role="presentation" onClick={onClose}>
      <div className="ui-modal" role="dialog" aria-modal="true" aria-label={title} onClick={(e) => e.stopPropagation()}>
        <div className="ui-modal-header">
          <h3>{title}</h3>
          <Button variant="secondary" onClick={onClose} aria-label="Close modal">
            Close
          </Button>
        </div>
        <div>{children}</div>
      </div>
    </div>
  )
}
