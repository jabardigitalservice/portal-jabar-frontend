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
import { format, formatISODate } from '~/utils/date'

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
        dayHeaderFormat: { weekday: 'long' },
        headerToolbar: false,
        dayCellClassNames: this.dayCellClassNames,
        events: this.getCalendarEvents,
        dayMaxEvents: 0,
        moreLinkContent (args) {
          return args.num + ' Kegiatan'
        }
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
    },
    dayCellClassNames ({ date }) {
      const currentDate = formatISODate(date)
      const selectedDate = formatISODate(this.selectedDate)

      /**
       *  Adding classNames to the <td> cell dynamically
       *  if date is selected
       */
      if (currentDate === selectedDate) {
        return ['active']
      }

      return ['not-active']
    },

    /**
     * Get events data from API
     * @param {Object} fetchInfo - Object containing calendar information
     * See {@link https://fullcalendar.io/docs/events-function} for more information
     * @return {Array}
     */
    async getCalendarEvents (fetchInfo) {
      const params = {
        start_date: formatISODate(fetchInfo.start),
        end_date: formatISODate(fetchInfo.end)
      }

      const response = await this.$axios.get('v1/events', { params })

      const { data } = response.data

      return data.map(event => ({
        id: event.id,
        title: event.title,
        date: formatISODate(event.date)
      }))
    }
  }
}
</script>

<style>
/**
 *  Set font family to calendar
 */
.fc {
  font-family: 'Roboto', sans-serif !important;
}
/**
 *  Add border radius to calendar
 */
.fc-scrollgrid.fc-scrollgrid-liquid {
  border-radius: 8px !important;
  overflow: hidden !important;
}
/**
 *  Styling for header title
 */
.fc-col-header-cell.fc-day {
  background-color: rgba(230, 246, 236, 0.5) !important;
  color: #069550 !important;
  text-transform: uppercase !important;
  text-align: left !important;
  font-weight: 600 !important;
  padding: 12px !important;
  border: none !important;
  border-bottom: 1px solid #DDDDDD !important;
}
/**
 *  Text color is red for sunday
 */
.fc-daygrid-day.fc-day.fc-day-sun {
  color: red !important;
}
/**
 *  Change text color to white for sunday if the current day is active
 */
.fc-daygrid-day.fc-day.fc-day-sun.active {
  color: white !important;
}
/**
 *  Change padding and text align for each date
 */
.fc-daygrid-day-top {
  flex-direction: unset !important;
  padding: 12px !important;
}
/**
 *  Active style for selected date
 */
.active {
  background-color: #069550 !important;
  color: white !important;
  font-weight: 700 !important;
  border-radius: 8px !important;
}
/**
 *  Default style for date when it is not selected
 */
.not-active {
  background-color: white !important;
  color: #133C6B !important;
  font-weight: 400 !important;
}

.fc-daygrid-day-frame {
  position: relative !important;
}
/**
 *  Default style for date when it is not selected
 */
.fc-daygrid-day-events {
  position: absolute !important;
  width: 100% !important;
  bottom: 0 !important;
  right: 0 !important;
  display: flex !important;
  align-items: center !important;
  justify-content: flex-end !important;
  padding: 0.8rem 1rem !important;
}
/**
 *  Default style for events
 */
.fc-daygrid-more-link {
  padding: 6px 10px !important;
  background: #FAFAFB !important;
  color: #A9ACB1 !important;
  font-size: 14px !important;
  line-height: 23px !important;
  border-radius: 6px !important;
}
/**
 *  Default style for today and future events
 */
.fc-day-today .fc-daygrid-more-link,
.fc-day-future .fc-daygrid-more-link {
  background: #F1FAF4 !important;
  color: #069550 !important;
}
/**
 *  Default style for active events
 */
.active .fc-daygrid-more-link{
  background: #008444 !important;
  color: #fff !important;
}
</style>
