<template>
  <div class="col-span-5 rounded-lg overflow-hidden h-5/6">
    <Carousel
      lazy
      :items="items"
      :duration="5000"
      :speed="1000"
    >
      <template #default="{ item, index, slider }">
        <div
          class="absolute bottom-0 w-full bg-black bg-opacity-50 transition duration-500 ease-in-out group-hover:bg-opacity-70 backdrop-filter backdrop-blur-lg rounded-lg px-8 py-6 text-white"
          style="height: 47%"
        >
          <div class="flex flex-col h-full">
            <div class="flex-grow">
              <p class="font-roboto text-sm uppercase leading-relaxed tracking-wider opacity-80 mb-1">
                {{ item.category.title }}
              </p>
              <h3 class="line-clamp-2 font-lora font-bold text-3xl leading-normal mb-3">
                {{ item.title }}
              </h3>
              <div class="flex gap-2 opacity-60 text-xs">
                <div class="flex items-center gap-2">
                  <Icon src="/icons/calendar.svg" size="16px" alt="Diterbitkan" />
                  <p>{{ formatDate(item.created_at) }}</p>
                </div>
                <div>|</div>
                <div class="flex items-center gap-2">
                  <Icon src="/icons/pen.svg" size="16px" alt="Penulis" />
                  <p>Penulis: {{ item.created_by }}</p>
                </div>
              </div>
            </div>
            <div class="flex justify-between items-center">
              <Link :link="`/informasi-dan-berita/berita/${getSlug(slider)}`">
                <button type="button" class="text-sm border border-white border-opacity-30 px-4 py-2 rounded-lg">
                  Baca Selengkapnya
                </button>
              </Link>
              <div class="flex items-center gap-4">
                <div class="cursor-pointer" @click="slider.prev()">
                  <Icon name="chevron-left" size="10px" />
                </div>
                <p class="text-sm text-gray-500">
                  <span class="font-bold text-white mr-1">{{ index + 1 }}</span>dari 5
                </p>
                <div class="cursor-pointer" @click="slider.next()">
                  <Icon name="chevron-right" size="10px" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </template>
    </carousel>
  </div>
</template>

<script>
import { format, daysDifference, relativeTime } from '~/utils/date'

export default {
  data () {
    return {
      items: [],
      perPage: 5
    }
  },
  async fetch () {
    const perPage = `per_page=${this.perPage}`
    const filterByHighlightNews = 'highlight=true'
    const queryParams = `?${filterByHighlightNews}&${perPage}`

    const response = await this.$axios.$get(`/v1/news${queryParams}`)
    this.items = response.data
  },
  activated () {
    /**
     *  Call fetch again if last fetch more than a minute ago
     */
    if (this.$fetchState.timestamp <= Date.now() - 60000) {
      this.$fetch()
    }
  },
  methods: {
    formatDate (date) {
      const differenceInDays = daysDifference(date)

      if (differenceInDays > 0) {
        return format(date, { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })
      }

      return relativeTime(date)
    },
    getSlug (slider) {
      const index = slider?.details().relativeSlide || 0

      return this.items[index].slug
    }
  }
}
</script>
