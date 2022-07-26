<template>
  <div ref="news-list" class="flex flex-col">
    <div ref="news-list-header">
      <slot name="header" />
    </div>
    <div
      :class="{
        'w-full min-h-[540px]': true,
        'min-h-0 pr-4 overflow-y-auto' : maxHeight
      }"
      :style="maxHeight ? { maxHeight: maxHeight + 'px' } : null"
    >
      <div
        ref="news-list-body"
        class="flex-auto w-full flex flex-col gap-5 md:gap-6"
        :class="small ? 'gap-5' : 'gap-6'"
      >
        <NewsItem
          v-for="item in items.slice(0, maxItem)"
          :key="item.id"
          :item="item"
          :small="small"
          :loading="loading"
        />
      </div>
    </div>
    <div ref="news-list-footer" class="w-full">
      <slot name="footer" />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    items: {
      type: Array,
      required: true
    },
    maxItem: {
      type: Number,
      required: false,
      default: 5
    },
    small: {
      type: Boolean,
      required: false,
      default: false
    },
    loading: {
      type: Boolean,
      required: false,
      default: false
    },
    maxHeight: {
      type: [String, Number],
      required: false,
      default: null
    }
  }
}
</script>
