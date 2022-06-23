<template>
  <div
    name="fp-counter-wrapper"
    class="inline-block px-3 py-2 rounded-lg bg-green-700 w-full md:w-[fit-content] min-h-[64px]"
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
      class="w-3/4 h-5 mt-1 rounded-sm animate-pulse bg-green-600 opacity-90"
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

      <span
        name="fp-counter-update"
        class="text-xs leading-4 italic"
      >
        (Update per {{ date }})
      </span>
    </p>
  </div>
</template>

<script>
import { format } from '~/utils/date'

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
    },
    lastUpdate: {
      type: String,
      required: true
    }
  },
  computed: {
    date () {
      const options = { month: 'long', year: 'numeric' }

      if (this.lastUpdate) {
        return format(new Date(this.lastUpdate), options)
      }
      return format(new Date(), options)
    }
  }
}
</script>
