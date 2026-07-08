import styles from './Navbar.module.css'

const navItems = [
  { label: 'Dashboard', view: 'dashboard' },
  { label: 'Hábitos', view: 'habits' },
]

function Navbar({ currentView, onLogout, onViewChange }) {
  return (
    <nav className={styles.navbar} aria-label="Principal">
      <div className={styles.navLinks}>
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
      </div>

      <button className={styles.logoutButton} onClick={onLogout} type="button">
        cerrar sesion
      </button>
    </nav>
  )
}

export default Navbar
