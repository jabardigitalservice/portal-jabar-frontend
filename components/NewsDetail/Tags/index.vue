<template>
  <section class="flex gap-4 items-center">
    <span class="inline-flex items-center font-lato font-bold text-green-800 text-sm leading-6">
      Tags
      <Icon src="/icons/tags.svg" alt="tags" size="19px" class="ml-2" />
    </span>
    <!-- TODO: change the link to actual route -->
    <nuxt-link
      v-for="tag in tags"
      :key="tag.tags_name"
      :to="`/berita/tags/${tag.tags_name}`"
      class="rounded-full px-[10px] py-2 text-sm text-gray-700 bg-gray-200 lowercase cursor-pointer
      hover:text-green-700 hover:bg-green-50"
    >
      {{ tag.tags_name }}
    </nuxt-link>
  </section>
</template>

<script>
export default {
  props: {
    tags: {
      type: Array,
      required: true
    }
  }
}
</script>
