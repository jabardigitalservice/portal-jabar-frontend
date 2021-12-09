<template>
  <article
    class="w-full bg-white py-3 px-4 group cursor-pointer rounded-lg hover:bg-[#F0FBF4]"
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
        class="min-h-full object-center object-contain"
      >
    </figure>
    <h2
      :title="title"
      class="font-lato font-bold text-lg text-blue-gray-800 leading-7 mb-1 group-hover:text-green-700 line-clamp-1"
    >
      {{ title }}
    </h2>
    <p class="font-lato text-sm leading-6 text-gray-600 group-hover:text-blue-gray-900 line-clamp-2 mb-1">
      {{ description }}
    </p>
    <ul class="featured-program__categories w-full flex overflow-x-auto gap-2">
      <li
        v-for="category in categories"
        :key="category"
        class="whitespace-nowrap capitalize font-lato text-xs text-gray-700 bg-gray-100 px-2 py-1 rounded-sm leading-5
        group-hover:text-green-800 group-hover:bg-green-50"
      >
        {{ category }}
      </li>
    </ul>
  </article>
</template>

<script>
export default {
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
    },
    categories: {
      type: Array,
      required: false,
      default: () => []
    }
  }
}
</script>

<style scoped>
/* Hide scrollbar for Chrome, Safari and Opera */
.featured-program__categories::-webkit-scrollbar {
  display: none;
}

/* Hide scrollbar for IE, Edge and Firefox */
.featured-program__categories {
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
}
</style>
