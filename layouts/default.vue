<template>
  <div>
    <PortalTarget name="modal" />
    <Header />
    <div class="relative">
      <LazyGPRWidget v-if="device.isDesktop" />
      <Nuxt keep-alive :keep-alive-props="{ max: 5 }" />
    </div>
    <Footer />
    <!-- <MobileViewportBlocker /> -->
  </div>
</template>

<script>
export default {
  computed: {
    device () {
      return this.$store.state.device.device
    }
  }
}
</script>
