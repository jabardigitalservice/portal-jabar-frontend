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
button {
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 14px;
  font-weight: 700;
}
.jds-button--tertiary-paddingless {
  padding: 0;
}
.jds-button--tertiary-paddingless:hover {
  background-color: inherit;
}
.jds-button--tertiary-paddingless:focus {
  box-shadow: inherit;
}
</style>
