<template>
  <Portal to="modal">
    <div
      v-if="show"
      ref="modal"
      class="fixed w-full h-full bg-black bg-opacity-40 backdrop-filter backdrop-blur-sm flex justify-center items-center z-[100]"
    >
      <div class="flex flex-col bg-white rounded-lg overflow-hidden max-h-full md:max-h-[90%]">
        <slot name="header" />
        <slot />
        <slot name="footer">
          <div class="bg-white flex w-full items-center justify-center py-4 z-[100]" @click="$emit('close')">
            <Button type="button">
              {{ buttonLabel }}
            </Button>
          </div>
        </slot>
      </div>
    </div>
  </Portal>
</template>

<script>
export default {
  props: {
    show: {
      type: Boolean,
      required: true
    },
    buttonLabel: {
      type: String,
      required: false,
      default: ''
    }
  },
  watch: {
    show () {
      if (this.show) {
        document.body.style.overflow = 'hidden'
      } else {
        document.body.style.overflow = 'auto'
      }
    }
  }
}
</script>
