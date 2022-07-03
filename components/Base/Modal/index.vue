<template>
  <Portal to="modal">
    <div
      v-if="show"
      class="fixed w-full h-full inset-0 bg-black bg-opacity-40 backdrop-filter backdrop-blur-sm z-[100] md:flex md:justify-center md:items-center"
    >
      <!-- Bottom Sheet (Mobile Only) -->
      <section
        v-if="device.isMobile"
        class="modal__body absolute bottom-0 flex flex-col max-w-full bg-white rounded-t-xl h-full transition-all ease-brand duration-300"
        :class="isFullScreen ? 'min-h-full max-h-full' : 'min-h-[75%] max-h-[75%]'"
        :style="bottomSheetStyle"
      >
        <div
          v-touch:moved.self="onTouchMove"
          v-touch:moving.self="onDragY"
          v-touch:end.self="calculateBotomSheetPosition"
          class="absolute w-full h-20 top-0"
        />
        <div class="absolute w-full flex justify-end px-4 -top-14">
          <button class="h-10 w-10 bg-green-700 flex items-center justify-center rounded-full" @click="closeModal">
            <Icon name="times" size="16px" class="text-white" />
          </button>
        </div>
        <div class="p-3">
          <div class="w-16 h-[4px] rounded-full bg-gray-300 mx-auto" />
        </div>
        <slot name="header" />
        <slot />
        <slot name="footer">
          <div class="bg-gray-50 flex w-full items-center justify-center py-4 z-[100] mt-auto px-6">
            <Button class="w-full !justify-center" @click="closeModal">
              {{ buttonLabel }}
            </Button>
          </div>
        </slot>
      </section>

      <!-- Default Modal (Tablet and Dekstop) -->
      <section v-else class="modal__body flex flex-col bg-white rounded-lg overflow-hidden max-h-[90%] max-w-[800px]">
        <slot name="header" />
        <slot />
        <slot name="footer">
          <div class="bg-gray-50 flex w-full items-center justify-center py-4 z-[100]">
            <Button type="button" @click="closeModal">
              {{ buttonLabel }}
            </Button>
          </div>
        </slot>
      </section>
    </div>
  </Portal>
</template>

<script>
import throttle from 'lodash/throttle'
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
    },
    /**
     * Set Bottom Sheet to Fullscreen
     * when modal open for the first time
     */
    fullScreen: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  data () {
    return {
      isFullScreen: this.fullScreen,
      isBeingDragged: false,
      windowHeight: 0,
      bottomSheetHeight: 0
    }
  },
  computed: {
    device () {
      return this.$store.state.device.device
    },
    bottomSheetStyle () {
      if (this.isBeingDragged) {
        return {
          bottom: 0,
          minHeight: `${this.bottomSheetHeight}px`,
          maxHeight: `${this.bottomSheetHeight}px`,
          transition: 'none'
        }
      }

      return ''
    }
  },
  watch: {
    show () {
      lockScroll(this.show)
      if (this.device.isMobile && this.show) {
        setTimeout(() => {
          this.windowHeight = window.innerHeight
        }, 500)
      }
    }
  },
  methods: {
    onDragY: throttle(
      function (e) {
        this.bottomSheetHeight = parseInt(this.windowHeight - e.changedTouches[0].clientY)
      },
      1000 / 60,
      { leading: true, trailing: true }
    ),
    onTouchMove () {
      this.isBeingDragged = true
    },
    calculateBotomSheetPosition () {
      this.isBeingDragged = false

      if (this.bottomSheetHeight > (75 * this.windowHeight / 100)) {
        this.isFullScreen = true
      } else if (this.bottomSheetHeight > (40 * this.windowHeight / 100) && this.bottomSheetHeight < (75 * this.windowHeight / 100)) {
        this.isFullScreen = false
      } else {
        this.closeModal()
      }
    },
    closeModal () {
      this.resetData()
      this.$emit('close')
    },
    resetData () {
      this.isFullScreen = this.fullScreen
      this.isBeingDragged = false
      this.windowHeight = 0
      this.bottomSheetHeight = 0
    }
  }
}
</script>
