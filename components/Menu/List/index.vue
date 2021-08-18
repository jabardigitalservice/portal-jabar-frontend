<template>
  <li tabindex="0" @click="setActiveMenu">
    <div class="flex items-center gap-3 cursor-pointer">
      <span>{{ title }}</span>
      <!--
        TODO: Replace icon with icon from jabar design system
      -->
      <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
      </svg>
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
