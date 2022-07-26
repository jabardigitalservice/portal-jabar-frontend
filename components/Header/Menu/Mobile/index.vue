<template>
  <div>
    <div class="min-w-0 flex gap-4">
      <!-- TEMPORARY HIDE SEARCH ICON -->
      <!-- <Link link="/pencarian" class="w-7 h-7 flex items-center justify-center">
        <Icon src="/icons/search.svg" />
      </Link> -->
      <button
        class="w-7 h-7 flex items-center justify-center"
        aria-label="Navigasi Menu"
        @click="toggleSidebar"
      >
        <Icon
          v-if="open"
          key="sidebar-close"
          src="/icons/close.svg"
          size="24"
          alt="Tutup Menu"
        />
        <Icon
          v-else
          key="sidebar-open"
          src="/icons/hamburger.svg"
          size="24"
          alt="Buka Menu"
        />
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
