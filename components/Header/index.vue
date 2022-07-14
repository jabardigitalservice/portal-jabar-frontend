<template>
  <header
    class="flex items-center w-screen h-12 fixed top-0 z-50 bg-green-primary sm:h-16 lg:h-20 transition-colors ease-brand duration-250"
    :class="[hasBackgroundColor ? 'bg-green-primary' : 'lg:bg-black lg:bg-opacity-10 lg:backdrop-filter lg:backdrop-blur-lg lg:hover:bg-green-primary']"
  >
    <BaseContainer>
      <HeaderNavigation @active="setActiveMenu" />
      <transition name="sidebar">
        <HeaderSidebar v-if="open" key="sidebar" />
      </transition>
    </BaseContainer>
  </header>
</template>

<script>
import throttle from 'lodash/throttle'
import { lockScroll } from '~/utils/browser'

export default {
  data () {
    return {
      windowsHeight: null,
      activeMenu: null
    }
  },
  computed: {
    open () {
      return this.$store.state.sidebar.open
    },
    hasBackgroundColor () {
      return this.windowsHeight > 600 || !!this.activeMenu
    }
  },
  watch: {
    $route () {
      this.$store.dispatch('sidebar/closeSidebar')
    },
    open () {
      lockScroll(this.open)
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

<style lang="css" scoped>
.sidebar-enter-active,
.sidebar-leave-active {
  @apply ease-brand;
  transition: opacity 200ms;
}

.sidebar-enter,
.sidebar-leave-to {
  opacity: 0;
}
</style>
