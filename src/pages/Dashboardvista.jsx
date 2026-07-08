import styles from './Dashboard.module.css'
import HabitsCard from '../components/dashboard/HabitsCard.jsx'




function Dashboardvista({ onNavigate }) {
  return (
    /* Contenedor principal del dashboard */
    <main className={styles.dsbmain}>
      {/* Contenedor del grid de cards */}
      <section className={styles.dsbgrid}>
        <HabitsCard className={styles.dsbcard} onOpenHabits={() => onNavigate('habits')} />
        <article className={styles.dsbcardTop}>
          <h2>Card de prueba top</h2>
          <p>Si ves esta tarjeta, el grid del dashboard se esta mostrando.</p>
        </article>
        <article className={styles.dsbcardBottom}>
          <h2>Card de prueba bottom</h2>
          <p>Si ves esta tarjeta, el grid del dashboard se esta mostrando.</p>
        </article>
      </section>
    </main>
  )
}

export default Dashboardvista
