<template>
  <div class="agenda-navigation flex justify-between items-center">
    <div class="grid grid-cols-[auto,1fr,auto] md:grid-cols-[auto,auto,1fr] w-full lg:w-[fit-content] justify-between items-center gap-4 md:gap-5">
      <Icon
        name="chevron-left"
        class="text-green-800 cursor-pointer"
        size="18px"
        @click="prev"
      />
      <Icon
        name="chevron-right"
        class="text-green-800 cursor-pointer row-start-1 col-start-3 md:col-start-2"
        size="18px"
        @click="next"
      />
      <p class="font-roboto font-bold text-lg md:text-2xl lg:text-3xl text-center md:text-left row-start-1 col-start-2 md:col-start-3">
        {{ day }} {{ month }}
        <span class="font-medium text-gray-500">{{ year }}</span>
      </p>
    </div>
    <Select
      class="agenda-navigation__view-select hidden xl:flex"
      label="Tampilkan dalam"
      :options="[{ value: 'month', label: 'Bulan' }, { value: 'week', label: 'Minggu' }]"
      :value="agendaView"
      @click="setAgendaView"
    />
  </div>
</template>

<script>
import { addWeek, addMonth, format, getFirstDayOfWeek, getLastDayOfWeek, isCurrentWeek, isCurrentMonth, weeksDifference } from '~/utils/date'

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
      return this.isMonthView ? '' : `${this.firstDayOfWeek} - ${this.lastDayOfWeek}`
    },
    month () {
      return format(this.initialDate, { month: 'long' })
    },
    year () {
      return format(this.initialDate, { year: 'numeric' })
    },
    isMonthView () {
      return this.agendaView === 'month'
    },
    firstDayOfWeek () {
      return new Date(this.eachDayOfWeek[0]).getDate()
    },
    lastDayOfWeek () {
      return new Date(this.eachDayOfWeek[this.eachDayOfWeek.length - 1]).getDate()
    },
    initialDate () {
      let date = this.selectedDate

      if (!this.isMonthView) {
        /**
         *  If not a month view, the initial date is the end of the week
         */
        date = new Date(this.eachDayOfWeek[this.eachDayOfWeek.length - 1])
      }

      return date
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
      this.$emit('change:navigate', this.firstDayOfWeek)
    },
    prev () {
      const prev = this.isMonthView ? 'prevMonth' : 'prevWeek'

      this.changeSelectedDate(prev)
      this.$emit('change:navigate', this.lastDayOfWeek)
    },
    /**
     * change `selectedDate` based on action
     * @param {string} action
     * @return {Event}
     */
    changeSelectedDate (action) {
      const date = this.calendarApi.getDate()

      if (action === 'nextMonth') {
        const nextMonth = addMonth(date, 1)

        if (isCurrentMonth(nextMonth)) {
          return this.$emit('change', new Date())
        } else {
          const firstDayOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 1) // get first date of next month
          return this.$emit('change', firstDayOfMonth)
        }
      }

      if (action === 'prevMonth') {
        const prevMonth = addMonth(date, -1)

        if (isCurrentMonth(prevMonth)) {
          return this.$emit('change', new Date())
        } else {
          const lastDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 0) // get last date of prev month
          return this.$emit('change', lastDayOfMonth)
        }
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
    },
    setAgendaView (view) {
      if (view) {
        this.$emit('update:agenda-view', view)
      }
    }
  }
}
</script>

<style>
.agenda-navigation .agenda-navigation__view-select .jds-input-text__input-wrapper {
  width: 120px !important;
}
</style>
