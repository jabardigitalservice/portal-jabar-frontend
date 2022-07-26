<template>
  <div
    class="rounded-xl w-full flex p-3 bg-gray-50"
    :class="view === 'list' ? 'gap-6 min-h-[147px]' : 'flex-col min-h-[320px]'"
  >
    <div
      class="bg-gray-200 rounded-lg animate-pulse"
      :class=" view === 'list' ? 'w-[120px] h-[120px]' : 'w-full h-[120px] mb-6'"
    />
    <div class="flex-auto flex flex-col justify-center">
      <span class="bg-gray-200 rounded-[4px] mb-6 w-24 h-7 animate-pulse" />
      <div class="w-4/6 h-5 mb-2 rounded-sm bg-gray-200 animate-pulse" />
      <div class="w-4/5 h-4 mb-2 rounded-sm bg-gray-200 animate-pulse" />
      <div class="w-1/3 h-4 rounded-sm bg-gray-200 animate-pulse" />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    view: {
      type: String,
      default: 'list',
      validator (value) {
        return ['list', 'grid'].includes(value)
      }
    }
  }
}
</script>
