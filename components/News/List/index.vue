<template>
  <div ref="news-list" class="py-8">
    <div ref="news-list-header">
      <slot name="header" />
    </div>
    <div
      ref="news-list-body"
      class="w-full flex flex-col"
      :class="small ? 'gap-5' : 'gap-6'"
    >
      <NewsItem
        v-for="item in items.slice(0, maxItem)"
        :key="item.id"
        :item="item"
        :small="small"
        :loading="loading"
        @clicked="onNewsClick"
      />
    </div>
    <div ref="news-list-footer">
      <slot name="footer" />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    items: {
      type: Array,
      required: true
    },
    maxItem: {
      type: Number,
      required: false,
      default: 5
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
  methods: {
    onNewsClick ({ id, slug }) {
      this.$router.push(`/berita/${slug}`)
    }
  }
}
</script>
