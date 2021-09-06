<template>
  <li tabindex="0" @click="setActiveMenu">
    <div class="flex items-center gap-3 cursor-pointer">
      <span>{{ title }}</span>
      <Icon name="chevron-down" size="14px" />
    </div>
    <slot />
  </li>
</template>

<script>
export default {
  props: {
    id: {
      type: Number,
      required: true
    },
    title: {
      type: String,
      required: true
    }
  },
  methods: {
    setActiveMenu () {
      this.$emit('click', this.id)
    }
  }
}
</script>
