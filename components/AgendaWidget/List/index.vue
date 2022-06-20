<template>
  <div>
    <slot name="header" />
    <div class="bg-white flex flex-col overflow-hidden h-[380px]">
      <!--
        TODO: Show a placeholder if an error occur
      -->
      <template v-if="fetchState.pending">
        <AgendaWidgetListSkeleton v-for="index in 3" :key="index" />
      </template>
      <div v-else-if="!hasEvents && !fetchState.pending" class="h-full px-4 pb-12">
        <AgendaWidgetEmptyState />
      </div>
      <div v-else class="flex flex-col flex-grow overflow-y-auto pt-1 pr-2 md:pr-4">
        <AgendaWidgetListItem
          v-for="event in events"
          :id="event.id"
          :key="event.id"
          :title="event.title"
          :date="event.date"
          :category="event.category"
          :type="event.type"
          :url="event.url"
          :address="event.address"
          :start-hour="event.start_hour"
          :end-hour="event.end_hour"
        />
      </div>
      <Link v-if="hasEvents" link="/agenda-jawa-barat" class="flex justify-center py-5 border-t border-gray-100">
        <Button type="button" variant="tertiary-paddingless" tabindex="-1">
          Lihat Semua Agenda
          <Icon name="open-new-tab" size="12px" />
        </Button>
      </Link>
    </div>
  </div>
</template>

<script>
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
      events: [],
      fetchState: {
        pending: false,
        error: false
      },
      perPage: 5
    }
  },
  computed: {
    hasEvents () {
      return this.events.length
    }
  },
  watch: {
    startDate () {
      this.events = []
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
        const response = await this.$axios.$get('/v1/public/events', { params })

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
