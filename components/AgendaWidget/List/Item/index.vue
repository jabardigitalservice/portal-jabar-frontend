<template>
  <div class="flex gap-4">
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
        @click="toggleEventDetail"
      >
        <div class="flex flex-col gap-2 w-full justify-center">
          <p
            class="line-clamp-1 text-sm font-roboto font-medium"
            :class="titleClass"
          >
            {{ title }}
          </p>
          <p
            class="line-clamp-1 text-xs px-2 py-1 rounded-md self-start capitalize"
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
    <BaseModal
      :show="isEventDetailOpen"
      button-label="Tutup"
      @close="toggleEventDetail"
    >
      <template #header>
        <h1 class="font-roboto font-medium text-[21px] leading-[34px] text-green-700 px-6 py-2">
          {{ title }}
        </h1>
      </template>
      <div class="py-4 px-6 flex flex-col gap-6">
        <div class="flex gap-3 md:gap-6 flex-wrap">
          <div class="flex items-start gap-4">
            <Icon src="/icons/agenda/category.svg" size="20px" />
            <div class="flex flex-col gap-2">
              <p class="text-xs text-blue-gray-200">
                Kategori Acara
              </p>
              <p class="text-sm text-green-800 bg-green-50 px-2 py-1 rounded-md whitespace-nowrap">
                {{ category }}
              </p>
            </div>
          </div>
          <div class="flex flex-col gap-2 ml-9 md:ml-0">
            <p class="text-xs text-blue-gray-200">
              Tipe Acara
            </p>
            <p
              class="text-sm px-2 py-1 rounded-md whitespace-nowrap capitalize"
              :class="[ isOnline ? 'text-red-600 bg-red-100 ' : 'text-gray-600 bg-gray-100 ' ]"
            >
              {{ type }}
            </p>
          </div>
        </div>
        <div class="flex gap-3 md:gap-6 flex-wrap">
          <div class="flex items-start gap-4">
            <Icon src="/icons/agenda/calendar.svg" size="20px" />
            <div class="flex flex-col gap-2">
              <p class="text-xs text-blue-gray-200">
                Tanggal
              </p>
              <p class="text-sm text-gray-800 whitespace-nowrap">
                {{ formattedDate }}
              </p>
            </div>
          </div>
          <div class="flex flex-col gap-2 ml-9 md:ml-0">
            <p class="text-xs text-blue-gray-200">
              Waktu
            </p>
            <p class="text-sm text-gray-800 whitespace-nowrap">
              {{ time }}
            </p>
          </div>
          <div class="text-xs text-blue-700 bg-blue-50 px-2 py-1 rounded-md whitespace-nowrap self-end ml-9 md:ml-0">
            {{ status }}
          </div>
        </div>
        <div v-if="isOnline" class="flex gap-3 md:gap-6 flex-wrap">
          <div class="flex items-start gap-4">
            <Icon src="/icons/agenda/url.svg" size="20px" />
            <div class="flex flex-col gap-2">
              <p class="text-xs text-blue-gray-200">
                Link Kegiatan
              </p>
              <Link :link="url" class="text-sm text-blue-600 underline">
                {{ url }}
              </Link>
            </div>
          </div>
        </div>
        <div v-else class="flex gap-3 md:gap-6 flex-wrap">
          <div class="flex items-start gap-4">
            <Icon src="/icons/agenda/location.svg" size="20px" />
            <div class="flex flex-col gap-2">
              <p class="text-xs text-blue-gray-200">
                Tempat Pelaksanaan
              </p>
              <p class="text-sm text-gray-800">
                {{ address }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </BaseModal>
  </div>
</template>

<script>
import { format, getEachHour, hoursDifference, isCurrentHour, minutesDifference } from '~/utils/date'

export default {
  props: {
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
    }
  },
  data () {
    return {
      isEventDetailOpen: false
    }
  },
  computed: {
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
  },
  methods: {
    toggleEventDetail () {
      this.isEventDetailOpen = !this.isEventDetailOpen
    }
  }
}
</script>
