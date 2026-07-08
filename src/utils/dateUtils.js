export function formatDate(date) {
  return new Intl.DateTimeFormat('es-MX', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).format(date)
}

export function getDateKey(date = new Date()) {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')

  return `${year}-${month}-${day}`
}

export function getDateRange(days, endDate = new Date()) {
  return Array.from({ length: days }, (_, index) => {
    const date = new Date(endDate)
    date.setHours(0, 0, 0, 0)
    date.setDate(date.getDate() - (days - 1 - index))

    return getDateKey(date)
  })
}
