<template>
  <div
    name="fp-counter-wrapper"
    class="inline-block px-3 py-2 rounded-lg bg-green-700"
    :style="{ minWidth: '295px' }"
  >
    <p
      name="fp-counter-title"
      class="font-lato text-white font-normal text-xs leading-5"
    >
      Total Program Unggulan Jawa Barat
    </p>
    <div
      v-if="loading"
      name="fp-counter-skeleton"
      class="w-3/4 h-5 rounded-lg animate-pulse bg-green-600 opacity-90"
    />
    <p
      v-else
      class="font-roboto text-white"
    >
      <strong
        name="fp-counter-counter"
        class="text-base leading-7"
      >
        {{ counter }} Program
      </strong>

      <!-- Todo: change this label dynamically -->
      <span
        name="fp-counter-update"
        class="text-xs leading-4 italic"
      >
        (Update per Juni 2021)
      </span>
    </p>
  </div>
</template>

<script>
export default {
  props: {
    counter: {
      type: [String, Number],
      required: true
    },
    loading: {
      type: Boolean,
      required: false,
      default: true
    }
  }
}
</script>

<style>

</style>
