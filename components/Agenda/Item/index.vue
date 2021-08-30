<template>
  <div v-if="fetchState.pending">
    <div class="flex gap-2 animate-pulse">
      <div class="w-12 h-12 bg-gray-200 flex-shrink-0 flex-grow-0 rounded" />
      <div class="flex flex-col gap-2 w-full">
        <div class="w-full h-4 bg-gray-200 rounded" />
        <div class="w-4/12 h-4 bg-gray-200 rounded" />
      </div>
    </div>
  </div>
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
import { format } from '~/utils/date'

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
      const date = this.date.substring(0, 10)
      const currentDate = new Date().toISOString().substring(0, 10)

      return date === currentDate
    }
  }
}
</script>
