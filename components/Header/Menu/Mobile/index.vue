<template>
  <div>
    <div class="min-w-0 flex gap-4">
      <Link link="/pencarian" class="w-7 h-7 flex items-center justify-center">
        <Icon src="/icons/search.svg" />
      </Link>
      <button class="w-7 h-7 flex items-center justify-center" @click="toggleSidebar">
        <Icon v-if="open" key="sidebar-open" src="/icons/close.svg" />
        <Icon v-else key="sidebar-close" src="/icons/hamburger.svg" />
      </button>
    </div>
    <slot />
  </div>
</template>

<script>
export default {
  computed: {
    open () {
      return this.$store.state.sidebar.open
    }
  },
  methods: {
    toggleSidebar () {
      this.$store.dispatch('sidebar/setSidebar')
    }
  }
}
</script>
