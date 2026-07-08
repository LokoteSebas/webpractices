import { useCallback, useMemo } from 'react'
import { getMockHabitHistory } from '../data/mockHabits.js'

// MDB hook escolar: lee historial mock estatico.
export function useHabitHistory(days = 7) {
  const history = useMemo(() => getMockHabitHistory(days), [days])

  // MDB mantiene la misma API, pero no escribe ni actualiza ninguna base.
  const loadHistory = useCallback(async () => {
    return history
  }, [history])

  return {
    history,
    status: 'ready',
    error: null,
    reloadHistory: loadHistory,
  }
}
