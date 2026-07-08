import styles from './Navbar.module.css'

const navItems = [
  { label: 'Dashboard', view: 'dashboard' },
  { label: 'Hábitos', view: 'habits' },
]

function Navbar({ currentView, onViewChange }) {
  return (
    <nav className={styles.navbar} aria-label="Principal">
      {navItems.map((item) => (
        <button
          aria-current={currentView === item.view ? 'page' : undefined}
          className={styles.navButton}
          key={item.view}
          onClick={() => onViewChange(item.view)}
          type="button"
        >
          {item.label}
        </button>
      ))}
      <button className={styles.navButton} type="button">
        Cuenta
      </button>
    </nav>
  )
}

export default Navbar
