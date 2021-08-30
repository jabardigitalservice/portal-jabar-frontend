<template>
  <div class="rounded-md overflow-hidden flex flex-col">
    <p class="text-2xl leading-loose bg-green-800 px-4 py-2 text-white">
      Agenda Acara
    </p>
    <div class="rounded-br-md rounded-bl-md flex-grow bg-white">
      <AgendaList
        v-for="(event, index) in events"
        :key="index"
        :start-date="event.startDate"
        :end-date="event.endDate"
      />
    </div>
  </div>
</template>

<script>
import { add, differenceInCalendarMonths, endOfMonth } from 'date-fns'

export default {
  data () {
    return {
      events: [
        {
          startDate: this.getDate(),
          endDate: this.getDate({ days: 2 })
        },
        {
          startDate: this.getDate({ months: 1 }),
          endDate: this.getDate({ days: 2, months: 1 })
        }
      ]
    }
  },
  methods: {
    getDate (duration = {}) {
      let baseDate = new Date()
      let date = add(baseDate, duration)

      if (duration.months) {
        baseDate = add(baseDate, { months: duration.months })
      }

      if (differenceInCalendarMonths(date, baseDate)) {
        date = endOfMonth(baseDate)
      }

      return date.toISOString().substring(0, 10)
    }
  }
}
</script>
