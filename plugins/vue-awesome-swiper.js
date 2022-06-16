import Vue from 'vue'
import VueAwesomeSwiper from 'vue-awesome-swiper'

// import custom style
import 'swiper/css/swiper.css'

Vue.use(VueAwesomeSwiper, {
  slidesPerView: 'auto',
  spaceBetween: 16,
  mousewheel: true,
  passiveListeners: true
})
