<template>
  <div class="w-full h-full p-4 inline-flex flex-col gap-6">
    <div>
      <h2 class="font-roboto font-bold text-base leading-6 text-green-800">
        {{ event.title }}
      </h2>
    </div>
    <!-- Time -->
    <div class="inline-flex gap-4 items-start">
      <Icon src="/icons/agenda/clock.svg" size="20px" />
      <div class="flex flex-col gap-1">
        <p class="text-xs text-blue-gray-200">
          Waktu
        </p>
        <p class="text-sm text-gray-800 whitespace-nowrap">
          {{ event.time }}
        </p>
        <div class="text-xs text-blue-700 bg-blue-50 px-2 py-1 rounded-md whitespace-nowrap">
          {{ event.status }}
        </div>
      </div>
    </div>
    <!-- Category and Type -->
    <div class="grid grid-cols-2 gap-4">
      <div class="inline-flex items-start gap-4">
        <Icon src="/icons/agenda/category.svg" size="20px" />
        <div class="flex flex-col gap-2">
          <p class="text-xs text-blue-gray-200">
            Kategori Event
          </p>
          <p class="text-sm text-green-800 bg-green-50 px-2 py-1 rounded-md whitespace-nowrap">
            {{ event.category }}
          </p>
        </div>
      </div>
      <div class="inline-flex flex-col gap-2">
        <p class="text-xs text-blue-gray-200">
          Tipe Event
        </p>
        <p
          class="text-sm px-2 py-1 rounded-md whitespace-nowrap capitalize"
          :class="[ event.isOnline ? 'text-red-600 bg-red-100 ' : 'text-gray-600 bg-gray-100' ]"
        >
          {{ event.type }}
        </p>
      </div>
    </div>
    <!-- Link -->
    <div v-if="event.isOnline" class="flex gap-6">
      <div class="flex items-start gap-4">
        <Icon src="/icons/agenda/url.svg" size="20px" />
        <div class="flex flex-col gap-2">
          <p class="text-xs text-blue-gray-200">
            Link Kegiatan
          </p>
          <Link :link="event.url" class="text-sm text-blue-600 underline">
            {{ event.url }}
          </Link>
        </div>
      </div>
    </div>
    <!-- Address -->
    <div v-else class="flex gap-6">
      <div class="flex items-start gap-4">
        <Icon src="/icons/agenda/location.svg" size="20px" />
        <div class="flex flex-col gap-2">
          <p class="text-xs text-blue-gray-200">
            Tempat Pelaksanaan
          </p>
          <p class="text-sm text-gray-800">
            {{ event.address }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    event: {
      type: Object,
      required: true
    }
  }
}
</script>
