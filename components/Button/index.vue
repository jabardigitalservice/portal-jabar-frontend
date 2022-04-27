<template>
  <JdsButton :variant="variant" :type="type" class="flex justify-between">
    <svg v-show="loading" class="animate-spin -ml-1 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
      <circle
        class="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        stroke-width="4"
      />
      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
    </svg>
    <slot />
  </JdsButton>
</template>

<script>
export default {
  props: {
    variant: {
      type: String,
      required: false,
      default: 'primary'
    },
    type: {
      type: String,
      required: false,
      default: 'button'
    },
    loading: {
      type: Boolean,
      required: false,
      default: false
    }
  }
}
</script>

<style scoped>
/**
 *  TODO: This is a temporary solution, remove this if it has been implemented in jabar design system
 */
button {
  display: flex;
  align-items: center;
  gap: 12px;
  font-weight: 700;
  font-size: 14px;
  line-height: 18px;
}
</style>
