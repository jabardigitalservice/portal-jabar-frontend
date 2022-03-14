<template>
  <div class="w-full min-h-screen">
    <div
      v-for="index in 3"
      :key="index"
      class="flex flex-col gap-5 mb-16"
    >
      <div class="w-12/12 h-[16px] bg-gray-200 rounded-md animate-pulse" />
      <div class="w-11/12 h-[16px] bg-gray-200 rounded-md animate-pulse" />
      <div class="w-10/12 h-[16px] bg-gray-200 rounded-md animate-pulse" />
      <div class="w-11/12 h-[16px] bg-gray-200 rounded-md animate-pulse" />
      <div class="w-10/12 h-[16px] bg-gray-200 rounded-md animate-pulse" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'NewsDetailSkeleton'
}
</script>
