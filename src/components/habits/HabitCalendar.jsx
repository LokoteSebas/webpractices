import styles from './HabitCalendar.module.css'

function HabitCalendar({ history }) {
  const { dates, habits } = history

  if (!dates.length || !habits.length) {
    return null
  }

  return (
    <section className={styles.panel} aria-label="Historial de habitos">
      <div className={styles.header}>
        <h2 className={styles.title}>Ultimos {dates.length} dias</h2>
        <p className={styles.subtitle}>Ritmo reciente por dia.</p>
      </div>

      <div className={styles.grid} style={{ '--days': dates.length }}>
        <span className={styles.corner} aria-hidden="true" />
        {dates.map((date) => (
          <span className={styles.dateLabel} key={date}>
            {date.slice(8)}
          </span>
        ))}

        {habits.map((habit) => (
          <HabitCalendarRow habit={habit} key={habit.id} />
        ))}
      </div>
    </section>
  )
}

function HabitCalendarRow({ habit }) {
  return (
    <>
      <span className={styles.habitName}>{habit.name}</span>
      {habit.entries.map((entry) => {
        const quantitativeColor =
          habit.type === 'quantitative' ? getQuantitativeColor(entry.value, habit) : undefined
        const label =
          habit.type === 'binary'
            ? `${habit.name}, ${entry.date}: ${entry.completed ? 'completado' : 'pendiente'}`
            : `${habit.name}, ${entry.date}: ${formatHabitValue(entry.value, habit)}/${formatHabitValue(habit.target, habit)}`

        return (
          <span
            aria-label={label}
            className={styles.cell}
            data-completed={entry.completed}
            data-type={habit.type}
            key={entry.id}
            style={{ '--cell-color': quantitativeColor }}
            title={label}
          />
        )
      })}
    </>
  )
}

function getQuantitativeColor(value, habit) {
  const min = habit.min ?? 0
  const target = habit.target
  const progress = target === min ? 1 : (value - min) / (target - min)
  const clampedProgress = Math.max(0, Math.min(progress, 1))

  if (clampedProgress <= 0.5) {
    return interpolateColor('#ef4444', '#f59e0b', clampedProgress / 0.5)
  }

  return interpolateColor('#f59e0b', '#22c55e', (clampedProgress - 0.5) / 0.5)
}

function interpolateColor(from, to, amount) {
  const fromRgb = hexToRgb(from)
  const toRgb = hexToRgb(to)
  const rgb = fromRgb.map((channel, index) =>
    Math.round(channel + (toRgb[index] - channel) * amount),
  )

  return `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`
}

function hexToRgb(hex) {
  return [1, 3, 5].map((start) => parseInt(hex.slice(start, start + 2), 16))
}

function formatHabitValue(value, habit) {
  return habit.unit === 'k' ? `${value}k` : `${value} ${habit.unit}`
}

export default HabitCalendar
