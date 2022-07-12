<template>
  <div class="relative -top-24 z-10">
    <BaseContainer>
      <div class="bg-white py-6 px-3 md:px-4 lg:p-10 rounded-xl shadow flex flex-col gap-7 min-h-screen">
        <AgendaNavigation
          :calendar-api="calendarApi"
          :agenda-view.sync="agendaView"
          :each-day-of-week="eachDayOfWeek"
          :selected-date="selectedDate"
          @change="setSelectedDate"
          @change:navigate="setNavigate"
        />
        <section class="min-h-[600px]">
          <AgendaCalendar
            v-if="isMonthView"
            class="opacity-0 xl:opacity-100"
            :calendar-api.sync="calendarApi"
            :agenda-view="agendaView"
            :each-day-of-week="eachDayOfWeek"
            :selected-date="selectedDate"
            @change="setSelectedDate"
          />
          <AgendaList
            v-else
            :agenda-view="agendaView"
            :each-day-of-week="eachDayOfWeek"
            :selected-date="selectedDate"
            :navigate="navigate"
            @change="setSelectedDate"
          />
        </section>
      </div>
    </BaseContainer>
  </div>
</template>

<script>
import debounce from 'lodash/debounce'
import { formatISODate, getEachDay, getFirstDayOfWeek, getLastDayOfWeek } from '~/utils/date'

export default {
  data () {
    return {
      calendarApi: null,
      selectedDate: new Date(),
      agendaView: 'month',
      navigate: ''
    }
  },
  computed: {
    device () {
      return this.$store.state.device.device
    },
    startDate () {
      const firstDayOfWeek = getFirstDayOfWeek(this.selectedDate)

      return formatISODate(firstDayOfWeek)
    },
    endDate () {
      const lastDayOfWeek = getLastDayOfWeek(this.selectedDate)

      return formatISODate(lastDayOfWeek)
    },
    eachDayOfWeek () {
      return getEachDay({ start: this.startDate, end: this.endDate })
    },
    isMonthView () {
      return this.agendaView === 'month'
    }
  },
  watch: {
    agendaView: {
      handler () {
        if (this.device.isMobile || this.device.isTablet) {
          this.$nextTick(() => {
            setTimeout(() => {
              this.agendaView = 'week'
            }, 500)
          })
        }
      },
      immediate: true
    }
  },
  mounted () {
    window.addEventListener('resize', this.updateView)
  },
  destroyed () {
    window.removeEventListener('resize', this.updateView)
  },
  deactivated () {
    this.selectedDate = new Date()
  },
  methods: {
    setSelectedDate (date) {
      this.selectedDate = new Date(date)
    },
    setNavigate (data) {
      this.navigate = data
    },
    updateView: debounce(function (event) {
      if (this.agendaView === 'week') { return }

      if (event.target.innerWidth < 1280) {
        this.agendaView = 'week'
      } else {
        this.agendaView = 'month'
      }
    }, 1000 / 60, { leading: true })
  }
}
</script>
