import { useCallback, useEffect, useState } from 'react'
import { createHabitEntry, getMockHabitsForDate } from '../data/mockHabits.js'
import { getDateKey } from '../utils/dateUtils.js'

// MDB hook escolar: usa mocks y solo cambia estado temporal en React.
export function useHabitsForDate(date = getDateKey()) {
  const [habits, setHabits] = useState(() => getMockHabitsForDate(date))
  const [status, setStatus] = useState('ready')
  const [error, setError] = useState(null)

  // MDB regresa los habitos al mock base.
  const loadHabits = useCallback(async () => {
    setHabits(getMockHabitsForDate(date))
    setError(null)
    setStatus('ready')
  }, [date])

  useEffect(() => {
    setHabits(getMockHabitsForDate(date))
    setError(null)
    setStatus('ready')
  }, [date])

  // MDB interaccion visual: alterna un habito sin guardar en ninguna base.
  const toggleHabit = useCallback(
    async (habitId) => {
      setHabits((currentHabits) =>
        currentHabits.map((habit) => {
          if (habit.id !== habitId) {
            return habit
          }

          const currentValue = habit.entry?.value ?? 0
          const nextValue = habit.type === 'binary' ? Number(!currentValue) : currentValue

          return {
            ...habit,
            entry: createHabitEntry(habit, date, nextValue),
          }
        }),
      )
    },
    [date],
  )

  // MDB interaccion visual: cambia el valor sin guardar en ninguna base.
  const updateHabitValue = useCallback(
    async (habitId, value) => {
      setHabits((currentHabits) =>
        currentHabits.map((habit) => {
          if (habit.id !== habitId) {
            return habit
          }

          const min = habit.min ?? 0
          const max = habit.max ?? Infinity
          const nextValue = Math.min(max, Math.max(min, value))

          return {
            ...habit,
            entry: createHabitEntry(habit, date, nextValue),
          }
        }),
      )
    },
    [date],
  )

  return {
    habits,
    status,
    error,
    toggleHabit,
    updateHabitValue,
    reloadHabits: loadHabits,
  }
}
