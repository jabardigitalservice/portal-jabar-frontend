<template>
  <div class="bg-green-50 bg-opacity-50 p-4 -mx-6 -mt-6 mb-6 border-b border-gray-300">
    <div v-if="isMonthView" class="flex justify-between items-center">
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
    <div v-else class="w-full grid grid-cols-7">
      <div v-for="(eachDay, index) in eachDayOfWeek" :key="index" class="flex justify-center items-center">
        <div
          class="flex flex-col justify-center items-center gap-1 px-4 pt-2 pb-3 rounded-xl cursor-pointer"
          :class="{'bg-green-800': isSelected(eachDay)}"
          @click="setSelectedDay(eachDay)"
        >
          <p
            class="font-roboto font-medium"
            :class="{
              'text-blue-gray-300': isSaturday(eachDay) && !isSelected(eachDay),
              'text-red-600': isSunday(eachDay) && !isSelected(eachDay),
              'text-white': isSelected(eachDay)
            }"
          >
            {{ getNumericDay(eachDay) }}
          </p>
          <p
            class="font-roboto text-xs uppercase mb-2"
            :class="[isSelected(eachDay) ? 'text-white font-bold': 'text-blue-gray-300']"
          >
            {{ getLongWeekday(eachDay) }}
          </p>
          <div
            class="rounded-full w-2 h-2"
            :class="[hasEvents(eachDay) ? isSelected(eachDay) ? 'bg-yellow-300' : 'bg-green-800' : 'bg-transparent']"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import uniqBy from 'lodash/uniqBy'
import { addDay, format, formatISODate, isCurrentDay } from '~/utils/date'

export default {
  props: {
    agendaView: {
      type: String,
      required: true
    },
    eachDayOfWeek: {
      type: Array,
      required: true
    },
    selectedDay: {
      type: String,
      required: true
    },
    navigate: {
      type: String,
      required: false,
      default: ''
    }
  },
  data () {
    return {
      weeklyAgendaAvailability: []
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
    isMonthView () {
      return this.agendaView === 'month'
    }
  },
  watch: {
    navigate () {
      this.getWeeklyAgendaAvailability()
    }
  },
  mounted () {
    this.getWeeklyAgendaAvailability()
  },
  methods: {
    async getWeeklyAgendaAvailability () {
      const firstDayOfWeek = formatISODate(this.eachDayOfWeek[0])
      const lastDayOfWeek = formatISODate(this.eachDayOfWeek[this.eachDayOfWeek.length - 1])

      const params = {
        start_date: formatISODate(firstDayOfWeek),
        end_date: formatISODate(lastDayOfWeek)
      }

      try {
        const response = await this.$axios.get('v1/events/calendar', { params })
        const data = response.data.map(item => formatISODate(item.date))

        this.weeklyAgendaAvailability = uniqBy(data)
      } catch (error) {
        this.weeklyAgendaAvailability = []
      }
    },
    prevDay () {
      this.$emit('change', addDay(this.selectedDay, -1))
    },
    nextDay () {
      this.$emit('change', addDay(this.selectedDay, 1))
    },
    setSelectedDay (day) {
      this.$emit('change', formatISODate(day))
    },
    getNumericDay (date) {
      return format(date, { day: 'numeric' })
    },
    getLongWeekday (date) {
      return format(date, { weekday: 'long' })
    },
    isSelected (day) {
      return formatISODate(day) === this.selectedDay
    },
    isSaturday (day) {
      return format(day, { weekday: 'long' }) === 'Sabtu'
    },
    isSunday (day) {
      return format(day, { weekday: 'long' }) === 'Minggu'
    },
    hasEvents (date) {
      const currentDate = formatISODate(date)

      return this.weeklyAgendaAvailability.includes(currentDate)
    }
  }
}
</script>
