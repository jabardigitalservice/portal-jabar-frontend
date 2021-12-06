<template>
  <div class="flex w-full h-[38px] mb-6">
    <div class="border-b-[3px] border-green-700">
      <h1 class="whitespace-nowrap font-lato text-sm font-bold leading-6 uppercase text-blue-gray-800">
        {{ label }} <span v-if="category" class="text-gray-500">di {{ category }}</span>
      </h1>
    </div>
    <div class="w-full h-full border-b-[3px] border-blue-gray-50" />
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
