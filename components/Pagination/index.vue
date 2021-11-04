<template>
  <jds-pagination
    v-bind="$props"
    @previous-page="$emit('previous-page', $event)"
    @next-page="$emit('next-page', $event)"
    @page-change="$emit('page-change', $event)"
    @per-page-change="$emit('per-page-change', $event)"
  />
</template>

<script>
export default {
  props: {
    currentPage: {
      type: [String, Number],
      required: true
    },
    itemsPerPage: {
      type: [String, Number],
      required: true
    },
    disabled: {
      type: Boolean,
      required: false,
      default: false
    },
    totalRows: {
      type: [String, Number],
      required: true
    },
    itemsPerPageOptions: {
      type: Array,
      required: false,
      default: () => [5, 10, 15, 20]
    }
  }
}
</script>
