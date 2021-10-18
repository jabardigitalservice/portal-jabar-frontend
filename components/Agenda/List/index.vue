<template>
  <div class="rounded-lg overflow-hidden border border-gray-300">
    <div class="bg-green-50 bg-opacity-75 p-4 flex justify-between items-center">
      <div class="flex flex-col gap-1">
        <p class="uppercase font-roboto text-xs text-blue-gray-200">
          {{ day }}
        </p>
        <p class="uppercase font-roboto font-medium text-green-800">
          {{ date }}
        </p>
      </div>
      <div class="flex gap-4">
        <Icon
          name="chevron-left"
          class="text-green-800 cursor-pointer"
          size="18px"
          @click="prevDay()"
        />
        <Icon
          name="chevron-right"
          class="text-green-800 cursor-pointer"
          size="18px"
          @click="nextDay()"
        />
      </div>
    </div>
    <div class="p-6">
      <AgendaWidgetList
        with-time
        :see-more="false"
        max-height="700px"
        :start-date="selectedDay"
        :end-date="selectedDay"
        :per-page="10"
      />
    </div>
  </div>
</template>

<script>
import { addDay, format, formatISODate, isCurrentDay } from '~/utils/date'

export default {
  props: {
    calendarApi: {
      type: Object,
      required: false,
      default: null
    },
    selectedDate: {
      type: Date,
      default: () => new Date()
    }
  },
  computed: {
    day () {
      if (isCurrentDay(this.selectedDay)) {
        return 'Hari ini'
      }
      return format(this.selectedDay, { weekday: 'long' })
    },
    date () {
      return format(this.selectedDay, { day: 'numeric', month: 'long', year: 'numeric' })
    },
    selectedDay () {
      return formatISODate(this.selectedDate)
    }
  },
  deactivated () {
    this.$emit('change', this.selectedDay)
  },
  methods: {
    prevDay () {
      this.$emit('change', addDay(this.selectedDay, -1))
    },
    nextDay () {
      this.$emit('change', addDay(this.selectedDay, 1))
    }
  }
}
</script>
