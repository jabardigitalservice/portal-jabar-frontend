<template>
  <li
    class="min-h-[158px] min-w-full p-4 rounded-xl flex border border-[#E9EDF4]"
    :class="listView === 'list' ? 'gap-6' : 'flex-col gap-2'"
  >
    <img
      :src="icon"
      :alt="title"
      class="w-[60px] h-[60px] object-cover"
      width="60"
      height="60"
    >
    <div>
      <p class="font-lato font-bold text-sm text-blue-gray-800 leading-6 md:text-base">
        {{ title }}
      </p>
      <p class="font-lato text-xs font-normal text-blue-gray-500 leading-5 mb-3 md:font-medium md:text-sm">
        {{ appreciator }}
      </p>
      <p class="font-lato text-xs font-normal text-[#415C84] leading-5 line-clamp-3 mb-3">
        {{ description }}
      </p>
      <nuxt-link
        to="#"
        class="rounded-md px-[10px] py-2 text-xs font-normal text-gray-700 bg-gray-100 cursor-pointer
          hover:text-green-700 hover:bg-green-50"
      >
        {{ category }}
      </nuxt-link>
    </div>
  </li>
</template>

<script>
export default {
  props: {
    listView: {
      type: String,
      default: 'list'
    },
    icon: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    },
    appreciator: {
      type: String,
      default: ''
    },
    description: {
      type: String,
      default: ''
    },
    category: {
      type: String,
      default: ''
    }
  }

}
</script>
