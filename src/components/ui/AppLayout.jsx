import { NavLink } from 'react-router-dom'
import './ui.css'

const links = [
  { to: '/dashboard', label: 'Dashboard' },
  { to: '/transactions', label: 'Transactions' },
  { to: '/budgets', label: 'Budgets' },
  { to: '/settings', label: 'Settings' },
]

export function AppLayout({ children }) {
  return (
    <div className="app-shell">
      <header className="app-header glass">
        <div className="header-inner">
          <div>
            <p className="eyebrow">Home Budgeting</p>
            <h1>ReactDemo Budget</h1>
          </div>
          <p className="muted">Track spending, protect cashflow.</p>
        </div>
        <nav className="app-nav" aria-label="Primary">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) => `nav-link${isActive ? ' nav-link-active' : ''}`}
            >
              {link.label}
            </NavLink>
          ))}
        </nav>
      </header>
      <main className="app-content">{children}</main>
    </div>
  )
}
