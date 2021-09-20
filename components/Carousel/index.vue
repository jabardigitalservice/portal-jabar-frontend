<template>
  <div ref="slider" class="w-full h-full relative overflow-hidden group">
    <div
      v-for="(item, index) in items"
      :key="index"
      class="w-full h-full absolute top-0"
      :style="{ opacity: opacities[index] }"
    >
      <div class="keen-slider__slide w-full h-full relative">
        <img
          v-if="lazy"
          class="lazyload w-full h-full object-cover object-center transition duration-500 ease-in-out group-hover:transform group-hover:scale-110"
          :data-src="item.image"
          :alt="item.title"
        >
        <img
          v-else
          class="w-full h-full object-cover object-center transition duration-500 ease-in-out group-hover:transform group-hover:scale-110"
          :src="item.image"
          :alt="item.title"
        >
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
    lazy: {
      type: Boolean,
      required: false,
      default: false
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
    }
  }
}
</script>
