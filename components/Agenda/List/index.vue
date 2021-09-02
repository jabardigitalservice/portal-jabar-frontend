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
      <Icon name="arrow-right" size="14px" class="text-green-800" />
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
