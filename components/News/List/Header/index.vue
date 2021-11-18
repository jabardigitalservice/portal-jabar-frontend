<template>
  <div class="w-full relative">
    <div class="inline-block">
      <h1 class="font-lato text-sm font-bold leading-6 mb-3 uppercase text-blue-gray-800">
        {{ label }} <span v-if="category" class="text-gray-500">di {{ category }}</span>
      </h1>
      <hr class="w-full bg-green-700" style="height: 3px">
      <hr class="absolute w-full bg-blue-gray-50" style="height: 3px; bottom: 6px; z-index: -1">
    </div>
  </div>
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      required: true
    },
    category: {
      type: String,
      required: false,
      default: ''
    }
  }
}
</script>
