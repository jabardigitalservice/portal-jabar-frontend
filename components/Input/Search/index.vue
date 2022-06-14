<template>
  <!--
    TODO: Replace search input with search component from jabar design system
  -->
  <form
    class="flex items-center gap-2 rounded-lg bg-white border border-blue-gray-50 px-[9px]"
    :class="small ? 'inline-flex py-[12px]' : 'w-full py-[6px]'"
    @submit.prevent="submitFormData"
  >
    <template v-if="small">
      <Icon name="magnifier" size="16px" class="text-gray-400" />
      <input
        :value="value"
        type="text"
        class="min-w-0 font-lato text-gray-600 focus:outline-none leading-4"
        :placeholder="placeholder"
        @input="setInputValue"
      >
    </template>

    <template v-else>
      <Icon name="magnifier" size="16px" class="text-gray-400" />
      <input
        :value="value"
        type="text"
        class="min-w-0 placeholder-gray-600 border-none flex-grow focus:outline-none"
        :placeholder="placeholder"
        @input="setInputValue"
        @focus="$emit('focus')"
        @blur="$emit('blur')"
      >
      <button v-show="hasValue" type="button" class="text-gray-500" @click="clearInputValue">
        <Icon name="times-circle" size="16px" />
      </button>
      <Button type="submit" class="bg-green-800 rounded-lg text-white text-sm font-bold">
        Cari
      </Button>
    </template>
  </form>
</template>

<script>
export default {
  props: {
    value: {
      type: String,
      required: true
    },
    small: {
      type: Boolean,
      default: false
    },
    placeholder: {
      type: [String, Number],
      default: 'Cari di sini'
    },
    clear: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    hasValue () {
      return this.value !== ''
    }
  },
  methods: {
    submitFormData () {
      if (this.hasValue) {
        this.$emit('submit', this.value)
        if (this.clear) {
          this.clearInputValue()
        }
      }
    },
    setInputValue (event) {
      this.$emit('input', event.target.value)
    },
    clearInputValue () {
      this.$emit('input', '')
      this.$emit('clear', '')
    }
  }
}
</script>

<style scoped>
form:focus-within {
  box-shadow: inset 0px 0px 0px 1px #069550, inset 0px 0px 0px 2px #FFC800;
}
</style>
