import {
  add,
  differenceInCalendarISOWeeks,
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
  isThisWeek,
  isThisMonth,
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

export function weeksDifference (week, current = new Date()) {
  return differenceInCalendarISOWeeks(new Date(week), new Date(current))
}

export function monthsDifference (current, previous = new Date()) {
  return differenceInCalendarMonths(new Date(current), new Date(previous))
}

export function getDayOfWeek (date) {
  return getDay(new Date(date))
}

export function getFirstDayOfWeek (date = new Date(), weekStartOn = 1) {
  return startOfWeek(new Date(date), { weekStartsOn: weekStartOn })
}

export function getLastDayOfWeek (date = new Date(), weekStartOn = 1) {
  return endOfWeek(new Date(date), { weekStartsOn: weekStartOn })
}

export function getFirstDayOfMonth (date = new Date()) {
  return startOfMonth(new Date(date))
}

export function getLastDayOfMonth (date = new Date()) {
  return endOfMonth(new Date(date))
}

export function getCurrentWeek (date = new Date(), weekStartOn = 1) {
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

export function addWeek (date, weeks) {
  return add(new Date(date), { weeks })
}

export function isCurrentHour (current, previous = new Date()) {
  return isSameHour(new Date(current), new Date(previous))
}

export function isCurrentDay (date) {
  return isToday(new Date(date))
}

export function isCurrentWeek (date) {
  return isThisWeek(new Date(date), { weekStartsOn: 1 })
}

export function isCurrentMonth (date) {
  return isThisMonth(new Date(date))
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
