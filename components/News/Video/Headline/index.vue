<template>
  <a
    ref="news-video"
    :href="link"
    rel="noopener noreferrer"
    target="_blank"
  >
    <article
      ref="news-video-wrapper"
      class="relative w-full min-h-[207px] bg-gray-200 rounded-lg overflow-hidden group md:h-[436px] md:rounded-xl"
    >
      <div
        ref="news-video-background"
        class="absolute inset-0 transition-transform bg-cover bg-no-repeat bg-center duration-300 ease-in-out group-hover:transform group-hover:scale-110"
        :style="`background-image: url('${thumbnail}')`"
      />
      <div
        ref="news-video-overlay"
        class="absolute inset-0 w-full h-full bg-gradient-to-b from-transparent to-[#1F1F1F]"
      />
      <div
        ref="news-video-detail"
        class="absolute inset-0 z-10 w-full h-full flex flex-col items-center justify-center p-9"
      >
        <Icon
          src="/icons/play-button.svg"
          alt="play button icon"
          size="60px"
          class="mb-4 hidden md:block"
        />
        <p
          ref="news-video-category"
          class="font-sans text-sm font-semibold uppercase text-white leading-4 mb-2"
        >
          {{ category }}
        </p>
        <h2
          ref="news-video-title"
          class="font-lora font-bold text-base leading-6 text-white text-center mb-2 line-clamp-2
          md:text-3xl md:leading-normal"
        >
          {{ title }}
        </h2>
        <div class="flex items-center gap-[10px]">
          <Icon
            src="/icons/calendar.svg"
            alt="calendar icon"
            size="20px"
            class="text-[#D7D6D6]"
          />
          <p ref="news-video-date" class="text-xs leading-4 font-sans text-[#D7D6D6]">
            {{ datetime }}
          </p>
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
    datetime () {
      const date = format(this.date, { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })
      const time = new Date(this.date).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })

      return `${date} - ${time} WIB`
    }
  }
}
</script>
