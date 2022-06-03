<template>
  <header
    class="flex items-center w-full h-20 fixed top-0 z-50"
    :class="[hasBackgroundColor ? 'bg-green-800' : 'bg-black bg-opacity-10 backdrop-filter backdrop-blur-lg hover:bg-green-800']"
  >
    <BaseContainer>
      <HeaderNavigation @active="setActiveMenu" />
    </BaseContainer>
  </header>
</template>

<script>
import throttle from 'lodash/throttle'

export default {
  data () {
    return {
      windowsHeight: null,
      activeMenu: null
    }
  },
  computed: {
    hasBackgroundColor () {
      return this.windowsHeight > 600 || !!this.activeMenu
    }
  },
  mounted () {
    window.addEventListener('scroll', this.scrollHandler)
  },
  methods: {
    scrollHandler: throttle(
      function () {
        if (!window) {
          return
        }
        this.windowsHeight = window.scrollY
      },
      1000 / 60,
      { leading: true, trailing: true }
    ),
    setActiveMenu (id) {
      this.activeMenu = id
    }
  }
}
</script>
