<template>
  <Portal to="modal">
    <div
      v-if="show"
      ref="modal"
      class="fixed w-full h-full inset-0 bg-black bg-opacity-40 backdrop-filter backdrop-blur-sm z-[100]"
    >
      <div class="w-full h-full md:flex md:justify-center md:items-center overflow-y-auto md:overflow-hidden">
        <div
          class="modal__body relative top-[25%] flex flex-col min-h-[75%] max-h-screen max-w-full bg-white rounded-xl
          md:static md:min-h-0 md:max-h-[90%] md:max-w-[640px] lg:max-w-[800px] md:overflow-hidden"
        >
          <div class="md:hidden absolute w-full flex justify-end px-4 -top-14">
            <button class="h-10 w-10 bg-green-800 flex items-center justify-center rounded-full" @click="$emit('close')">
              <Icon name="times" size="16px" class="text-white" />
            </button>
          </div>
          <div class=" md:hidden w-full flex justify-center py-4">
            <div class="w-24 h-[4px] rounded-full bg-gray-300" />
          </div>
          <slot name="header" />
          <slot />
          <slot name="footer">
            <div class="bg-white flex w-full items-center justify-center py-4 z-[100] mt-auto px-6">
              <Button class="w-full md:w-auto !justify-center" @click="$emit('close')">
                {{ buttonLabel }}
              </Button>
            </div>
          </slot>
        </div>
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
  watch: {
    show () {
      lockScroll(this.show)
    }
  }
}
</script>
