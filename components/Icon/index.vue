<template>
  <div class="flex justify-center items-center" :style="{ width: size, height: size }">
    <JdsIcon :name="name" :size="size" />
  </div>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      required: true
    },
    size: {
      type: String,
      required: true
    }
  }
}
</script>
