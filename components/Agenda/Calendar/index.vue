<template>
  <div>
    <FullCalendar v-if="isMonthView" ref="fullCalendar" :options="calendarOptions" />
    <BaseModal :show="showModal" button-label="Tutup" @close="toggleModal">
      <template #header>
        <AgendaListHeader
          class="!mx-0 !mt-0"
          agenda-view="month"
          :each-day-of-week="eachDayOfWeek"
          :selected-day="selectedDay"
          @change="$emit('change', $event)"
        />
      </template>
      <div v-show="loadingEvents">
        <AgendaCalendarEventsSkeleton />
      </div>
      <div v-show="!loadingEvents && !events.length" class="md:w-[800px] md:h-[380px]">
        <AgendaEmptyState />
      </div>
      <div v-show="!loadingEvents && events.length">
        <div class="px-4">
          <p class="font-robobo text-sm leading-6 text-blue-gray-200">
            Terdapat <strong class="text-blue-gray-700">{{ events.length }} Kegiatan</strong>
          </p>
        </div>
        <section class="w-full h-full grid grid-cols-2 gap-4 p-4 md:w-[800px] md:h-[360px]">
          <div class="h-full mb-10 pr-4 overflow-auto">
            <AgendaCalendarEvents
              with-time
              :start-date="selectedDay"
              :end-date="selectedDay"
              :per-page="10"
              :currently-active="currentlyActive"
              @update:events="setDayEvents"
              @open-detail="showDetail"
              @loading="setLoadingEvents"
            />
          </div>
          <div v-if="eventDetail" class="w-full h-full flex items-center justify-center bg-gray-50 rounded-lg">
            <AgendaCalendarEventsDetail :event="eventDetail" />
          </div>
          <div v-else class="w-full h-full flex flex-col items-center justify-center bg-gray-50 rounded-lg gap-4">
            <img src="/icons/empty-search.svg" width="120" height="120" alt="agenda illustration">
            <p class="w-full text-center font-lato text-xs leading-6 text-gray-800">
              <strong>Klik</strong> daftar agenda disebelah kiri <br>
              untuk dapat melihat detail agenda
            </p>
          </div>
        </section>
      </div>
    </BaseModal>
  </div>
</template>

<script>
import FullCalendar from '@fullcalendar/vue'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import idLocale from '@fullcalendar/core/locales/id'
import { formatISODate } from '~/utils/date'

export default {
  components: {
    FullCalendar
  },
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
  data () {
    return {
      showModal: false,
      eventDetail: null,
      events: [],
      loadingEvents: true,
      calendarOptions: {
        plugins: [dayGridPlugin, interactionPlugin],
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
        },
        moreLinkClick: this.toggleModal
      }
    }
  },
  computed: {
    isMonthView () {
      return this.agendaView === 'month'
    },
    selectedDay () {
      return formatISODate(this.selectedDate)
    },
    currentlyActive () {
      if (this.eventDetail) {
        return this.eventDetail.id
      }
      return null
    }
  },
  watch: {
    selectedDate () {
      this.eventDetail = null
    }
  },
  mounted () {
    this.$emit('update:calendar-api', this.$refs.fullCalendar.getApi())
  },
  methods: {
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

      try {
        const response = await this.$axios.get('v1/events/calendar', { params })

        const { data } = response

        return data.map(event => ({
          id: event.id,
          title: event.title,
          date: formatISODate(event.date)
        }))
      } catch (error) {
        // silent error
        return []
      }
    },
    toggleModal (dateInfo = null) {
      if (dateInfo) {
        this.$emit('change', dateInfo.date)
      }
      this.showModal = !this.showModal
    },
    showDetail (event) {
      this.eventDetail = { ...event }
    },
    setLoadingEvents (bool) {
      this.loadingEvents = bool
    },
    setDayEvents (events) {
      this.events = events
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
 * Cursor pointer on day grid
 */
.fc-daygrid-day {
  cursor: pointer !important;
}
/**
 * Change backgound color on non active day grid
 */
.fc-daygrid-day.not-active:hover {
  background: #F1FAF4 !important;
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
/*
 *  Force fullcalendar to hide event popup
 */
.fc-popover {
  visibility: hidden !important;
}
</style>
