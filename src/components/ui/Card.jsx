import './ui.css'

export function Card({ title, subtitle, children, className = '' }) {
  return (
    <section className={`ui-card ${className}`.trim()}>
      {(title || subtitle) && (
        <div className="ui-card-head">
          {title ? <h2 className="ui-card-title">{title}</h2> : null}
          {subtitle ? <p className="muted">{subtitle}</p> : null}
        </div>
      )}
      {children}
    </section>
  )
}
