<template>
  <article
    ref="news-item"
    class="overflow-hidden grid w-full gap-4 border-4 border-transparent rounded-xl group
    hover:bg-gray-100 hover:border-gray-100"
    :class="small ? 'grid-cols-news-small p-1' : 'grid-cols-news-large'"
    :style="wrapperHeight"
  >
    <div
      ref="news-item-image-wrapper"
      class="cursor-pointer overflow-hidden rounded-lg transition-transform duration-300 ease-in-out"
      :class="loading ? 'bg-gray-200 animate-pulse' : ''"
      :style="imageSize"
    >
      <Link :link="`/berita/${item.slug}`">
        <img
          v-show="!loading"
          ref="news-item-image"
          :src="item.image"
          :alt="item.title"
          class="block transition-transform object-center object-cover duration-300 ease-in-out
          group-hover:transform group-hover:scale-125"
          :style="imageSize"
        >
      </Link>
    </div>
    <div class="w-full flex flex-col items-start justify-center">
      <!-- skeleton -->
      <div v-if="loading" ref="news-item-skeletons" class="w-full">
        <div class="w-3/4 h-5 bg-gray-200 animate-pulse rounded-md mb-3" />
        <div class="w-1/2 h-4 bg-gray-200 animate-pulse rounded-md mb-2" />
      </div>
      <template v-else>
        <Link :link="`/berita/${item.slug}`">
          <h2
            ref="news-item-title"
            class="cursor-pointer font-lato font-medium text-blue-gray-800 mb-2
          group-hover:text-green-800 line-clamp-2"
            :class="small ? 'text-base leading-6' : 'text-lg leading-7'"
          >
            {{ item.title }}
          </h2>
        </Link>
        <p ref="news-item-meta" class="font-normal text-xs leading-5 text-gray-700">
          <span class="group-hover:text-blue-gray-800 capitalize">{{ item.category }}</span> | {{ formatDate(item.published_at) }}
        </p>
      </template>
    </div>
  </article>
</template>

<script>
import { format, daysDifference, relativeTime } from '~/utils/date'

export default {

  props: {
    item: {
      type: Object,
      required: true
    },
    small: {
      type: Boolean,
      required: false,
      default: false
    },
    loading: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  computed: {
    imageSize () {
      if (this.small) {
        return { width: '72px', height: '72px' }
      }

      return { width: '200px', height: '130px' }
    },
    wrapperHeight () {
      if (this.small) {
        return { height: '88px' }
      }

      return { height: '138px' }
    }
  },
  methods: {
    formatDate (date) {
      const differenceInDays = daysDifference(date)

      if (differenceInDays > 0) {
        return format(date, { day: 'numeric', month: 'long', year: 'numeric' })
      }

      return relativeTime(date)
    }
  }
}
</script>
