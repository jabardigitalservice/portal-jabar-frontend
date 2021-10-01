<template>
  <div>
    <div class="bg-white flex flex-col pl-6 pr-4">
      <div class="flex flex-col h-80 overflow-hidden overflow-y-scroll">
        <!--
        TODO: Show a placeholder if an error occur
      -->
        <!--
        TODO: Show a placeholder if no data
      -->
        <AgendaListItem
          v-for="event in events"
          :id="event.id"
          :key="event.id"
          :title="event.title"
          :date="event.date"
          :category="event.category.title"
          :type="event.type"
          :url="event.url"
          :address="event.address"
          :start-hour="event.start_hour"
          :end-hour="event.end_hour"
          :fetch-state="$fetchState"
        />
      </div>
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
    },
    perPage: {
      type: Number,
      required: false,
      default: 5
    }
  },
  data () {
    return {
      events: []
    }
  },
  async fetch () {
    const startDate = `start_date=${this.startDate}`
    const endDate = `end_date=${this.endDate}`
    const perPage = `per_page=${this.perPage}`
    const queryParams = `?${startDate}&${endDate}&${perPage}`

    const response = await this.$axios.$get(`/v1/events${queryParams}`)
    this.events = response.data
  },
  computed: {
    month () {
      return format(this.startDate, { month: 'long', year: 'numeric' })
    }
  },
  watch: {
    startDate () {
      this.$fetch()
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
