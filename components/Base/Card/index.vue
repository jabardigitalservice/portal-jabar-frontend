<template>
  <article
    class="w-full bg-white py-3 px-4 group cursor-pointer rounded-lg hover:bg-green-50"
    v-on="$listeners"
  >
    <div v-if="icon" class="inline-flex w-10 h-10 p-1 items-center justify-center mb-1">
      <img
        :src="icon"
        :alt="title"
        class="w-full h-full object-center"
      >
    </div>
    <h2 class="font-lato font-bold text-lg text-blue-gray-800 leading-7 mb-1 group-hover:text-green-700">
      {{ title }}
    </h2>
    <p class="font-lato text-sm leading-6 text-gray-600 group-hover:text-blue-gray-900">
      {{ description }}
    </p>
  </article>
</template>

<script>
export default {
  name: 'BaseCard',
  props: {
    icon: {
      type: String,
      required: false,
      default: null
    },
    title: {
      type: [String, Number],
      required: false,
      default: ''
    },
    description: {
      type: [String, Number],
      required: false,
      default: ''
    }
  }
}
</script>
