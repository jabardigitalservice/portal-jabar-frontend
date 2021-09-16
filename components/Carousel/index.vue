<template>
  <div ref="slider" class="h-screen relative overflow-hidden">
    <div
      v-for="(image, index) in images"
      :key="index"
      class="w-full h-screen absolute top-0"
      :style="{ opacity: opacities[index] }"
    >
      <img
        class="keen-slider__slide object-cover object-center w-full h-full"
        :src="image.source"
        :alt="image.title"
      >
    </div>
  </div>
</template>

<script>
import KeenSlider from 'keen-slider'

export default {
  props: {
    images: {
      type: Array,
      required: true
    },
    duration: {
      type: Number,
      required: false,
      default: 3000
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
      slides: this.images.length,
      loop: true,
      duration: 3000,
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
