<template>
  <div class="bg-white flex flex-col overflow-hidden">
    <div class="flex flex-col">
      <InfiniteScroll :items="events" @refetch="getEvents">
        <template #default="{ item }">
          <AgendaCalendarEventsItem
            :id="item.id"
            :title="item.title"
            :date="item.date"
            :category="item.category"
            :type="item.type"
            :url="item.url"
            :address="item.address"
            :start-hour="item.start_hour"
            :end-hour="item.end_hour"
            :active="isActive(item.id)"
            @open-detail="$emit('open-detail', $event)"
          />
        </template>
      </InfiniteScroll>
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
      events: [],
      page: 1,
      totalPage: 1
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
      this.events = []
      this.page = 1
      this.getEvents()
    }
  },
  mounted () {
    this.getEvents()
  },
  methods: {
    async getEvents () {
      if (this.page > this.totalPage) { return }

      if (!this.events.length) {
        this.$emit('loading', true)
      }

      const params = {
        start_date: this.startDate,
        end_date: this.endDate,
        per_page: this.perPage,
        page: this.page
      }

      try {
        const response = await this.$axios.$get('/v1/public/events', { params })
        this.events.push(...response.data)
        this.totalPage = response.meta.total_page || 1
        const totalEvents = response.meta.total_count

        this.page++
        this.$emit('update:events', this.events, totalEvents)
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
