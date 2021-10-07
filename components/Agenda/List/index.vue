<template>
  <div class="rounded-lg overflow-hidden border border-gray-300">
    <div class="bg-green-50 bg-opacity-75 p-4 flex justify-between items-center">
      <div class="flex flex-col gap-1">
        <p class="uppercase font-roboto text-xs text-blue-gray-200">
          Hari ini
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
        max-height="700px"
        :start-date="selectedDay"
        :end-date="selectedDay"
        :per-page="10"
      />
    </div>
  </div>
</template>

<script>
import { addDay, format, formatISODate } from '~/utils/date'

export default {
  data () {
    return {
      selectedDay: formatISODate(new Date())
    }
  },
  computed: {
    date () {
      return format(this.selectedDay, { day: 'numeric', month: 'long', year: 'numeric' })
    }
  },
  methods: {
    setSelectedDay (day) {
      this.selectedDay = formatISODate(day)
    },
    prevDay () {
      this.setSelectedDay(addDay(this.selectedDay, -1))
    },
    nextDay () {
      this.setSelectedDay(addDay(this.selectedDay, 1))
    }
  }
}
</script>
