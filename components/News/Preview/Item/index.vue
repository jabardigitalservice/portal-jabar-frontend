<template>
  <div v-if="fetchState.pending" class="rounded-lg bg-white">
    <div class="flex items-start gap-6 p-4 animate-pulse">
      <div class="w-48 h-48 bg-gray-200 rounded" />
      <div class="flex flex-col flex-1 gap-6">
        <div class="flex flex-col gap-3">
          <div class="w-full h-4 bg-gray-200 rounded" />
          <div class="w-4/5 h-4 bg-gray-200 rounded" />
        </div>
        <div class="flex flex-col gap-3">
          <div class="w-11/12 h-4 bg-gray-200 rounded" />
          <div class="w-10/12 h-4 bg-gray-200 rounded" />
        </div>
        <div class="flex flex-col gap-3">
          <div class="w-3/12 h-4 bg-gray-200 rounded" />
        </div>
      </div>
    </div>
  </div>
  <nuxt-link
    v-else
    :to="`/informasi-dan-berita/berita/${slug}`"
    class="flex items-start gap-6 p-4 rounded-lg bg-white cursor-pointer hover:shadow"
  >
    <img
      :src="image"
      :alt="title"
      class="w-48 h-48 object-cover rounded-md"
      width="192"
      height="192"
    >
    <div class="flex flex-col gap-4 w-full">
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
      return format(this.createdAt)
    }
  }
}
</script>
