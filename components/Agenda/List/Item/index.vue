<template>
  <AgendaListItemSkeleton v-if="fetchState.pending" />
  <div v-else class="flex gap-5 mb-5 w-full relative">
    <div>
      <div
        class="w-2 h-2 rounded-full relative z-10"
        :class="[
          { 'bg-green-800': done },
          ongoing ? 'border-2 border-green-800 bg-white' : 'bg-gray-300'
        ]"
      />
      <div
        class="border-l h-20 absolute bottom-16 left-1"
        :class="[
          { 'border-green-800': done },
          ongoing ? 'border-green-800' : 'border-gray-300'
        ]"
      />
    </div>
    <div
      class="flex gap-2 w-full px-3 py-2 rounded-lg"
      :class="[
        { 'bg-green-50 bg-opacity-75 border border-green-800': done },
        ongoing ? 'bg-green-800 bg-opacity-100' : 'bg-gray-50'
      ]"
    >
      <div class="flex flex-col gap-3 w-full justify-center">
        <p
          class="line-clamp-1 text-sm font-roboto font-medium"
          :class="{
            'text-green-800': done,
            'text-white': ongoing
          }"
        >
          {{ title }}
        </p>
        <div class="flex justify-between">
          <p
            class="line-clamp-1 text-xs whitespace-nowrap"
            :class="[
              { 'text-green-800': done },
              ongoing ? 'text-white' : 'text-gray-600']"
          >
            {{ time }}
          </p>
          <p
            class="line-clamp-1 text-xs whitespace-nowrap"
            :class="[
              { 'text-green-800': done },
              ongoing ? 'text-white' : 'text-gray-600']
            "
          >
            {{ status }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getEachHour, hoursDifference, isCurrentHour, minutesDifference } from '~/utils/date'

export default {
  props: {
    date: {
      type: String,
      required: true
    },
    title: {
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
    time () {
      const startHour = this.startHour.substring(0, 5)
      const endHour = this.endHour.substring(0, 5)

      return `${startHour} - ${endHour} WIB`
    },
    done () {
      const endHour = new Date(this.date).setHours(...this.endHour.split(':'))

      const endHourDifferent = hoursDifference(endHour)
      const endMinuteDifferent = minutesDifference(endHour)

      return endHourDifferent >= 0 && endMinuteDifferent >= 0
    },
    ongoing () {
      const startHour = new Date(this.date).setHours(...this.startHour.split(':'))
      const endHour = new Date(this.date).setHours(...this.endHour.split(':'))
      const eachHour = getEachHour({
        start: startHour,
        end: endHour
      })

      const currentHour = eachHour.map(hour => isCurrentHour(hour)).includes(true)
      const startMinuteDifferent = minutesDifference(startHour)
      const endMinuteDifferent = minutesDifference(endHour)

      return currentHour && startMinuteDifferent >= 0 && endMinuteDifferent < 0
    },
    status () {
      if (this.done) {
        return 'Telah selesai'
      }

      if (this.ongoing) {
        return 'Sedang berlangsung'
      }

      return 'Belum dimulai'
    }
  }
}
</script>
