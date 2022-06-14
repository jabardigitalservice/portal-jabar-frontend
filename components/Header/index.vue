<template>
  <header
    class="flex items-center w-full h-12 fixed top-0 z-50 bg-green-800 sm:h-16 lg:h-20"
    :class="[hasBackgroundColor ? 'bg-green-800' : 'lg:bg-black lg:bg-opacity-10 lg:backdrop-filter lg:backdrop-blur-lg lg:hover:bg-green-800']"
  >
    <BaseContainer>
      <HeaderNavigation @active="setActiveMenu" />
      <HeaderSidebar />
    </BaseContainer>
  </header>
</template>

<script>
import throttle from 'lodash/throttle'

export default {
  data () {
    return {
      windowsHeight: null,
      activeMenu: null,
      isSidebarOpen: false
    }
  },
  computed: {
    hasBackgroundColor () {
      return this.windowsHeight > 600 || !!this.activeMenu
    }
  },
  watch: {
    $route () {
      this.$store.dispatch('sidebar/closeSidebar')
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
