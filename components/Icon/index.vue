<template>
  <img
    v-if="src"
    :src="src"
    :alt="alt"
    :width="size"
    :height="size"
    @click="onClick"
  >
  <div v-else class="flex justify-center items-center" :style="{ width: size, height: size }" @click="onClick">
    <JdsIcon :name="name" :size="size" />
  </div>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      required: false,
      default: null
    },
    size: {
      type: String,
      required: false,
      default: null
    },
    src: {
      type: String,
      required: false,
      default: null
    },
    alt: {
      type: String,
      required: false,
      default: null
    }
  },
  methods: {
    onClick () {
      this.$emit('click')
    }
  }
}
</script>
