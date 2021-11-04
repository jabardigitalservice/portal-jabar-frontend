<template>
  <div class="bg-white flex flex-col overflow-hidden">
    <div class="flex flex-col">
      <AgendaCalendarEventsItem
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
        :active="isActive(event.id)"
        @open-detail="$emit('open-detail', $event)"
      />
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
      default: null
    },
    currentlyActive: {
      type: [String, Number],
      required: false,
      default: null
    }
  },
  data () {
    return {
      events: []
    }
  },
  computed: {
    month () {
      return format(this.startDate, { month: 'long', year: 'numeric' })
    },
    hasEvents () {
      return this.events.length
    },
    hasHeight () {
      return !!this.height || !!this.maxHeight
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
      this.$emit('loading', true)
      const params = {
        start_date: this.startDate,
        end_date: this.endDate,
        per_page: this.perPage
      }

      try {
        const response = await this.$axios.$get('/v1/events', { params })
        this.events = response.data

        this.$emit('update:events', this.events)
      } catch (error) {
        // silent error
        return []
      } finally {
        this.$emit('loading', false)
      }
    },
    isActive (id) {
      return this.currentlyActive === id
    }
  }
}
</script>
