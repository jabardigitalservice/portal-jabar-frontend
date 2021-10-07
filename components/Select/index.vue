<template>
  <div class="flex items-center gap-5 z-10">
    <label>{{ label }}</label>
    <JdsSelect :options="options" :value="value" @change="onChange" />
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: [String, Number],
      required: false,
      default: null
    },
    label: {
      type: String,
      required: false,
      default: null
    },
    options: {
      type: Array,
      required: false,
      default: () => []
    }
  },
  methods: {
    onChange (value) {
      this.$emit('click', value)
    }
  }
}
</script>
