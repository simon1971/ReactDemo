import './ui.css'

export function Card({ title, children }) {
  return (
    <section className="ui-card">
      {title ? <h2 className="ui-card-title">{title}</h2> : null}
      {children}
    </section>
  )
}
