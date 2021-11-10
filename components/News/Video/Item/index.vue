<template>
  <a
    ref="news-video-item"
    :href="link"
    target="_blank"
    rel="noopener noreferrer"
  >
    <article
      ref="news-video-wrapper"
      class="relative w-full h-full min-h-[207px] rounded-lg overflow-hidden bg-gray-200 group"
    >
      <div
        ref="news-video-background"
        class="absolute inset-0 transition-transform bg-cover bg-no-repeat bg-center duration-300 ease-in-out
        group-hover:transform group-hover:scale-110"
        :style="`background-image: url('${thumbnail}')`"
      />
      <div
        ref="news-video-detail"
        class="absolute flex flex-col w-full h-3/4 px-6 py-4 bottom-0 bg-gradient-to-b from-transparent to-[#1F1F1F]
        transition-all duration-300 ease-in-out group-hover:bg-[#1F1F1F] group-hover:bg-opacity-20"
      >
        <p
          ref="news-video-category"
          class="font-opensans text-xs font-medium uppercase text-white leading-4 mb-2"
        >
          {{ category }}
        </p>
        <h2
          ref="news-video-title"
          class="flex-auto font-lora font-bold text-base leading-6 text-white mb-2 line-clamp-2"
        >
          {{ title }}
        </h2>
        <div class="flex w-full items-center justify-between">
          <div class="flex items-center gap-[10px]">
            <Icon
              src="/icons/calendar.svg"
              alt="calendar icon"
              size="20px"
              class="text-[#D7D6D6]"
            />
            <p ref="news-video-date" class="text-xs leading-4 font-sans text-[#D7D6D6]">
              {{ formattedDate }}
            </p>
          </div>
          <Icon
            src="/icons/play-button.svg"
            alt="play button icon"
            size="30px"
          />
        </div>
      </div>
    </article>
  </a>
</template>

<script>
import { format } from '~/utils/date'

export default {
  props: {
    link: {
      type: String,
      required: true
    },
    thumbnail: {
      type: String,
      required: true
    },
    category: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    date: {
      type: [Date, String],
      required: true
    }
  },
  computed: {
    formattedDate () {
      return format(this.date, { weekday: 'long', day: 'numeric', month: 'short', year: 'numeric' })
    }
  }
}
</script>
