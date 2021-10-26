<template>
  <div class="rounded-lg overflow-hidden border border-gray-300">
    <div class="p-6">
      <AgendaWidgetList
        with-time
        :see-more="false"
        :start-date="selectedDay"
        :end-date="selectedDay"
      >
        <template #header>
          <AgendaListHeader
            :agenda-view="agendaView"
            :each-day-of-week="eachDayOfWeek"
            :selected-day="selectedDay"
            @change="setSelectedDate"
          />
        </template>
      </AgendaWidgetList>
    </div>
  </div>
</template>

<script>
import { formatISODate } from '~/utils/date'

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
      default: () => new Date()
    }
  },
  computed: {
    selectedDay () {
      return formatISODate(this.selectedDate)
    }
  },
  deactivated () {
    this.$emit('change', this.selectedDay)
  },
  methods: {
    setSelectedDate (date) {
      this.$emit('change', date)
    }
  }
}
</script>
