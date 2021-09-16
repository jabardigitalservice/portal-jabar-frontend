<template>
  <!--
    TODO: Replace search input with search component from jabar design system
  -->
  <form
    class="flex items-center gap-2 rounded-lg w-full bg-white"
    style="padding: 6px 8px"
    @submit.prevent="submitFormData"
  >
    <Icon name="magnifier" size="16px" class="text-gray-400" />
    <input
      :value="value"
      type="text"
      class="placeholder-gray-600 border-none flex-grow focus:outline-none"
      placeholder="Cari disini"
      @input="setInputValue"
    >
    <button v-show="hasValue" type="button" class="text-gray-500" @click="clearInputValue">
      <Icon name="times-circle" size="16px" />
    </button>
    <Button type="submit" class="bg-green-800 rounded-lg text-white text-sm font-bold">
      Cari
    </Button>
  </form>
</template>

<script>
export default {
  props: {
    value: {
      type: String,
      required: true
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
        this.clearInputValue()
      }
    },
    setInputValue (event) {
      this.$emit('input', event.target.value)
    },
    clearInputValue () {
      this.$emit('input', '')
    }
  }
}
</script>

<style scoped>
form:focus-within {
  box-shadow: inset 0px 0px 0px 1px #069550, inset 0px 0px 0px 2px #FFC800;
}
</style>
