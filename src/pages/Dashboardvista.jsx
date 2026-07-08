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
          <p>Esta tarjeta es una prueba de espacio1</p>
        </article>
        <article className={styles.dsbcardBottom}>
          <h2>Card de prueba bottom</h2>
          <p>esta tarjeta es una prueba de espacio2</p>
        </article>
      </section>
    </main>
  )
}

export default Dashboardvista
