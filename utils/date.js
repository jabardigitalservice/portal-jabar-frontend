export function format (date, options) {
  return new Date(date).toLocaleDateString('id-ID', options)
}

export function toISO (date, time = false) {
  if (time) {
    return new Date(date).toISOString()
  }

  return new Date(date).toISOString().substring(0, 10)
}
