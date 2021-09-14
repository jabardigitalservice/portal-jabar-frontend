<template>
  <img v-if="src" :src="src" :alt="alt" :width="size" :height="size">
  <div v-else class="flex justify-center items-center" :style="{ width: size, height: size }">
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
  }
}
</script>
