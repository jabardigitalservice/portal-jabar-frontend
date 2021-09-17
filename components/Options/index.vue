<template>
  <jds-options
    :options="options"
    :header="header"
    @click:option="clickHandler"
  />
</template>

<script>
export default {
  props: {
    options: {
      type: Array,
      required: true
    },
    header: {
      type: String,
      required: false,
      default: null
    }
  },
  methods: {
    clickHandler (data) {
      this.$emit('click', data)
    }
  }
}
</script>
