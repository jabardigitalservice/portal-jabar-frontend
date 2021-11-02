<template>
  <div>
    <div class="absolute top-24 w-full z-10">
      <BaseContainer>
        <Breadcrumb class="mb-6" />
      </BaseContainer>
    </div>
    <div style="height: 625px;">
      <div
        class="w-full absolute top-0 h-full"
        style="background: linear-gradient(100deg, rgba(0,40,19,0.9) 0%, rgba(0,32,39,0.8) 55%);"
      />
      <Carousel
        :items="items"
        :duration="10000"
        :speed="1000"
        :hover="false"
        :pause-on-hover="false"
      >
        <template #filter>
          <div
            class="w-full absolute top-0 h-full"
            style="background: radial-gradient(circle, rgba(0,23,28,0.08) 0%, rgba(0,11,14,0.59) 50%, rgba(0,11,14,0.82) 100%);"
          />
        </template>
        <template #default="{ item, index, slider }">
          <div class="absolute bottom-0 w-full text-white">
            <BaseContainer class="grid grid-cols-1 lg:grid-cols-9">
              <div class="flex flex-col justify-end h-full lg:col-span-6 lg:pr-20 xl:pr-32 pb-10">
                <div>
                  <p class="font-roboto uppercase leading-relaxed tracking-wider opacity-80 mb-1">
                    {{ item.category }}
                  </p>
                  <h3 class="line-clamp-2 font-lora font-bold text-4xl leading-normal mb-6">
                    {{ item.title }}
                  </h3>
                  <div class="flex gap-2 opacity-60 text-sm mb-6">
                    <div class="flex items-center gap-2">
                      <Icon src="/icons/calendar.svg" size="16px" alt="Diterbitkan" />
                      <p>{{ formatDate(item.created_at) }}</p>
                    </div>
                    <div class="hidden sm:block">
                      |
                    </div>
                    <div class="hidden sm:flex sm:items-center sm:gap-2">
                      <Icon src="/icons/pen.svg" size="16px" alt="Penulis" />
                      <p>Penulis: {{ item.author.name }}</p>
                    </div>
                  </div>
                </div>
                <div class="flex justify-between items-center">
                  <Link :link="`/berita/${getSlug(slider)}`">
                    <button type="button" class="border border-white border-opacity-30 px-4 py-2 rounded-lg">
                      Baca Selengkapnya
                    </button>
                  </Link>
                  <div class="flex items-center gap-4">
                    <div class="cursor-pointer" @click="slider.prev()">
                      <Icon name="chevron-left" size="10px" />
                    </div>
                    <p class="text-gray-500">
                      <span class="font-bold text-white mr-1">{{ index + 1 }}</span>dari {{ items.length }}
                    </p>
                    <div class="cursor-pointer" @click="slider.next()">
                      <Icon name="chevron-right" size="10px" />
                    </div>
                  </div>
                </div>
              </div>
              <div class="hidden lg:block col-span-3 p-4 rounded-tl-xl rounded-tr-xl bg-white bg-opacity-5 backdrop-filter backdrop-blur-xl border-l border-t border-white border-opacity-10">
                <p class="p-2 uppercase mb-1 font-bold">
                  Berita Terkait
                </p>
                <div class="flex flex-col gap-2">
                  <Link v-for="(news, idx) of item.related_news" :key="news.id" :link="`/berita/${getRelatedNewsSlug(slider, idx)}`">
                    <div class="flex gap-4 p-2 bg-white bg-opacity-0 rounded-xl">
                      <div class="flex-shrink-0 overflow-hidden rounded-xl" style="width: 92px; height: 92px;">
                        <img
                          :src="news.image"
                          width="92"
                          height="92"
                          class="flex-shrink-0 object-cover w-full h-full"
                        >
                      </div>
                      <div class="flex flex-col gap-1">
                        <p class="text-xs font-medium uppercase opacity-50">
                          {{ news.category }}
                        </p>
                        <p class="line-clamp-2 text-sm leading-relaxed">
                          {{ news.title }}
                        </p>
                        <div class="flex gap-2">
                          <Icon src="/icons/calendar.svg" size="14px" alt="Diterbitkan" class="opacity-50" />
                          <p class="text-xs opacity-50">
                            {{ formatDate(news.created_at) }}
                          </p>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              </div>
            </BaseContainer>
          </div>
        </template>
      </Carousel>
    </div>
  </div>
</template>

<script>
import { format, daysDifference, relativeTime } from '~/utils/date'

export default {
  data () {
    return {
      items: []
    }
  },
  async fetch () {
    try {
      const response = await this.$axios.$get('/v1/news/banner')
      this.items = response.data
    } catch (error) {
      this.items = []
    }
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
      const relativeSlide = slider?.details().relativeSlide || 0

      return this.items[relativeSlide].slug
    },
    getRelatedNewsSlug (slider, index) {
      const relativeSlide = slider?.details().relativeSlide || 0
      let list = index

      if (!list) {
        list = 0
      }

      return this.items[relativeSlide].related_news[list].slug
    }
  }
}
</script>
