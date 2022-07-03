import Vue from 'vue'
import Vue2TouchEvents from 'vue2-touch-events'

Vue.use(Vue2TouchEvents, {
  tapTolerance: 80,
  swipeTolerance: 30
})
