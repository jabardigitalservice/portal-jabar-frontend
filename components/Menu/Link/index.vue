<template>
  <a v-if="isExternalLink" :href="link" target="_blank" rel="noreferrer">
    <slot />
  </a>
  <nuxt-link v-else :to="link">
    <slot />
  </nuxt-link>
</template>

<script>
export default {
  props: {
    link: {
      type: String,
      required: true
    }
  },
  computed: {
    isExternalLink () {
      return this.link.substr(0, 8) === 'https://' || this.link.substr(0, 7) === 'http://'
    }
  }
}
</script>
