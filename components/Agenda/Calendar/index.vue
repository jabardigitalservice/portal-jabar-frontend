<template>
  <div class="flex flex-col gap-9">
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
    <FullCalendar ref="fullCalendar" :options="calendarOptions" />
  </div>
</template>

<script>
import FullCalendar from '@fullcalendar/vue'
import dayGridPlugin from '@fullcalendar/daygrid'
import idLocale from '@fullcalendar/core/locales/id'
import { format } from '~/utils/date'

export default {
  components: {
    FullCalendar
  },
  props: {
    selectedDate: {
      type: Date,
      required: true
    }
  },
  data () {
    return {
      calendarApi: null,
      calendarOptions: {
        plugins: [dayGridPlugin],
        initialView: 'dayGridMonth',
        initialDate: this.selectedDate,
        locale: idLocale,
        headerToolbar: false
      }
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
  mounted () {
    this.calendarApi = this.$refs.fullCalendar.getApi()
  },
  methods: {
    nextMonth () {
      this.calendarApi.next()
    },
    prevMonth () {
      this.calendarApi.prev()
    }
  }
}
</script>
