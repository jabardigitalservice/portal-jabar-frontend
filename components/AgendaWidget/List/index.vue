<template>
  <div>
    <div class="bg-white flex flex-col">
      <div
        class="flex flex-col overflow-y-scroll"
        :style="{ 'max-height': maxHeight }"
      >
        <!--
          TODO: Show a placeholder if an error occur
        -->
        <!--
          TODO: Show a placeholder if no data
        -->
        <AgendaWidgetListItem
          v-for="event in events"
          :id="event.id"
          :key="event.id"
          :with-time="withTime"
          :title="event.title"
          :date="event.date"
          :category="event.category.title"
          :type="event.type"
          :url="event.url"
          :address="event.address"
          :start-hour="event.start_hour"
          :end-hour="event.end_hour"
          :fetch-state="fetchState"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { format } from '~/utils/date'

export default {
  props: {
    withTime: {
      type: Boolean,
      required: false,
      default: false
    },
    maxHeight: {
      type: String,
      required: false,
      default: null
    },
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
      events: [],
      fetchState: {
        pending: false,
        error: false
      }
    }
  },
  computed: {
    month () {
      return format(this.startDate, { month: 'long', year: 'numeric' })
    }
  },
  watch: {
    startDate () {
      this.getEvents()
    }
  },
  mounted () {
    this.getEvents()
  },
  methods: {
    async getEvents () {
      this.fetchState.pending = true
      const startDate = `start_date=${this.startDate}`
      const endDate = `end_date=${this.endDate}`
      const perPage = `per_page=${this.perPage}`
      const queryParams = `?${startDate}&${endDate}&${perPage}`

      try {
        const response = await this.$axios.$get(`/v1/events${queryParams}`)
        this.events = response.data
        this.fetchState.pending = false
      } catch (error) {
        this.fetchState.error = true
        this.fetchState.pending = false
      }
    }
  }
}
</script>
