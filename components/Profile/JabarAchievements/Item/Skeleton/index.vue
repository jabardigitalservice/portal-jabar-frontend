<template>
  <li
    class="min-h-[158px] min-w-0 flex p-4 rounded-xl border border-[#E9EDF4]"
    :class="listView === 'list' ? 'h-[158px] gap-6' : 'flex-col gap-2'"
  >
    <div class="w-[60px] h-[60px] object-cover rounded-full bg-gray-200 animate-pulse" />
    <div class="flex-1">
      <div class="w-3/4 h-5 bg-gray-200 animate-pulse rounded-md mb-2" />
      <div class="w-1/2 h-4 bg-gray-200 animate-pulse rounded-md mb-3" />
      <div class="w-4/5 h-3 bg-gray-200 animate-pulse rounded-md mb-1" />
      <div class="w-3/5 h-3 bg-gray-200 animate-pulse rounded-md mb-3" />
      <div class="w-[100px] h-[31px] bg-gray-200 animate-pulse rounded-md" />
    </div>
  </li>
</template>

<script>
export default {
  props: {
    listView: {
      type: String,
      default: 'list'
    }
  }
}
</script>
