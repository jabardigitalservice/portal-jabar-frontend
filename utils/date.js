import { differenceInHours, formatISO } from 'date-fns'

export function format (date, options) {
  return new Date(date).toLocaleDateString('id-ID', options)
}

export function formatISODate (date) {
  return formatISO(new Date(date), { representation: 'date' })
}

export function hoursDifference (current, previous = new Date()) {
  return differenceInHours(new Date(previous), new Date(current))
}
