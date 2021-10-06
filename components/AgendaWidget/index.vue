<template>
  <div class="col-span-2 rounded-md overflow-hidden flex flex-col">
    <div class="flex flex-col gap-1 bg-green-800 px-5 pt-3 pb-4 text-white">
      <h4 class="text-xl leading-8 font-bold">
        Agenda Jawa Barat
      </h4>
      <p class="text-xs leading-5">
        Dapatkan informasi terkait semua kegiatan yang dilakukan di jawa barat.
      </p>
    </div>
    <div class="rounded-br-md rounded-bl-md flex-grow bg-white border border-blue-gray-50 overflow-hidden">
      <div class="bg-white flex flex-col gap-6 pt-5">
        <div class="px-4">
          <p class="font-roboto font-medium mb-1">
            {{ currentMonth }}
          </p>
          <p class="text-xs text-gray-500">
            Minggu ke {{ currentWeek }}
          </p>
        </div>
        <AgendaWidgetSlider :items="eachDayOfWeek" @click="setSelectedDay" />
        <div class="pl-5 pr-4">
          <AgendaWidgetList :start-date="selectedDay" :end-date="selectedDay" />
        </div>
      </div>
      <Link link="/agenda-jawa-barat" class="flex justify-center items-center py-5 border-t border-gray-100">
        <Button type="button" variant="tertiary-paddingless" tabindex="-1">
          Lihat Semua Agenda
          <Icon name="open-new-tab" size="12px" />
        </Button>
      </Link>
    </div>
  </div>
</template>

<script>
import {
  format,
  formatISODate,
  getCurrentWeek,
  getEachDay,
  getFirstDayOfMonth,
  getFirstDayOfWeek,
  getLastDayOfMonth,
  getLastDayOfWeek,
  monthsDifference
} from '~/utils/date'

export default {
  data () {
    return {
      selectedDay: formatISODate(new Date())
    }
  },
  computed: {
    currentMonth () {
      return format(this.startDate, { month: 'long', year: 'numeric' })
    },
    currentWeek () {
      return getCurrentWeek()
    },
    startDate () {
      let firstDayOfWeek = getFirstDayOfWeek()

      if (monthsDifference(firstDayOfWeek)) {
        firstDayOfWeek = getFirstDayOfMonth()
      }

      return formatISODate(firstDayOfWeek)
    },
    endDate () {
      let lastDayOfWeek = getLastDayOfWeek()

      if (monthsDifference(lastDayOfWeek)) {
        lastDayOfWeek = getLastDayOfMonth()
      }

      return formatISODate(lastDayOfWeek)
    },
    eachDayOfWeek () {
      return getEachDay({ start: this.startDate, end: this.endDate })
    }
  },
  methods: {
    setSelectedDay (day) {
      this.selectedDay = formatISODate(day)
    }
  }
}
</script>
