<template>
  <div class="w-full">
    <div class="absolute w-full top-[5rem] md:top-24 lg:top-28 z-10">
      <BaseContainer>
        <Breadcrumb class="mb-6" />
      </BaseContainer>
    </div>
    <div class="h-[650px] bg-gray-800">
      <Carousel :items="items" :duration="10000" pause-on-hover>
        <template #filter>
          <div
            class="absolute inset-0"
            style="background: radial-gradient(56.33% 56.33% at 50.59% 43.67%, rgba(0, 23, 28, 0.5) 0%, rgba(0, 11, 14, 0.7) 46.15%, rgba(0, 11, 14, 0.82) 100%)"
          />
        </template>
        <template #content="{ item, currentIndex, prev, next }">
          <div class="absolute w-full bottom-0 text-white">
            <BaseContainer class="grid grid-cols-1 xl:grid-cols-9">
              <div class="flex flex-col justify-end h-full lg:col-span-6 xl:pr-32 pb-6 md:pb-10">
                <div>
                  <p class="font-roboto uppercase leading-relaxed tracking-wider opacity-80 mb-1">
                    {{ item.category }}
                  </p>
                  <h3 class="line-clamp-3 md:line-clamp-2 text-2xl font-lora font-bold md:text-3xl lg:text-4xl leading-9 md:!leading-[48px] mb-6">
                    {{ item.title }}
                  </h3>
                  <div class="flex flex-col md:flex-row gap-2 opacity-100 md:opacity-60 text-sm mb-6">
                    <div class="flex items-center gap-2">
                      <Icon src="/icons/calendar.svg" size="16px" alt="Diterbitkan" />
                      <p class="text-sm md:text-base">
                        {{ formatDate(item.published_at) }}
                      </p>
                    </div>
                    <div class="hidden md:block">
                      |
                    </div>
                    <div class="flex items-center gap-2">
                      <Icon src="/icons/pen.svg" size="16px" alt="Penulis" />
                      <p class="text-sm md:text-base capitalize">
                        Penulis: {{ item.author }}
                      </p>
                    </div>
                  </div>
                </div>
                <div class="md:flex md:justify-between md:items-center">
                  <Link :link="`/berita/${item.slug}`">
                    <button type="button" class="w-full md:w-[fit-content] border border-white border-opacity-30 px-4 py-2 rounded-lg mb-4 md:mb-0">
                      Baca Selengkapnya
                    </button>
                  </Link>
                  <div class="flex justify-between md:justify-start items-center gap-4 h-[38px] md:rounded-full md:bg-[#383838] md:bg-opacity-50 px-2">
                    <div class="cursor-pointer" @click="prev">
                      <Icon name="chevron-left" size="10px" />
                    </div>
                    <p class="text-gray-500 text-sm md:text-base">
                      <span class="font-bold text-white mr-1">{{ currentIndex + 1 }}</span>dari {{ items.length }}
                    </p>
                    <div class="cursor-pointer" @click="next">
                      <Icon name="chevron-right" size="10px" />
                    </div>
                  </div>
                </div>
              </div>

              <!-- Related News Swiper (Mobile and Tablet Only) -->
              <div class="min-h-[153px] md:min-h-[177px] bg-white bg-opacity-5 backdrop-filter backdrop-blur-xl py-3 px-6 rounded-xl border border-white border-opacity-10 mb-6 xl:hidden">
                <p class="uppercase mb-3 font-bold">
                  Berita Terkait
                </p>
                <swiper
                  ref="swiper"
                  :auto-update="true"
                  :auto-destroy="true"
                  :delete-instance-on-destroy="true"
                  :cleanup-styles-on-destroy="true"
                  :options="swiperOptions"
                >
                  <swiper-slide
                    v-for="news of item.related_news.slice(0, 4)"
                    :key="news.id"
                    class="md:!w-[fit-content]"
                  >
                    <Link :link="`/berita/${news.slug}`" class="group">
                      <div class="h-full md:w-[380px] flex gap-3 py-2 bg-white bg-opacity-0 rounded-xl">
                        <div class="flex-shrink-0 overflow-hidden rounded-xl w-16 h-16 md:w-24 md:h-24">
                          <img
                            :src="news.image"
                            :alt="news.title"
                            width="64"
                            height="64"
                            class="w-full h-full flex-shrink-0 object-cover group-hover:transform group-hover:scale-110 transition duration-500 ease-in-out"
                          >
                        </div>
                        <div class="flex flex-col gap-1">
                          <p class="text-xs font-medium uppercase opacity-50 group-hover:opacity-100">
                            {{ news.category }}
                          </p>
                          <p class="line-clamp-1 md:line-clamp-2 text-sm leading-relaxed">
                            {{ news.title }}
                          </p>
                          <div class="flex gap-2">
                            <Icon src="/icons/calendar.svg" size="14px" alt="Diterbitkan" class="opacity-50 group-hover:opacity-100" />
                            <p class="text-xs opacity-50 group-hover:opacity-100">
                              {{ formatDate(news.published_at) }}
                            </p>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </swiper-slide>
                </swiper>
              </div>

              <!-- Related News List (Dekstop Only) -->
              <div class="hidden xl:block col-span-3 p-4 rounded-tl-xl rounded-tr-xl bg-white bg-opacity-5 backdrop-filter backdrop-blur-xl border-l border-t border-white border-opacity-10">
                <p class="p-2 uppercase mb-1 font-bold">
                  Berita Terkait
                </p>
                <div class="flex flex-col gap-2">
                  <Link v-for="news of item.related_news.slice(0, 4)" :key="news.id" :link="`/berita/${news.slug}`" class="group">
                    <div class="flex gap-4 p-2 bg-white bg-opacity-0 group-hover:bg-opacity-5 rounded-xl">
                      <div class="flex-shrink-0 overflow-hidden rounded-xl" style="width: 92px; height: 92px;">
                        <img
                          :src="news.image"
                          :alt="news.title"
                          width="92"
                          height="92"
                          class="flex-shrink-0 object-cover w-full h-full group-hover:transform group-hover:scale-110 transition duration-500 ease-in-out"
                        >
                      </div>
                      <div class="flex flex-col gap-1">
                        <p class="text-xs font-medium uppercase opacity-50 group-hover:opacity-100">
                          {{ news.category }}
                        </p>
                        <p class="line-clamp-2 text-sm leading-relaxed">
                          {{ news.title }}
                        </p>
                        <div class="flex gap-2">
                          <Icon src="/icons/calendar.svg" size="14px" alt="Diterbitkan" class="opacity-50 group-hover:opacity-100" />
                          <p class="text-xs opacity-50 group-hover:opacity-100">
                            {{ formatDate(news.published_at) }}
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
      items: [],
      swiperOptions: Object.freeze({
        slidesPerView: 1,
        spaceBetween: 16,
        mousewheel: true,
        passiveListeners: true,
        breakpoints: {
          420: {
            slidesPerView: 'auto'
          }
        }
      })
    }
  },
  async fetch () {
    try {
      const response = await this.$axios.$get('/v1/public/news/banner')
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
