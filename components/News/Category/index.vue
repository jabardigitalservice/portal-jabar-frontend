<template>
  <BaseContainer>
    <ul class="flex gap-14">
      <li
        v-for="(category, index) in categories"
        :key="index"
        class="px-6 py-2 rounded-full font-roboto uppercase cursor-pointer"
        :class="[isActive(category) ? 'bg-green-800 font-bold text-white': 'bg-transparent text-gray-600']"
        @click="setCurrentCategory(category)"
      >
        {{ category }}
      </li>
    </ul>
  </BaseContainer>
</template>

<script>
export default {
  props: {
    categories: {
      type: Array,
      required: true
    },
    currentCategory: {
      type: String,
      required: true
    }
  },
  methods: {
    setCurrentCategory (category) {
      this.$emit('click', category)
    },
    isActive (category) {
      return this.currentCategory === category
    }
  }
}
</script>
