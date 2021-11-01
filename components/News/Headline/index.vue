<template>
  <section
    ref="news-headline"
    class="relative rounded-xl overflow-hidden group"
    style="height: 450px"
  >
    <div
      ref="news-headline-image"
      class="cursor-pointer w-full h-full bg-cover bg-no-repeat bg-center transition-transform duration-300 ease-in-out
      group-hover:transform group-hover:scale-110"
      :class="loading ?'bg-gray-200 animate-pulse' : ''"
      :style="`background-image: url('${item.image}')`"
      @click="onHeadlineClick"
    />
    <div
      ref="news-headline-meta"
      class="absolute bottom-0 w-full bg-black bg-opacity-50 transition duration-500 ease-in-out
      group-hover:bg-opacity-70 backdrop-filter backdrop-blur-lg rounded-lg px-8 py-6 text-white"
    >
      <div class="flex flex-col h-full">
        <div v-if="loading" ref="news-headline-skeletons" class="flex-grow mb-4 opacity-70">
          <div class="w-1/3 h-4 bg-gray-200 animate-pulse rounded-lg mb-6" />
          <div class="w-11/12 h-5 bg-gray-200 animate-pulse rounded-lg mb-4" />
          <div class="w-1/2 h-5 bg-gray-200 animate-pulse rounded-lg mb-6" />
          <div class="w-full flex gap-4">
            <div class="w-2/5 h-4 bg-gray-200 animate-pulse rounded-md" />
            <div class="w-2/5 h-4 bg-gray-200 animate-pulse rounded-md" />
          </div>
        </div>
        <template v-else>
          <div class="flex-grow mb-4">
            <p
              ref="news-headline-category"
              class="font-roboto text-sm font-medium uppercase leading-relaxed tracking-wider opacity-80 mb-1"
            >
              Topik Hangat di {{ item.category }}
            </p>
            <h3 ref="news-headline-title" class="line-clamp-2 font-lora font-bold text-3xl leading-normal mb-3">
              {{ item.title }}
            </h3>
            <div class="flex gap-2 opacity-60 text-xs">
              <div ref="news-headline-date" class="flex items-center gap-2">
                <Icon src="/icons/calendar.svg" size="16px" alt="Diterbitkan" />
                <p>{{ formatDate(item.created_at) }}</p>
              </div>
              <div>|</div>
              <div ref="news-headline-author" class="flex items-center gap-2">
                <Icon src="/icons/pen.svg" size="16px" alt="Penulis" />
                <p class="capitalize">
                  Penulis: {{ author }}
                </p>
              </div>
            </div>
          </div>
        </template>
        <div class="flex justify-between items-center">
          <button
            ref="news-headline-button"
            class="text-sm border border-white border-opacity-30 px-4 py-2 rounded-lg"
            @click="onHeadlineClick"
          >
            Baca Selengkapnya
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import isEmpty from 'lodash/isEmpty'
import { format, daysDifference, relativeTime } from '~/utils/date'

export default {
  data () {
    return {
      item: {}
    }
  },
  async fetch () {
    /**
     * TODO: remove this variable
     * and fetch data from API
     */
    const item = {
      id: 8,
      title: 'Ridwan Kamil: Ekonomi Kreatif Berperan Besar Bagi Perekonomian Jabar',
      slug: 'ridwan-kamil-ekonomi-kreatif-berperan-besar-bagi-perekonomian-jabar',
      image: 'https://jabarprov.go.id/assets/images/berita/gambar_44002.jpg',
      category: 'nasional',
      author: {
        name: 'john doe'
      },
      created_at: '2021-08-19T04:58:24Z',
      updated_at: '2021-09-22T23:20:04Z'
    }
    this.item = await item
  },
  computed: {
    loading () {
      return this.$fetchState.pending || isEmpty(this.item)
    },
    author () {
      return this.item.author?.name || '-'
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
    onHeadlineClick () {
      this.$router.push(`/berita/${this.item.slug}`)
    }
  }
}
</script>
