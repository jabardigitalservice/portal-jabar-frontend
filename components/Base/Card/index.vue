<template>
  <article
    class="w-full bg-white py-3 px-4 group cursor-pointer rounded-lg hover:bg-green-50"
    v-on="$listeners"
  >
    <figure
      class="inline-flex w-10 h-10 p-1 items-center justify-center mb-1 rounded-full"
      :class="[icon ? 'bg-white' : 'bg-gray-200']"
    >
      <img
        v-if="icon"
        :src="icon"
        :alt="title"
        width="32px"
        height="32px"
        class="w-full h-full object-center object-contain"
      >
    </figure>
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
