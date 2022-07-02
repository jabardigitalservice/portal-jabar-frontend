<template>
  <Portal to="modal">
    <div
      v-if="show"
      ref="modal"
      class="fixed w-full h-full inset-0 bg-black bg-opacity-40 backdrop-filter backdrop-blur-sm z-[100] md:flex md:justify-center md:items-center"
    >
      <!-- Bottom Sheet (Mobile Only) -->
      <div
        v-if="device.isMobile"
        class="modal__body relative flex flex-col max-w-full bg-white rounded-xl h-full transition-all ease-brand duration-300"
        :class="fullScreen ? 'top-0 min-h-full' : 'min-h-[75%] max-h-[75%] top-[25%]'"
      >
        <div v-touch:swipe.self="handleSwipe" class="absolute w-full h-20 top-0" />
        <div class="absolute w-full flex justify-end px-4 -top-14">
          <button class="h-10 w-10 bg-green-800 flex items-center justify-center rounded-full" @click="closeModal">
            <Icon name="times" size="16px" class="text-white" />
          </button>
        </div>
        <div class="p-4">
          <div class="w-24 h-[4px] rounded-full bg-gray-300 mx-auto" />
        </div>
        <slot name="header" />
        <slot class="overflow-y-auto" />
        <slot name="footer">
          <div class="bg-white flex w-full items-center justify-center py-4 z-[100] mt-auto px-6">
            <Button class="w-full !justify-center" @click="closeModal">
              {{ buttonLabel }}
            </Button>
          </div>
        </slot>
      </div>

      <!-- Default Modal (Tablet and Dekstop) -->
      <div v-else class="modal__body flex flex-col bg-white rounded-lg overflow-hidden max-h-[90%] max-w-[800px]">
        <slot name="header" />
        <slot />
        <slot name="footer">
          <div class="bg-white flex w-full items-center justify-center py-4 z-[100]">
            <Button type="button" @click="closeModal">
              {{ buttonLabel }}
            </Button>
          </div>
        </slot>
      </div>
    </div>
  </Portal>
</template>

<script>
import { lockScroll } from '~/utils/browser'

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
  data () {
    return {
      fullScreen: false
    }
  },
  computed: {
    device () {
      return this.$store.state.device.device
    }
  },
  watch: {
    show () {
      lockScroll(this.show)
    }
  },
  methods: {
    handleSwipe (direction) {
      switch (direction) {
        case 'top':
          if (!this.fullScreen) {
            this.fullScreen = true
          }
          break

        case 'bottom':
          if (this.fullScreen) {
            this.fullScreen = false
          } else {
            this.$emit('close')
          }
          break

        default:
          break
      }
    },
    closeModal () {
      this.fullScreen = false
      this.$emit('close')
    }
  }
}
</script>
