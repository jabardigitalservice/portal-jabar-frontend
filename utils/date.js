import { differenceInDays, differenceInHours, formatISO } from 'date-fns'

export function format (date, options) {
  return new Date(date).toLocaleDateString('id-ID', options)
}

export function formatISODate (date) {
  return formatISO(new Date(date), { representation: 'date' })
}

export function hoursDifference (current, previous = new Date()) {
  return differenceInHours(new Date(previous), new Date(current))
}

export function daysDifference (current, previous = new Date()) {
  return differenceInDays(new Date(previous), new Date(current))
}

export function relativeTime (time) {
  const toSeconds = time => (new Date().getTime() - new Date(time).getTime()) / 1000
  let value = toSeconds(time)
  let unit = 'detik'

  if (Math.abs(value) >= 60) {
    value /= 60
    unit = 'menit'

    if (Math.abs(value) >= 60) {
      value /= 60
      unit = 'jam'
    }
  }

  return `${Math.floor(value)} ${unit} yang lalu`
}
