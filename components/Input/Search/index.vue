<template>
  <!--
    TODO: Replace search input with search component from jabar design system
  -->
  <form
    class="relative flex items-center gap-2 rounded-lg bg-white border border-blue-gray-50 px-[9px]"
    :class="small ? 'inline-flex py-[12px]' : 'w-full py-[6px]'"
    @submit.prevent="submitFormData"
  >
    <template v-if="small">
      <Icon name="magnifier" size="16px" class="text-gray-400" />
      <input
        :value="value"
        type="text"
        class="min-w-0 font-lato text-gray-600 focus:outline-none leading-4"
        :placeholder="placeholder"
        @input="setInputValue"
      >
    </template>

    <template v-else>
      <Icon name="magnifier" size="16px" class="text-gray-400" />
      <input
        :value="value"
        type="text"
        aria-label="Kolom Pencarian"
        class="min-w-0 placeholder-gray-600 border-none flex-grow focus:outline-none"
        :placeholder="placeholders.length ? null : placeholder"
        @input="setInputValue"
        @focus="setFocus(true)"
        @blur="setFocus(false)"
      >
      <button v-show="hasValue" type="button" class="text-gray-500" @click="clearInputValue">
        <Icon name="times-circle" size="16px" />
      </button>
      <Button type="submit" class="bg-green-800 rounded-lg text-white text-sm font-bold">
        Cari
      </Button>

      <!-- Input Search Running Placeholder -->
      <client-only>
        <swiper
          v-if="isRunningTextActive && showRunningText"
          ref="inputSearchSwiper"
          :options="swiperOptions"
          class="!absolute !inset-0 !left-[34px] !pointer-events-none"
        >
          <swiper-slide
            v-for="item in placeholders"
            :key="item"
          >
            <div class="h-full flex items-center">
              <p class="leading-none text-gray-600">
                {{ item }}
              </p>
            </div>
          </swiper-slide>
        </swiper>
      </client-only>
    </template>
  </form>
</template>

<script>
export default {
  props: {
    value: {
      type: String,
      required: true
    },
    small: {
      type: Boolean,
      default: false
    },
    placeholders: {
      type: Array,
      default: () => []
    },
    placeholder: {
      type: [String, Number],
      default: 'Cari di sini'
    },
    clear: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      inputFocus: false,
      swiperOptions: Object.freeze({
        slidesPerView: 1,
        direction: 'vertical',
        loop: true,
        passiveListeners: true,
        autoplay: {
          delay: 3000,
          disableOnInteraction: false
        }
      })
    }
  },
  computed: {
    swiper () {
      if (this.isRunningTextActive) {
        return this.$refs.inputSearchSwiper.$swiper
      }
      return null
    },
    hasValue () {
      return this.value !== ''
    },
    showRunningText () {
      return !this.inputFocus && !this.hasValue
    },
    isRunningTextActive () {
      return this.placeholders.length > 0
    }
  },
  activated () {
    if (this.isRunningTextActive) {
      this.$nextTick(() => {
        this.swiper.slideTo(this.swiper.activeIndex + 1)
        this.swiper.autoplay.stop()
        this.swiper.autoplay.start()
      })
    }
  },
  methods: {
    submitFormData () {
      if (this.hasValue) {
        this.$emit('submit', this.value)
        if (this.clear) {
          this.clearInputValue()
        }
      }
    },
    setInputValue (event) {
      this.$emit('input', event.target.value)
    },
    clearInputValue () {
      this.$emit('input', '')
      this.$emit('clear', '')
    },
    setFocus (focus) {
      if (focus) {
        this.inputFocus = true
        this.$emit('focus')
      } else {
        this.inputFocus = false
        this.$emit('blur')
      }
    }
  }
}
</script>

<style scoped>
form:focus-within {
  box-shadow: inset 0px 0px 0px 1px #069550, inset 0px 0px 0px 2px #FFC800;
}
</style>
