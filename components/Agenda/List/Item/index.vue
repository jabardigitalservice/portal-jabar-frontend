<template>
  <AgendaListItemSkeleton v-if="fetchState.pending" />
  <div v-else>
    <div class="flex gap-5 mb-5 w-full relative cursor-pointer">
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
        @click="toggleEventDetail"
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
    <Modal
      :show="isEventDetailOpen"
      :header="title"
      :close-button="false"
      @close="toggleEventDetail"
    >
      <div class="p-6 flex flex-col gap-6">
        <div class="flex gap-6">
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
          <div class="flex flex-col gap-2">
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
        <div class="flex gap-6">
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
          <div class="flex flex-col gap-2">
            <p class="text-xs text-blue-gray-200">
              Waktu
            </p>
            <p class="text-sm text-gray-800 whitespace-nowrap">
              {{ time }}
            </p>
          </div>
          <div class="text-xs text-blue-700 bg-blue-50 px-2 py-1 rounded-md whitespace-nowrap self-end">
            {{ status }}
          </div>
        </div>
        <div v-if="isOnline" class="flex gap-6">
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
        <div v-else class="flex gap-6">
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
      <div class="bg-gray-50 py-4 flex justify-center items-center">
        <div @click="toggleEventDetail">
          <Button>Tutup</Button>
        </div>
      </div>
    </Modal>
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
    },
    fetchState: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      isEventDetailOpen: false
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
    },
    formattedDate () {
      return format(this.date, { weekday: 'long', year: 'numeric', month: 'short', day: 'numeric' })
    },
    isOnline () {
      return this.type === 'online'
    }
  },
  methods: {
    toggleEventDetail () {
      this.isEventDetailOpen = !this.isEventDetailOpen
    }
  }
}
</script>
