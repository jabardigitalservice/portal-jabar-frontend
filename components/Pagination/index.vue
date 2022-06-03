<template>
  <div class="pagination max-h-[44px] overflow-hidden">
    <jds-pagination
      v-bind="$props"
      @previous-page="$emit('previous-page', $event)"
      @next-page="$emit('next-page', $event)"
      @page-change="$emit('page-change', $event)"
      @per-page-change="$emit('per-page-change', $event)"
    />
  </div>
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

<style>
.pagination .jds-input-text__input-wrapper {
  height: 36px !important;
}
.pagination .jds-options__filter {
  width: 100% !important;
}
.pagination .jds-popover__content {
  z-index: 20 !important;
}
</style>
