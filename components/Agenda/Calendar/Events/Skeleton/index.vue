<template>
  <div>
    <div class="px-4">
      <div class="w-1/3 h-4 mb-2 bg-gray-200 animate-pulse rounded-md" />
    </div>
    <div class="w-full h-full grid grid-cols-2 gap-4 p-4 md:w-[800px] md:h-[360px]">
      <div>
        <AgendaWidgetListItemSkeleton v-for="i in 3" :key="i" :with-time="true" />
      </div>
      <div class="w-full h-full bg-gray-200 rounded-lg animate-pulse" />
    </div>
  </div>
</template>
