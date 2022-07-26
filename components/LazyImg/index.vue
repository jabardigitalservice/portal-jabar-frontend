<template>
  <img
    v-lazy="src"
    class="lazy-img"
    :src="placeholderSrc"
    :width="width"
    :height="height"
    v-bind="$attrs"
    v-on="$listeners"
  >
</template>

<script>
export default {
  props: {
    src: {
      type: String,
      default: ''
    },
    width: {
      type: [String, Number],
      default: ''
    },
    height: {
      type: [String, Number],
      default: ''
    }
  },
  computed: {
    placeholderSrc () {
      // Add transparent svg image to prevent showing broken image on initial load
      return `data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${this.width} ${this.height}"%3E%3C/svg%3E`
    }
  }
}
</script>

<style scoped>
.lazy-img[lazy=loading] {
  @apply bg-gray-200 animate-pulse rounded-xl
}
</style>
