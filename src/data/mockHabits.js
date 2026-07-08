import { getDateKey, getDateRange } from '../utils/dateUtils.js'

// MDB datos base que alimentan la pagina de habitos.
export const mockHabits = [
  {
    id: 'read',
    name: 'Leer',
    type: 'binary',
    unit: null,
    target: 1,
    step: 1,
    sortOrder: 1,
    createdAt: getDateKey(new Date()),
  },
  {
    id: 'walk',
    name: 'Caminar',
    type: 'quantitative',
    unit: 'k',
    target: 10,
    min: 2,
    max: 16,
    step: 1,
    sortOrder: 2,
    createdAt: getDateKey(new Date()),
  },
  {
    id: 'no-smoking',
    name: 'No fumar',
    type: 'binary',
    unit: null,
    target: 1,
    step: 1,
    sortOrder: 3,
    createdAt: getDateKey(new Date()),
  },
]

// MDB valores diarios mock para mostrar historial y graficas.
const mockPatterns = {
  read: [1, 1, 0, 1, 0, 1, 1],
  walk: [6, 11, 8, 12, 9, 10, 14],
  'no-smoking': [1, 1, 1, 0, 1, 1, 1],
}

// MDB crea las filas mock que funcionan como historial inicial de 7 dias.
export function createMockHabitEntries(days = 7, endDate = new Date()) {
  const dates = getDateRange(days, endDate)

  return dates.flatMap((date, dayIndex) =>
    mockHabits.map((habit) => {
      const pattern = mockPatterns[habit.id] ?? []
      const value = pattern[dayIndex] ?? createDefaultValue(habit)
      // MDB calcula si la entrada quedara guardada como completada.
      const completed = habit.type === 'binary' ? value === 1 : value >= habit.target

      return {
        // MDB llave unica para encontrar una entrada por dia+habito.
        id: `${habit.id}_${date}`,
        habitId: habit.id,
        date,
        value,
        completed,
        updatedAt: new Date().toISOString(),
      }
    }),
  )
}

export const mockHabitEntries = createMockHabitEntries(7)

export function getMockHabitsForDate(date = getDateKey()) {
  const entriesByHabit = new Map(
    mockHabitEntries
      .filter((entry) => entry.date === date)
      .map((entry) => [entry.habitId, entry]),
  )

  return mockHabits.map((habit) => ({
    ...habit,
    entry: entriesByHabit.get(habit.id) ?? createHabitEntry(habit, date, createDefaultValue(habit)),
  }))
}

export function getMockHabitHistory(days = 7, endDate = new Date()) {
  const dates = getDateRange(days, endDate)
  const entriesByHabitAndDate = new Map(
    mockHabitEntries.map((entry) => [`${entry.habitId}_${entry.date}`, entry]),
  )

  return {
    dates,
    habits: mockHabits.map((habit) => ({
      ...habit,
      entries: dates.map((date) => {
        return (
          entriesByHabitAndDate.get(`${habit.id}_${date}`) ??
          createHabitEntry(habit, date, createDefaultValue(habit))
        )
      }),
    })),
  }
}

export function createHabitEntry(habit, date, value) {
  const completed = habit.type === 'binary' ? value === 1 : value >= habit.target

  return {
    id: `${habit.id}_${date}`,
    habitId: habit.id,
    date,
    value,
    completed,
    updatedAt: new Date().toISOString(),
  }
}

function createDefaultValue(habit) {
  return habit.type === 'binary' ? 0 : (habit.min ?? 0)
}
