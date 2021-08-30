export function format (date, options) {
  return new Date(date).toLocaleDateString('id-ID', options)
}
