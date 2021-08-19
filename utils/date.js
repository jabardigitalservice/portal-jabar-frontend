export function format (date) {
  const options = {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  }

  return new Date(date).toLocaleDateString('id-ID', options)
}
