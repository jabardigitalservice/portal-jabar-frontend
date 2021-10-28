<template>
  <div
    ref="slider"
    class="w-full h-full relative overflow-hidden group"
    @mouseover="setPause(true)"
    @mouseout="setPause(false)"
  >
    <div
      v-for="(item, index) in items"
      :key="index"
      class="w-full h-full absolute top-0"
      :style="{ opacity: opacities[index] }"
    >
      <div class="keen-slider__slide w-full h-full relative">
        <img
          class="w-full h-full object-cover object-center transition duration-500 ease-in-out"
          :class="{ 'group-hover:transform group-hover:scale-110': hover }"
          :src="item.image"
          :alt="item.title"
        >
        <slot name="filter" />
        <slot :item="item" :index="index" :slider="slider" />
      </div>
    </div>
  </div>
</template>

<script>
import KeenSlider from 'keen-slider'

export default {
  props: {
    items: {
      type: Array,
      required: true
    },
    duration: {
      type: Number,
      required: false,
      default: 3000
    },
    speed: {
      type: Number,
      required: false,
      default: 3000
    },
    hover: {
      type: Boolean,
      required: false,
      default: true
    }
  },
  data () {
    return {
      opacities: [],
      slider: null,
      interval: null
    }
  },
  mounted () {
    this.slider = new KeenSlider(this.$refs.slider, {
      pause: false,
      slides: this.items.length,
      loop: true,
      duration: this.speed,
      move: (s) => {
        const opacities = s.details().positions.map(slide => slide.portion)
        this.setOpacities(opacities)
      }
    })
    this.setInterval()
  },
  beforeDestroy () {
    if (this.slider) {
      this.slider.destroy()
    }
  },
  methods: {
    setOpacities (opacities) {
      this.opacities = opacities
    },
    setInterval () {
      this.resetInterval()
      this.interval = setInterval(() => {
        if (!this.pause) {
          this.slider.next()
        }
      }, this.duration)
    },
    resetInterval () {
      clearInterval(this.interval)
    },
    setPause (active) {
      this.pause = active
      this.setInterval()
    }
  }
}
</script>
