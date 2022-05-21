<template>
  <section class="flex flex-wrap gap-4 items-center">
    <span class="inline-flex items-center font-lato font-bold text-green-800 text-sm leading-6">
      Tags
      <Icon src="/icons/tags.svg" alt="tags" size="19px" class="ml-2" />
    </span>
    <ul
      v-for="tag in tags"
      :key="tag.tags_name"
    >
      <li class="rounded-full px-[10px] py-2 text-sm text-gray-700 bg-gray-200 lowercase">
        {{ tag.tag_name }}
      </li>
    </ul>
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
