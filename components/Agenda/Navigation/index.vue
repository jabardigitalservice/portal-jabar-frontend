<template>
  <div class="flex justify-between items-center">
    <div class="flex justify-between items-center gap-5">
      <div class="flex gap-4">
        <Icon
          name="chevron-left"
          class="text-green-800 cursor-pointer"
          size="18px"
          @click="prevMonth"
        />
        <Icon
          name="chevron-right"
          class="text-green-800 cursor-pointer"
          size="18px"
          @click="nextMonth"
        />
      </div>
      <p class="font-roboto font-bold text-3xl">
        {{ month }}
        <span class="font-medium text-gray-500">{{ year }}</span>
      </p>
    </div>
    <Select
      label="Tampilkan dalam"
      :options="[{ value: 'month', label: 'Bulan' }, { value: 'week', label: 'Minggu' }]"
      value="month"
    />
  </div>
</template>

<script>
import { format } from '~/utils/date'

export default {
  props: {
    calendarApi: {
      type: Object,
      required: false,
      default: null
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
    month () {
      return format(this.date, { month: 'long' })
    },
    year () {
      return format(this.date, { year: 'numeric' })
    }
  },
  watch: {
    selectedDate (date) {
      this.calendarApi.gotoDate(date)
    }
  },
  methods: {
    nextMonth () {
      this.changeSelectedDate('nextMonth')
    },
    prevMonth () {
      this.changeSelectedDate('prevMonth')
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

      // TODO : add event on date click
      return null
    }
  }
}
</script>
