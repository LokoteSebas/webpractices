import styles from './HabitItem.module.css'

function HabitItem({ habit, onToggle, onValueChange }) {
  const { entry } = habit
  const completed = Boolean(entry?.completed)
  const value = entry?.value ?? 0
  const buttonLabel = completed ? `Desmarcar ${habit.name}` : `Marcar ${habit.name}`

  if (habit.type === 'quantitative') {
    const progressLabel = `${formatHabitValue(value, habit)}/${formatHabitValue(habit.target, habit)}`
    const stepLabel = formatHabitValue(habit.step, habit)

    return (
      <li className={`${styles.item} ${completed ? styles.itemDone : ''}`}>
        <span className={styles.marker} aria-hidden="true">
          {completed ? '✓' : ''}
        </span>
        <span className={styles.content}>
          <span className={styles.name}>{habit.name}</span>
          <span className={styles.progress}>{progressLabel}</span>
        </span>
        <span className={styles.controls}>
          <button
            aria-label={`Restar ${stepLabel} a ${habit.name}`}
            className={styles.controlButton}
            onClick={() => onValueChange(habit.id, value - habit.step)}
            type="button"
          >
            -
          </button>
          <button
            aria-label={`Sumar ${stepLabel} a ${habit.name}`}
            className={styles.controlButton}
            onClick={() => onValueChange(habit.id, value + habit.step)}
            type="button"
          >
            +
          </button>
        </span>
      </li>
    )
  }

  return (
    <li>
      <button
        aria-label={buttonLabel}
        aria-pressed={completed}
        className={`${styles.item} ${completed ? styles.itemDone : ''}`}
        onClick={() => onToggle(habit.id)}
        type="button"
      >
        <span className={styles.marker} aria-hidden="true">
          {completed ? '✓' : ''}
        </span>
        <span className={styles.name}>{habit.name}</span>
      </button>
    </li>
  )
}

function formatHabitValue(value, habit) {
  return habit.unit === 'k' ? `${value}k` : `${value} ${habit.unit}`
}

export default HabitItem
