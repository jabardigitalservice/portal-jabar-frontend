<template>
  <JdsButton :variant="variant" :type="type">
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
