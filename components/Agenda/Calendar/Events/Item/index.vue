<template>
  <!-- <AgendaWidgetListItemSkeleton v-if="fetchState.pending" :with-time="withTime" /> -->
  <div class="flex gap-4">
    <div
      v-if="withTime"
      class="flex relative left-0 text-sm"
      :class="active ? 'text-green-800 font-bold' : 'text-blue-gray-200'"
    >
      <div class="w-5">
        <div v-show="active" class="text-green-800 text-md leading-none">
          &#9658;
        </div>
      </div>
      {{ startTime }}
    </div>
    <div class="flex gap-4 mb-4 w-full relative cursor-pointer">
      <div>
        <div class="relative pl-1">
          <div
            class="w-2 h-2 rounded-full relative z-10"
            :class="circleClass"
          />
          <div
            v-if="ongoing"
            class="animate-ping w-2 h-2 rounded-full absolute z-10 top-0 border-2 border-green-800 bg-white"
          />
        </div>
        <div
          class="absolute border-l left-2"
          :class="borderClass"
          style="height: 112px; bottom: 88px"
        />
      </div>
      <div
        class="flex gap-2 w-full px-3 py-2 rounded-lg"
        :class="cardClass"
        @click="$emit('open-detail', detail)"
      >
        <div class="flex flex-col gap-2 w-full justify-center">
          <p
            class="line-clamp-1 text-sm font-roboto font-medium"
            :class="titleClass"
          >
            {{ title }}
          </p>
          <p
            class="line-clamp-1 text-xs px-2 py-1 rounded-md self-start"
            :class="categoryClass"
          >
            {{ category }}
          </p>
          <div class="flex justify-between">
            <p
              class="line-clamp-1 text-xs whitespace-nowrap"
              :class="timeClass"
            >
              {{ time }}
            </p>
            <p
              class="line-clamp-1 text-xs whitespace-nowrap"
              :class="statusClass"
            >
              {{ status }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { format, getEachHour, hoursDifference, isCurrentHour, minutesDifference } from '~/utils/date'

export default {
  props: {
    withTime: {
      type: Boolean,
      required: true
    },
    id: {
      type: Number,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    date: {
      type: String,
      required: true
    },
    category: {
      type: String,
      required: true
    },
    type: {
      type: String,
      required: true
    },
    url: {
      type: String,
      required: false,
      default: null
    },
    address: {
      type: String,
      required: false,
      default: null
    },
    startHour: {
      type: String,
      required: true,
      validator (value) {
        /**
         *  The value must match HH:mm:ss format
         */
        const pattern = /^(?:(?:([01]?\d|2[0-3]):)?([0-5]?\d):)?([0-5]?\d)$/
        return pattern.test(value)
      }
    },
    endHour: {
      type: String,
      required: true,
      validator (value) {
        /**
         *  The value must match HH:mm:ss format
         */
        const pattern = /^(?:(?:([01]?\d|2[0-3]):)?([0-5]?\d):)?([0-5]?\d)$/
        return pattern.test(value)
      }
    },
    fetchState: {
      type: Object,
      required: true
    },
    active: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  computed: {
    detail () {
      return {
        id: this.id,
        title: this.title,
        time: this.time,
        status: this.status,
        date: this.formattedDate,
        address: this.address,
        isOnline: this.type === 'online',
        category: this.category,
        type: this.type,
        url: this.url || ''
      }
    },
    startTime () {
      return this.startHour.substring(0, 5)
    },
    endTime () {
      return this.endHour.substring(0, 5)
    },
    time () {
      return `${this.startTime} - ${this.endTime} WIB`
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
    notStarted () {
      return !this.done && !this.ongoing
    },
    status () {
      if (this.done) {
        return 'Telah selesai'
      }

      if (this.ongoing) {
        return 'Sedang berlangsung'
      }

      return 'Belum dimulai'
    },
    formattedDate () {
      return format(this.date, { weekday: 'long', year: 'numeric', month: 'short', day: 'numeric' })
    },
    isOnline () {
      return this.type === 'online'
    },
    circleClass () {
      return {
        'bg-gray-300': this.notStarted,
        'border-2 border-green-800 bg-white': this.ongoing,
        'bg-green-800': this.done
      }
    },
    borderClass () {
      return {
        'border-gray-300': this.notStarted,
        'border-green-800': this.ongoing || this.done
      }
    },
    cardClass () {
      return {
        'bg-gray-50 group hover:bg-green-50': this.notStarted,
        'bg-green-800 bg-opacity-100': this.ongoing,
        'bg-green-50 bg-opacity-50 border border-green-800': this.done
      }
    },
    titleClass () {
      return {
        'group-hover:text-green-800': this.notStarted,
        'text-white': this.ongoing,
        'text-green-800': this.done
      }
    },
    categoryClass () {
      return {
        'text-green-800 bg-gray-200 bg-opacity-75 group-hover:bg-green-100 group-hover:bg-opacity-40': this.notStarted,
        'text-white bg-green-900 bg-opacity-50': this.ongoing,
        'text-green-800 bg-green-100 bg-opacity-40': this.done
      }
    },
    timeClass () {
      return {
        'text-gray-600': this.notStarted,
        'text-green-800': this.done,
        'text-white': this.ongoing
      }
    },
    statusClass () {
      return {
        'text-gray-600': this.notStarted,
        'text-green-800': this.done,
        'text-white': this.ongoing
      }
    }
  }
}
</script>
