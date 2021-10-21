<template>
  <div class="flex justify-between items-center">
    <div class="flex justify-between items-center gap-5">
      <div class="flex gap-4">
        <Icon
          name="chevron-left"
          class="text-green-800 cursor-pointer"
          size="18px"
          @click="prev"
        />
        <Icon
          name="chevron-right"
          class="text-green-800 cursor-pointer"
          size="18px"
          @click="next"
        />
      </div>
      <p class="font-roboto font-bold text-3xl">
        {{ day }} {{ month }}
        <span class="font-medium text-gray-500">{{ year }}</span>
      </p>
    </div>
    <Select
      label="Tampilkan dalam"
      :options="[{ value: 'month', label: 'Bulan' }, { value: 'week', label: 'Minggu' }]"
      value="month"
      @click="setAgendaView"
    />
  </div>
</template>

<script>
import { addWeek, format, getFirstDayOfWeek, getLastDayOfWeek, isCurrentWeek, weeksDifference } from '~/utils/date'

export default {
  props: {
    calendarApi: {
      type: Object,
      required: false,
      default: null
    },
    agendaView: {
      type: String,
      required: true
    },
    eachDayOfWeek: {
      type: Array,
      required: true
    },
    selectedDate: {
      type: Date,
      required: true
    }
  },
  computed: {
    date () {
      return this.calendarApi ? this.calendarApi.getDate() : new Date()
    },
    day () {
      const firstDayOfWeek = new Date(this.eachDayOfWeek[0]).getDate()
      const lastDayOfWeek = new Date(this.eachDayOfWeek[this.eachDayOfWeek.length - 1]).getDate()

      return this.isMonthView ? '' : `${firstDayOfWeek} - ${lastDayOfWeek}`
    },
    month () {
      return format(this.date, { month: 'long' })
    },
    year () {
      return format(this.date, { year: 'numeric' })
    },
    isMonthView () {
      return this.agendaView === 'month'
    }
  },
  watch: {
    selectedDate (date) {
      this.calendarApi.gotoDate(date)
    }
  },
  methods: {
    next () {
      const next = this.isMonthView ? 'nextMonth' : 'nextWeek'

      this.changeSelectedDate(next)
    },
    prev () {
      const prev = this.isMonthView ? 'prevMonth' : 'prevWeek'

      this.changeSelectedDate(prev)
    },
    /**
     * change `selectedDate` based on action
     * @param {string} action
     * @return {Event}
     */
    changeSelectedDate (action) {
      const date = this.calendarApi.getDate()

      if (action === 'nextMonth') {
        const firstDayOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 1) // get first date of next month
        return this.$emit('change', firstDayOfMonth)
      }

      if (action === 'prevMonth') {
        const lastDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 0) // get last date of prev month
        return this.$emit('change', lastDayOfMonth)
      }

      if (action === 'nextWeek') {
        const selectedWeek = addWeek(date, 1)
        let selectedDay

        if (isCurrentWeek(selectedWeek)) {
          selectedDay = new Date()
        }

        if (weeksDifference(selectedWeek) > 0) {
          selectedDay = getFirstDayOfWeek(selectedWeek)
        }

        if (weeksDifference(selectedWeek) < 0) {
          selectedDay = getLastDayOfWeek(selectedWeek)
        }

        return this.$emit('change', selectedDay)
      }

      if (action === 'prevWeek') {
        const selectedWeek = addWeek(date, -1)
        let selectedDay

        if (isCurrentWeek(selectedWeek)) {
          selectedDay = new Date()
        }

        if (weeksDifference(selectedWeek) > 0) {
          selectedDay = getFirstDayOfWeek(selectedWeek)
        }

        if (weeksDifference(selectedWeek) < 0) {
          selectedDay = getLastDayOfWeek(selectedWeek)
        }

        return this.$emit('change', selectedDay)
      }

      // TODO : add event on date click
      return null
    },
    setAgendaView (view) {
      this.$emit('update:agenda-view', view)
    }
  }
}
</script>
