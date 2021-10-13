<template>
  <div class="flex items-center px-4">
    <div
      class="self-stretch flex justify-center items-center cursor-pointer"
      @click="slider.prev()"
    >
      <Icon
        name="chevron-left"
        size="14px"
        class="pl-3 pr-6"
        :class="[ firstSlide ? 'text-gray-300' : 'text-blue-gray-800' ]"
      />
    </div>
    <div ref="slider" class="keen-slider flex-grow">
      <div
        v-for="(item, index) in items"
        :key="index"
        class="keen-slider__slide group cursor-pointer flex flex-col justify-center items-center w-12 h-12 rounded flex-shrink-0 flex-grow-0 hover:bg-green-50"
        :class="{
          'bg-green-700 hover:bg-green-800' : isSelected(item)
        }"
        @click="setSelectedDay(item)"
      >
        <div
          class="uppercase leading-3 mb-1"
          :class="[
            isSelected(item) ? 'font-bold text-white': 'text-blue-gray-200 group-hover:text-blue-gray-800',
          ]"
          style="font-size: 10px;"
        >
          {{ getShortWeekday(item) }}
        </div>
        <div
          class="font-roboto font-medium leading-none"
          :class="{ 'font-bold text-white': isSelected(item) }"
        >
          {{ getNumericDay(item) }}
        </div>
      </div>
    </div>
    <div
      class="self-stretch flex justify-center items-center cursor-pointer"
      @click="slider.next()"
    >
      <Icon
        name="chevron-right"
        size="14px"
        class="pl-6 pr-3"
        :class="[ lastSlide ? 'text-gray-300' : 'text-blue-gray-800' ]"
      />
    </div>
  </div>
</template>

<script>
import KeenSlider from 'keen-slider'
import { format, getDayOfWeek } from '~/utils/date'

export default {
  props: {
    items: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      currentIndex: 0,
      selectedDay: 0,
      slider: null
    }
  },
  computed: {
    firstSlide () {
      return this.currentIndex === 0
    },
    lastSlide () {
      /**
       *  Current index is the first index on the displayed slide,
       *  by adding 4 to the index, it will be the last index on the displayed slide.
       */
      const currentIndex = this.currentIndex + 4

      if (this.items.length < 5) {
        return true
      }

      return currentIndex === this.items.length
    }
  },
  mounted () {
    this.currentIndex = this.getDayIndex()
    this.selectedDay = this.getDayIndex()
    this.slider = new KeenSlider(this.$refs.slider, {
      slidesPerView: 4,
      mode: 'free-snap',
      spacing: 20,
      initial: this.currentIndex,
      slideChanged: (s) => {
        this.currentIndex = s.details().relativeSlide
      }
    })
  },
  beforeDestroy () {
    if (this.slider) { this.slider.destroy() }
  },
  activated () {
    this.selectedDay = this.getDayIndex()
    this.slider.moveToSlide(this.getDayIndex())
  },
  methods: {
    getShortWeekday (date) {
      return format(date, { weekday: 'short' })
    },
    getNumericDay (date) {
      return format(date, { day: 'numeric' })
    },
    getDayIndex (date = new Date()) {
      if (getDayOfWeek(date) === 0) {
        return 6
      }

      return getDayOfWeek(date) - 1
    },
    isSelected (date) {
      return this.selectedDay === this.getDayIndex(date)
    },
    setSelectedDay (day) {
      this.selectedDay = this.getDayIndex(day)
      this.$emit('click', day)
    }
  }
}
</script>
