<template>
  <div class="relative -top-24 z-10">
    <BaseContainer>
      <div class="bg-white p-10 rounded-xl shadow flex flex-col gap-7">
        <AgendaNavigation
          :calendar-api="calendarApi"
          :agenda-view.sync="agendaView"
          :each-day-of-week="eachDayOfWeek"
          :selected-date="selectedDate"
          @change="setSelectedDate"
        />
        <section v-if="isMonthView" :style="{ minHeight:'600px' }">
          <AgendaCalendar
            :calendar-api.sync="calendarApi"
            :agenda-view="agendaView"
            :each-day-of-week="eachDayOfWeek"
            :selected-date="selectedDate"
            @change="setSelectedDate"
          />
        </section>
        <AgendaList
          v-if="agendaView === 'week'"
          :agenda-view="agendaView"
          :each-day-of-week="eachDayOfWeek"
          :selected-date="selectedDate"
          @change="setSelectedDate"
        />
      </div>
    </BaseContainer>
  </div>
</template>

<script>
import { formatISODate, getEachDay, getFirstDayOfWeek, getLastDayOfWeek } from '~/utils/date'

export default {
  data () {
    return {
      calendarApi: null,
      selectedDate: new Date(),
      agendaView: 'month'
    }
  },
  computed: {
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
  deactivated () {
    this.selectedDate = new Date()
  },
  methods: {
    setSelectedDate (date) {
      this.selectedDate = new Date(date)
    }
  }
}
</script>
