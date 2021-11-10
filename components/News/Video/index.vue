<template>
  <BaseContainer class="mx-auto">
    <div class="flex justify-between mb-8">
      <h1 class="font-roboto font-bold text-xl uppercase leading-6 text-blue-gray-800">
        VIDEO
      </h1>
      <!-- TODO: change this url -->
      <nuxt-link
        to="/"
        class="group inline-flex font-lato text-sm leading-5 font-normal text-blue-gray-800
        group-hover:text-blue-gray-500"
      >
        Lihat Semua Video di&nbsp;
        <span class="capitalize">{{ category }}</span>
        <span class="ml-3 w-4 h-4">
          <Icon
            size="16px"
            src="/icons/circle-arrow-right.svg"
            alt="right arrow icon"
          />
        </span>
      </nuxt-link>
    </div>

    <div class="w-full h-full grid grid-cols-1 gap-6 md:grid-cols-2 md:h-[436px]">
      <!-- Headline Skeleton -->
      <div
        v-if="isEmpty || loading"
        class="w-full h-full bg-gray-200 rounded-xl animate-pulse"
      />
      <NewsVideoHeadline
        v-else
        :title="headline.title"
        :thumbnail="headline.image"
        :link="headline.source"
        :category="category"
        :date="headline.date"
        :author="getAuthorName(headline)"
      />

      <div class="w-full h-full grid grid-cols-1 gap-6 md:grid-cols-2 md:grid-rows-2">
        <!-- Video items Skeletons -->
        <template v-if="isEmpty || loading">
          <div
            v-for="i in 4"
            :key="`item-skel-${i}`"
            class="w-full h-full bg-gray-200 rounded-lg animate-pulse"
          />
        </template>
        <template v-else>
          <NewsVideoItem
            v-for="item in videos.slice(0, 4)"
            :key="item.id"
            :title="item.title"
            :thumbnail="item.image"
            :link="item.source"
            :category="category"
            :date="item.date"
          />
        </template>
      </div>
    </div>
  </BaseContainer>
</template>

<script>
export default {
  props: {
    items: {
      type: Array,
      required: true
    },
    category: {
      type: String,
      required: true
    },
    loading: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  computed: {
    headline () {
      if (Array.isArray(this.items) && this.items.length) {
        return this.items[0]
      }

      return {}
    },
    videos () {
      if (Array.isArray(this.items) && this.items.length) {
        return this.items.slice(1)
      }

      return []
    },
    isEmpty () {
      if (Array.isArray(this.items) && this.items.length === 0) {
        return true
      }

      return false
    }
  },
  methods: {
    getAuthorName (item) {
      return item.author?.name || '-'
    }
  }
}
</script>
