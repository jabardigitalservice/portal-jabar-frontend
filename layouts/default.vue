<template>
  <div>
    <PortalTarget
      name="modal"
      slim
      :transition="modalTransition"
    />
    <Header />
    <div class="relative">
      <!-- <LazyGPRWidget v-if="!device.isMobile" /> -->
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
    },
    modalTransition () {
      return {
        functional: true,
        render (h, context) {
          return h('transition', { props: { name: 'modal', mode: 'out-in' } }, context.children)
        }
      }
    }
  }
}
</script>

<style>
.modal-enter-active,
.modal-leave-active {
  @apply transition-opacity ease-brand duration-300 opacity-100;
}

.modal-enter,
.modal-leave-to {
  @apply opacity-0;
}

.modal-enter-active .modal__body,
.modal-leave-active .modal__body {
  @apply transition-transform ease-brand duration-300;
}

.modal-enter .modal__body {
  transform: translateY(200px);
}

.modal-leave-to .modal__body {
  transform: translateY(100%);
}
</style>
