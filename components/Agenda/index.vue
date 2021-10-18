<template>
  <div class="relative -top-24 z-10">
    <BaseContainer>
      <div class="bg-white p-10 rounded-xl shadow flex flex-col gap-7">
        <AgendaNavigation
          :calendar-api="calendarApi"
          :selected-date="selectedDate"
          @change="setSelectedDate"
        />
        <AgendaCalendar
          :calendar-api.sync="calendarApi"
          :selected-date="selectedDate"
          @change="setSelectedDate"
        />
        <AgendaList
          :selected-date="selectedDate"
          @change="setSelectedDate"
        />
      </div>
    </BaseContainer>
  </div>
</template>

<script>
export default {
  data () {
    return {
      calendarApi: null,
      selectedDate: new Date()
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
