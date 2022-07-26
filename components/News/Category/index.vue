<template>
  <BaseContainer>
    <swiper
      v-show="swiperReady"
      ref="newsCategorySwiper"
      :options="swiperOptions"
      :auto-update="true"
      :auto-destroy="true"
      :delete-instance-on-destroy="true"
      :cleanup-styles-on-destroy="true"
      @ready="swiperReady = true"
    >
      <swiper-slide
        v-for="(category, index) in categories"
        :key="index"
        class="!w-[fit-content]"
      >
        <button
          class="px-6 py-2 rounded-full font-roboto uppercase cursor-pointer"
          :class="[isActive(category) ? 'bg-green-700 font-bold text-white': 'bg-transparent text-gray-600']"
          @click.self="setCurrentCategory(category)"
        >
          {{ category }}
        </button>
      </swiper-slide>
    </swiper>

    <!-- Swiper Skeleton -->
    <div v-show="!swiperReady" class="min-w-0 w-full h-10 flex gap-8 overflow-hidden">
      <div v-for="index in 6" :key="index" class="w-[150px] bg-gray-200 animate-pulse rounded-full" />
    </div>
  </BaseContainer>
</template>

<script>
export default {
  props: {
    categories: {
      type: Array,
      required: true
    },
    currentCategory: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      swiperReady: false,
      swiperOptions: Object.freeze({
        slidesPerView: 'auto',
        spaceBetween: 64,
        mousewheel: true,
        passiveListeners: true
      })
    }
  },
  computed: {
    swiper () {
      return this.$refs.newsCategorySwiper.$swiper
    }
  },
  mounted () {
    const activeIndex = this.getCategoryIndex()
    this.swiper.slideTo(activeIndex, 1000, false)
  },
  methods: {
    setCurrentCategory (category) {
      this.$emit('click', category)
    },
    isActive (category) {
      return this.currentCategory === category
    },
    getCategoryIndex () {
      if (!Array.isArray(this.categories) || !this.currentCategory) {
        return 0
      }
      return this.categories.indexOf(this.currentCategory)
    }
  }
}
</script>
