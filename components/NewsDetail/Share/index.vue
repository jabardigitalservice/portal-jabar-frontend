<template>
  <ul class="inline-flex gap-4 w-full">
    <li
      v-for="network in networks"
      :key="network"
      class="w-16 h-16 p-2 rounded-lg text-center text-xs text-gray-600 leading-[18px]
      hover:bg-gray-100 hover:text-gray-800 transition-colors ease-in-out duration-150"
    >
      <ShareNetwork
        :network="network"
        :url="url"
        :title="title"
        :description="description"
        :quote="quote"
        :hashtags="hastags"
        class="flex flex-col gap-1 w-full h-full items-center justify-center capitalize"
        @close="$emit('share', id)"
      >
        <!-- NOTE: Make sure the icons are available -->
        <Icon
          :src="`/icons/social-media/${network}-logo.svg`"
          :alt="`Share berita ke ${network}`"
          class="w-6 h-6"
        />
        {{ network }}
      </ShareNetwork>
    </li>
  </ul>
</template>

<script>

export default {
  props: {
    id: {
      type: [String, Number],
      default: ''
    },
    /**
     * Define what social media will be used to share article
     * values: ['facebook', 'twitter', 'whatsapp', 'email', and more]
     *
     * for more information about supported values:
     * https://www.npmjs.com/package/vue-social-sharing
     */
    networks: {
      type: Array,
      required: true
    },
    url: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    quote: {
      type: String,
      required: false,
      default: ''
    },
    hastags: {
      type: String,
      required: false,
      default: ''
    }
  }
}
</script>
