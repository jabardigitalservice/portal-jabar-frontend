<template>
  <div>
    <slot name="header" />
    <div
      class="bg-white flex flex-col overflow-hidden"
      :style="{ 'height': height, 'max-height': maxHeight }"
    >
      <!--
        TODO: Show a placeholder if an error occur
      -->
      <div v-if="!hasEvents" class="h-full px-4" :class="{'pb-12' : !hasHeaderSlot}">
        <AgendaEmptyState />
      </div>
      <div v-else class="flex flex-col" :class="{ 'overflow-y-scroll': hasHeight }">
        <AgendaWidgetListItem
          v-for="event in events"
          :id="event.id"
          :key="event.id"
          :with-time="withTime"
          :title="event.title"
          :date="event.date"
          :category="event.category"
          :type="event.type"
          :url="event.url"
          :address="event.address"
          :start-hour="event.start_hour"
          :end-hour="event.end_hour"
          :fetch-state="fetchState"
        />
      </div>
      <Link v-if="seeMore && hasEvents" link="/agenda-jawa-barat" class="flex justify-center items-center py-5 border-t border-gray-100">
        <Button type="button" variant="tertiary-paddingless" tabindex="-1">
          Lihat Semua Agenda
          <Icon name="open-new-tab" size="12px" />
        </Button>
      </Link>
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
    seeMore: {
      type: Boolean,
      required: false,
      default: true
    },
    height: {
      type: String,
      required: false,
      default: null
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
      default: null
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
    },
    hasEvents () {
      return this.events.length
    },
    hasHeight () {
      return !!this.height || !!this.maxHeight
    },
    hasHeaderSlot () {
      return !!this.$slots.header
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
      const params = {
        start_date: this.startDate,
        end_date: this.endDate,
        per_page: this.perPage
      }

      try {
        const response = await this.$axios.$get('/v1/events', { params })
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
