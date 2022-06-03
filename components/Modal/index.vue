<template>
  <Portal to="modal">
    <div
      v-if="show"
      class="fixed w-screen h-screen bg-black bg-opacity-40 backdrop-filter backdrop-blur-sm flex justify-center items-center"
      style="z-index: 100;"
    >
      <div class="w-full max-w-lg bg-white rounded-lg overflow-hidden">
        <div class="px-6 pt-6">
          <h4 class="font-medium text-xl text-green-800">
            {{ header }}
          </h4>
        </div>
        <slot>
          <div class="p-6">
            <p class="text-sm text-gray-800">
              {{ body }}
            </p>
          </div>
          <div class="bg-gray-50 py-4 flex justify-center items-center">
            <div @click="clickHandler">
              <Button type="button">
                {{ label }}
              </Button>
            </div>
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
    header: {
      type: String,
      required: false,
      default: null
    },
    body: {
      type: String,
      required: false,
      default: null
    },
    label: {
      type: String,
      required: false,
      default: ''
    },
    closeButton: {
      type: Boolean,
      required: false,
      default: true
    }
  },
  methods: {
    clickHandler () {
      this.$emit('click')
    }
  }
}
</script>
