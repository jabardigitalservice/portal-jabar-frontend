<template>
  <section class="w-full flex flex-col items-center justify-center bg-white pb-8" style="height: 400px">
    <img
      src="/icons/empty-search.svg"
      alt="No result found"
      width="120px"
      height="120px"
      class="mb-4"
    >
    <p class="font-lato text-sm leading-relaxed text-gray-700 text-center mb-0.5">
      Mohon maaf kami tidak dapat menemukan<br> nama program yang cocok dengan
    </p>
    <strong class="font-roboto font-bold text-2xl leading-relaxed text-blue-gray-800 mb-4">
      "{{ searchValue }}"
    </strong>
    <p class="font-lato text-xs leading-2 text-gray-500">
      Cobalah untuk menggunakan kata kunci yang berbeda
    </p>
  </section>
</template>

<script>
export default {
  name: 'EmptyState',
  props: {
    searchValue: {
      type: String,
      default: null
    }
  }

}
</script>
