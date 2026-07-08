import HabitItem from '../habits/HabitItem.jsx'
import { useHabitsForDate } from '../../hooks/useHabitsForDate.js'
import styles from './HabitsCard.module.css'

// MDB card que lee habitos mock y permite interaccion temporal.
function HabitsCard({ className = '', onOpenHabits }) {
  // MDB trae datos mock y expone acciones que solo cambian el estado visual.
  const { habits, status, error, toggleHabit, updateHabitValue } = useHabitsForDate()
  const completedHabits = habits.filter((habit) => habit.entry?.completed).length
  const todayLabel = new Date().toLocaleDateString('es-MX', {
    month: 'short',
    day: '2-digit',
  })

  return (
    <article className={`${className} ${styles.card}`}>
      <div className={styles.neonCard} data-card="DivNeon">
        <div className={styles.header}>
          <div>
            <h2 className={styles.title}>Hábitos</h2>
            <p className={styles.subtitle}>{todayLabel}</p>
          </div>
          <span className={styles.counter}>
            {completedHabits}/{habits.length || 2} completados
          </span>
        </div>
      </div>

      {status === 'error' ? <p className={styles.message}>{error.message}</p> : null}
      {status === 'loading' ? <p className={styles.message}>Cargando hábitos...</p> : null}

      <ul className={styles.list}>
        {habits.map((habit) => (
          /* MDB interaccion: estos callbacks solo cambian el estado de React. */
          <HabitItem
            habit={habit}
            key={habit.id}
            onToggle={toggleHabit}
            onValueChange={updateHabitValue}
          />
        ))}
      </ul>

      <button className={styles.action} onClick={onOpenHabits} type="button">
        Ver hábitos
      </button>
    </article>
  )
}

export default HabitsCard
