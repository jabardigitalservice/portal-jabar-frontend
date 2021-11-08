<template>
  <div class="rounded-lg overflow-hidden border border-gray-300">
    <div class="p-6">
      <AgendaListHeader
        :agenda-view="agendaView"
        :each-day-of-week="eachDayOfWeek"
        :selected-day="selectedDay"
        :navigate="navigate"
        @change="setSelectedDate"
      />
      <div class="bg-white flex flex-col overflow-hidden h-[700px]">
        <!--
          TODO: Show a placeholder if an error occur
        -->
        <template v-if="fetchState.pending">
          <AgendaListSkeleton v-for="index in 10" :key="index" />
        </template>
        <div v-else-if="!hasEvents" class="h-full px-4">
          <AgendaEmptyState />
        </div>
        <div v-else class="flex flex-col overflow-y-scroll">
          <InfiniteScroll :items="events" @refetch="getEvents">
            <template #default="{ item }">
              <AgendaListItem
                :id="item.id"
                :title="item.title"
                :date="item.date"
                :category="item.category"
                :type="item.type"
                :url="item.url"
                :address="item.address"
                :start-hour="item.start_hour"
                :end-hour="item.end_hour"
              />
            </template>
          </InfiniteScroll>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { formatISODate } from '~/utils/date'

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
    selectedDate: {
      type: Date,
      default: () => new Date()
    },
    navigate: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      events: [],
      fetchState: {
        pending: false,
        error: false
      },
      totalPage: 1,
      perPage: 10
    }
  },
  computed: {
    selectedDay () {
      return formatISODate(this.selectedDate)
    },
    hasEvents () {
      return this.events.length
    }
  },
  watch: {
    selectedDay () {
      this.events = []
      this.getEvents()
    }
  },
  deactivated () {
    this.$emit('change', this.selectedDay)
  },
  mounted () {
    this.getEvents()
  },
  methods: {
    setSelectedDate (date) {
      this.$emit('change', date)
    },
    async getEvents (page = 1) {
      if (page > this.totalPage) { return }

      if (!this.events.length) {
        this.fetchState.pending = true
      }

      const params = {
        start_date: this.selectedDay,
        end_date: this.selectedDay,
        per_page: this.perPage,
        page
      }

      try {
        const response = await this.$axios.$get('/v1/events', { params })
        this.events.push(...response.data)
        this.totalPage = response.meta.total_page || 1

        this.fetchState.pending = false
      } catch (error) {
        this.fetchState.error = true
        this.fetchState.pending = false
      }
    }
  }
}
</script>
