<template>
  <div>
    <div class="px-4">
      <div class="w-1/3 h-4 mb-2 bg-gray-200 animate-pulse rounded-md" />
    </div>
    <div class="w-full h-full grid grid-cols-2 gap-4 p-4 md:w-[800px] md:h-[360px]">
      <div>
        <div v-for="i in 3" :key="i" class="flex gap-12 mb-5 py-2 pr-2 pl-4 animate-pulse">
          <div class="w-12 h-4 bg-gray-200 rounded" />
          <div class="flex flex-col gap-3 w-full">
            <div class="w-8/12 h-4 bg-gray-200 rounded" />
            <div class="w-5/12 h-4 bg-gray-200 rounded" />
            <div class="w-11/12 h-4 bg-gray-200 rounded" />
          </div>
        </div>
      </div>
      <div class="w-full h-full bg-gray-200 rounded-lg animate-pulse" />
    </div>
  </div>
</template>
