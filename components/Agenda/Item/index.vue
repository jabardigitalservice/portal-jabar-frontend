<template>
  <AgendaItemSkeleton v-if="fetchState.pending" />
  <div v-else class="flex gap-2">
    <div
      class="flex flex-col justify-center items-center w-12 h-12 rounded flex-shrink-0 flex-grow-0"
      :class="{'bg-green-50 text-green-900': hasBackground}"
    >
      <div class="text-xs uppercase leading-none mb-1">
        {{ weekday }}
      </div>
      <div class="font-medium text-lg leading-none">
        {{ day }}
      </div>
    </div>
    <div class="flex flex-col justify-center">
      <div class="line-clamp-1">
        {{ title }}
      </div>
      <div class="text-sm text-gray-700">
        {{ time }}
      </div>
    </div>
  </div>
</template>

<script>
import { format, formatISODate } from '~/utils/date'

export default {
  props: {
    title: {
      type: String,
      required: true
    },
    date: {
      type: String,
      required: true
    },
    startHour: {
      type: String,
      required: true
    },
    endHour: {
      type: String,
      required: true
    },
    fetchState: {
      type: Object,
      required: true
    }
  },
  computed: {
    weekday () {
      return format(this.date, { weekday: 'short' })
    },
    day () {
      return format(this.date, { day: 'numeric' })
    },
    time () {
      const startHour = this.startHour.substring(0, 5)
      const endHour = this.endHour.substring(0, 5)

      return `${startHour} - ${endHour} WIB`
    },
    hasBackground () {
      const date = formatISODate(this.date)
      const currentDate = formatISODate(new Date())
      const currentDateInNextMonth = formatISODate(new Date().setMonth(new Date().getMonth() + 1))

      return date === currentDate || date === currentDateInNextMonth
    }
  }
}
</script>
