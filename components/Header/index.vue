<template>
  <header
    class="flex items-center w-full h-20 fixed top-0 z-50"
    :class="[hasBackgroundColor ? 'bg-green-800' : 'bg-black bg-opacity-10 backdrop-filter backdrop-blur-lg hover:bg-green-800']"
  >
    <div class="container mx-auto">
      <HeaderNavigation @active="setActiveMenu" />
    </div>
  </header>
</template>

<script>
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
    scrollHandler () {
      this.windowsHeight = window.scrollY
    },
    setActiveMenu (id) {
      this.activeMenu = id
    }
  }
}
</script>
