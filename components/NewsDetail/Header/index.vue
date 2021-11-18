<template>
  <section
    class="relative w-full bg-blue-800 bg-cover bg-center bg-no-repeat"
    :style="{ backgroundImage: `url('${news.image}')` }"
  >
    <div
      class="absolute inset-0"
      style="background: linear-gradient(90deg, rgba(0,35,25,0.9) 5%, rgba(0,11,14,0.5) 50%, rgba(0,23,28,0) 100%);"
    />
    <BaseContainer class="relative pt-24 pb-9 z-10 ">
      <Breadcrumb class="mb-6" />
      <div class="flex flex-col text-blue-gray-100 gap-6">
        <h1 class="font-lora font-bold text-[34px] leading-[48px] text-white mb-2 max-w-3xl">
          {{ news.title }}
        </h1>
        <div class="flex gap-3 text-sm">
          <div class="flex items-center gap-2">
            <Icon src="/icons/calendar.svg" size="16px" alt="Diterbitkan" />
            <p>{{ published }}</p>
          </div>
          <div>|</div>
          <div class="flex items-center gap-2 capitalize">
            <Icon src="/icons/pen.svg" size="16px" alt="Penulis" />
            <p>Penulis: {{ author }}</p>
          </div>
        </div>
        <div class="flex justify-between text-white">
          <div class="flex gap-4">
            <div class="flex flex-row gap-3 items-start">
              <div class="border rounded-full border-white w-7 h-7 flex justify-center items-center border-opacity-25">
                <Icon name="eye" size="12px" />
              </div>
              <div>
                <p>{{ getViewsText(news.views) }} kali</p>
                <p class="text-xs text-blue-gray-100">
                  Berita ini dilihat
                </p>
              </div>
            </div>
            <div class="flex flex-row gap-3 items-start">
              <div class="border rounded-full border-white w-7 h-7 flex justify-center items-center border-opacity-25">
                <Icon name="share" size="12px" />
              </div>
              <div>
                <p>{{ news.shared }} kali</p>
                <p class="text-xs text-blue-gray-100">
                  Berita ini dibagikan
                </p>
              </div>
            </div>
          </div>
          <Button>
            Bagikan Berita
            <Icon name="share" size="16px" />
          </Button>
        </div>
      </div>
    </BaseContainer>
  </section>
</template>

<script>
import { format } from '~/utils/date'

export default {
  props: {
    news: {
      type: Object,
      required: true
    }
  },
  computed: {
    published () {
      return format(this.news.created_at, { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })
    },
    author () {
      return this.news.author?.name
    }
  },
  methods: {
    getViewsText (number) {
      return new Intl.NumberFormat('id-ID', {
        notation: 'compact',
        compactDisplay: 'long'
      }).format(number)
    }
  }
}
</script>
