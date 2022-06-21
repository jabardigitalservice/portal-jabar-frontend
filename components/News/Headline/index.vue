<template>
  <section
    ref="news-headline"
    class="relative rounded-xl overflow-hidden group h-[425px] md:h-[400px] lg:h-[450px]"
  >
    <template v-if="loading || !hasNews">
      <div class="w-full h-full bg-gray-200 animate-pulse" />
      <div
        class="absolute bottom-0 w-full bg-black bg-opacity-50 transition duration-500 ease-in-out
        group-hover:bg-opacity-70 backdrop-filter backdrop-blur-lg rounded-lg px-8 py-6 text-white"
      >
        <div ref="news-headline-skeletons" class="flex-grow mb-4 opacity-70">
          <div class="w-1/3 h-4 bg-gray-200 animate-pulse rounded-lg mb-6" />
          <div class="w-11/12 h-5 bg-gray-200 animate-pulse rounded-lg mb-4" />
          <div class="w-1/2 h-5 bg-gray-200 animate-pulse rounded-lg mb-6" />
          <div class="w-full flex gap-4">
            <div class="w-2/5 h-4 bg-gray-200 animate-pulse rounded-md" />
            <div class="w-2/5 h-4 bg-gray-200 animate-pulse rounded-md" />
          </div>
        </div>
      </div>
    </template>
    <template v-else>
      <nuxt-link :to="`/berita/${item.slug}`" :aria-label="item.title">
        <div
          ref="news-headline-image"
          class="cursor-pointer w-full h-full bg-cover bg-no-repeat bg-center transition-transform
          duration-300 ease-in-out group-hover:transform group-hover:scale-110"
          :class="loading ?'bg-gray-200 animate-pulse' : ''"
          :style="`background-image: url('${item.image}')`"
        />
      </nuxt-link>
      <div
        ref="news-headline-meta"
        class="absolute bottom-0 w-full bg-black bg-opacity-50 transition duration-500 ease-in-out
        group-hover:bg-opacity-70 backdrop-filter backdrop-blur-lg rounded-lg p-4 md:px-8 md:py-6 text-white"
      >
        <div class="flex flex-col h-full">
          <div class="flex-grow mb-4">
            <p
              ref="news-headline-category"
              class="font-roboto text-sm font-medium uppercase leading-relaxed tracking-wider opacity-80 mb-1"
            >
              Topik Hangat di {{ item.category }}
            </p>
            <h3 ref="news-headline-title" class="line-clamp-3 md:line-clamp-2 font-lora font-bold text-2xl md:text-3xl !leading-normal mb-3">
              {{ item.title }}
            </h3>
            <div class="flex flex-col md:flex-row gap-2 opacity-60">
              <div ref="news-headline-date" class="flex items-center gap-2">
                <Icon src="/icons/calendar.svg" size="16px" alt="Diterbitkan" />
                <p class="text-sm md:text-xs">
                  {{ date }}
                </p>
              </div>
              <div class="hidden md:block">
                |
              </div>
              <div ref="news-headline-author" class="flex items-center gap-2">
                <Icon src="/icons/pen.svg" size="16px" alt="Penulis" />
                <p class="capitalize text-sm md:text-xs">
                  Penulis: {{ author }}
                </p>
              </div>
            </div>
          </div>
          <div class="block md:flex md:justify-between md:items-center">
            <Link :link="`/berita/${item.slug}`">
              <button type="button" class="w-full md:w-[fit-content] border border-white border-opacity-30 px-4 py-2 rounded-lg">
                Baca Selengkapnya
              </button>
            </Link>
          </div>
        </div>
      </div>
    </template>
  </section>
</template>

<script>
import isEmpty from 'lodash/isEmpty'
import { format, daysDifference, relativeTime } from '~/utils/date'

export default {
  props: {
    item: {
      type: Object,
      required: true
    },
    loading: {
      type: Boolean,
      required: true
    }
  },
  computed: {
    author () {
      return this.item.author || '-'
    },
    date () {
      return this.formatDate(this.item.published_at)
    },
    hasNews () {
      return !isEmpty(this.item)
    }
  },
  methods: {
    formatDate (date) {
      const differenceInDays = daysDifference(date)

      if (differenceInDays > 0) {
        return format(date, { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })
      }

      return relativeTime(date)
    }
  }
}
</script>
