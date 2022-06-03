<template>
  <a v-if="isExternalLink" :href="link" target="_blank" rel="noreferrer" @click.stop="onClick">
    <slot />
  </a>
  <nuxt-link v-else :to="link" @click.native.stop="onClick">
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
      return this.link.startsWith('http')
    }
  },
  methods: {
    onClick () {
      this.$emit('click')
    }
  }
}
</script>
