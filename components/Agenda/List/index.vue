<template>
  <div class="bg-white flex flex-col px-4 pt-5">
    <p class="text-sm uppercase border-b pb-4 text-gray-700 font-medium border-gray-300">
      {{ month }}
    </p>
    <div class="flex flex-col gap-5 py-5 border-b border-gray-300">
      <!--
        TODO: Show a placeholder if an error occur
      -->
      <!--
        TODO: Show a placeholder if no data
      -->
      <AgendaItem
        v-for="event in events"
        :id="event.id"
        :key="event.id"
        :title="event.title"
        :date="event.date"
        :start-hour="event.start_hour"
        :end-hour="event.end_hour"
        :fetch-state="$fetchState"
      />
    </div>
    <div class="py-4 self-end flex items-center gap-2">
      <nuxt-link to="/informasi-dan-berita/agenda-jabar" class="font-medium">
        Selengkapnya
      </nuxt-link>
      <!--
        TODO: Replace icon with icon from jabar design system
      -->
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M3.61159 8.65993H11.0583L7.80492 11.9133C7.54492 12.1733 7.54492 12.5999 7.80492 12.8599C8.06492 13.1199 8.48492 13.1199 8.74492 12.8599L13.1383 8.4666C13.3983 8.2066 13.3983 7.7866 13.1383 7.5266L8.74492 3.13326C8.48492 2.87327 8.06492 2.87327 7.80492 3.13326C7.54492 3.39326 7.54492 3.81326 7.80492 4.07327L11.0583 7.3266L3.61159 7.3266C3.24492 7.3266 2.94492 7.6266 2.94492 7.99326C2.94492 8.35993 3.24492 8.65993 3.61159 8.65993Z" fill="#099449" />
      </svg>
    </div>
  </div>
</template>

<script>
import { format } from '~/utils/date'

export default {
  props: {
    startDate: {
      type: String,
      required: true
    },
    endDate: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      events: []
    }
  },
  async fetch () {
    const response = await this.$axios.$get(`/v1/events?start_date=${this.startDate}&end_date=${this.endDate}&per_page=3`)
    this.events = response.data
  },
  computed: {
    month () {
      return format(this.startDate, { month: 'long', year: 'numeric' })
    }
  },
  activated () {
    /**
     *  Call fetch again if last fetch more than a minute ago
     */
    if (this.$fetchState.timestamp <= Date.now() - 60000) {
      this.$fetch()
    }
  }
}
</script>
