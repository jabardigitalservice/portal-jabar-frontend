<template>
  <div class="relative -top-24 z-10">
    <div class="container mx-auto">
      <div class="bg-white p-10 rounded-xl shadow flex flex-col gap-7">
        <AgendaCalendar :selected-date="selectedDate" />
        <AgendaList @change="setSelectedDate" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      selectedDate: new Date()
    }
  },
  methods: {
    setSelectedDate (date) {
      this.selectedDate = new Date(date)
    }
  }
}
</script>
