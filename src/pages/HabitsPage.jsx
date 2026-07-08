import HabitCalendar from '../components/habits/HabitCalendar.jsx'
import HabitItem from '../components/habits/HabitItem.jsx'
import { useHabitHistory } from '../hooks/useHabitHistory.js'
import { useHabitsForDate } from '../hooks/useHabitsForDate.js'
import styles from './HabitsPage.module.css'

// MDB pagina que muestra mocks y permite interacciones temporales en la UI.
function HabitsPage() {
  // MDB trae habitos mock de hoy y acciones que solo cambian la pantalla.
  const { habits, status, error, toggleHabit, updateHabitValue } = useHabitsForDate()
  // MDB trae los ultimos 7 dias mock.
  const { history, status: historyStatus, reloadHistory } = useHabitHistory(7)
  const completedHabits = habits.filter((habit) => habit.entry?.completed).length
  const todayLabel = new Date().toLocaleDateString('es-MX', {
    day: '2-digit',
    month: 'long',
  })

  // MDB interaccion visual: alterna el habito sin guardar datos.
  const handleToggle = async (habitId) => {
    await toggleHabit(habitId)
    await reloadHistory()
  }

  // MDB interaccion visual: cambia el valor sin guardar datos.
  const handleValueChange = async (habitId, value) => {
    await updateHabitValue(habitId, value)
    await reloadHistory()
  }

  return (
    <main className={styles.page}>
      <section className={styles.todayPanel}>
        <div className={styles.header}>
          <div>
            <h1 className={styles.title}>Hábitos</h1>
            <p className={styles.subtitle}>{todayLabel}</p>
          </div>
          <span className={styles.counter}>
            {completedHabits}/{habits.length || 2}
          </span>
        </div>

        {status === 'error' ? <p className={styles.message}>{error.message}</p> : null}
        {status === 'loading' ? <p className={styles.message}>Cargando hábitos...</p> : null}

        <ul className={styles.list}>
          {habits.map((habit) => (
            /* MDB interaccion: estos callbacks solo cambian el estado de React. */
            <HabitItem
              habit={habit}
              key={habit.id}
              onToggle={handleToggle}
              onValueChange={handleValueChange}
            />
          ))}
        </ul>
      </section>

      {historyStatus === 'loading' ? <p className={styles.message}>Cargando historial...</p> : null}
      <HabitCalendar history={history} />
    </main>
  )
}

export default HabitsPage
