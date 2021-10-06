import {
  add,
  differenceInCalendarMonths,
  differenceInDays,
  differenceInHours,
  differenceInMinutes,
  eachDayOfInterval,
  eachHourOfInterval,
  endOfMonth,
  endOfWeek,
  formatISO,
  getDay,
  getWeekOfMonth,
  isSameHour,
  isToday,
  startOfMonth,
  startOfWeek
} from 'date-fns'

export function format (date, options) {
  return new Date(date).toLocaleDateString('id-ID', options)
}

export function formatISODate (date) {
  return formatISO(new Date(date), { representation: 'date' })
}

export function minutesDifference (current, previous = new Date()) {
  return differenceInMinutes(new Date(previous), new Date(current))
}

export function hoursDifference (current, previous = new Date()) {
  return differenceInHours(new Date(previous), new Date(current))
}

export function daysDifference (current, previous = new Date()) {
  return differenceInDays(new Date(previous), new Date(current))
}

export function monthsDifference (current, previous = new Date()) {
  return differenceInCalendarMonths(new Date(current), new Date(previous))
}

export function getDayOfWeek (date) {
  return getDay(new Date(date))
}

export function getFirstDayOfWeek (weekStartOn = 1, date = new Date()) {
  return startOfWeek(new Date(date), { weekStartsOn: weekStartOn })
}

export function getLastDayOfWeek (weekStartOn = 1, date = new Date()) {
  return endOfWeek(new Date(date), { weekStartsOn: weekStartOn })
}

export function getFirstDayOfMonth (date = new Date()) {
  return startOfMonth(new Date(date))
}

export function getLastDayOfMonth (date = new Date()) {
  return endOfMonth(new Date(date))
}

export function getCurrentWeek (weekStartOn = 1, date = new Date()) {
  return getWeekOfMonth(new Date(date), { weekStartsOn: weekStartOn })
}

export function getEachHour ({ start, end }) {
  return eachHourOfInterval({ start: new Date(start), end: new Date(end) })
}

export function getEachDay ({ start, end }) {
  return eachDayOfInterval({ start: new Date(start), end: new Date(end) })
}

export function addDay (date, days) {
  return add(new Date(date), { days })
}

export function isCurrentHour (current, previous = new Date()) {
  return isSameHour(new Date(current), new Date(previous))
}

export function isCurrentDay (date) {
  return isToday(new Date(date))
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
