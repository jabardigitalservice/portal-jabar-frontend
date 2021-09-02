<template>
  <NewsPreviewItemSkeleton v-if="fetchState.pending" />
  <nuxt-link
    v-else
    :to="`/informasi-dan-berita/berita/${slug}`"
    class="flex items-start gap-6 p-4 rounded-lg bg-white cursor-pointer hover:shadow"
  >
    <img
      :src="image"
      :alt="title"
      class="w-52 h-52 object-cover rounded-md"
      width="208"
      height="208"
    >
    <div class="flex flex-col gap-5 w-full">
      <h1 class="line-clamp-2 text-2xl font-medium leading-9">
        {{ title }}
      </h1>
      <p class="line-clamp-2 leading-relaxed opacity-70">
        {{ excerpt }}
      </p>
      <div class="flex gap-3 opacity-60">
        <p>{{ date }}</p>
        <div>|</div>
        <p>{{ category.title }}</p>
      </div>
    </div>
  </nuxt-link>
</template>

<script>
import { format } from '~/utils/date'

export default {
  props: {
    title: {
      type: String,
      required: true
    },
    excerpt: {
      type: String,
      required: true
    },
    image: {
      type: String,
      required: true
    },
    slug: {
      type: String,
      required: true
    },
    createdAt: {
      type: String,
      required: true
    },
    category: {
      type: Object,
      required: true
    },
    fetchState: {
      type: Object,
      required: true
    }
  },
  computed: {
    date () {
      return format(this.createdAt, { day: 'numeric', month: 'short', year: 'numeric' })
    }
  }
}
</script>
