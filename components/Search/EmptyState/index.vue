<template>
  <section class="w-full min-h-screen h-full flex flex-col items-center justify-center gap-8">
    <h1 class="text-center font-lora text-[21px] leading-[34px] text-blue-gray-700 font-bold">
      Mohon maaf, pencarian dengan kata kunci <br>
      <span class="text-green-800">{{ keyword }}</span>
      tidak dapat ditemukan.
    </h1>
    <!-- Suggestions -->
    <div v-if="hasSuggestions" class="text-center font-roboto text-sm leading-6">
      <p class="font-roboto text-sm leading-6 text-gray-800">
        Mungkin maksud Anda:
      </p>
      <div class="flex">
        <a
          v-for="(suggestion, index) in suggestions"
          :key="index"
          href="#"
          class="text-[#1E88E5]"
        >
          <span v-if="index !== 0">, </span>
          {{ suggestion.name }}
        </a>
        <p class="text-gray-700 ml-1">
          {{ `(${suggestionCount} hasil)` }}
        </p>
      </div>
    </div>
    <!-- Illustration -->
    <img
      src="/images/search/empty-state.svg"
      width="275px"
      height="195px"
      alt="ilustrasi pencarian tidak ditemukan"
    >
    <!-- Recommendations -->
    <p class="font-lato font-bold text-sm leading-6 text-gray-800">
      Rekomendasi untuk Anda
    </p>
    <div class="w-full grid grid-cols-3 gap-4">
      <template v-if="hasRecommendations">
        <SearchItem
          v-for="item in recommendations"
          :key="item.id"
          view="grid"
        />
      </template>
      <template v-else>
        <SearchItemSkeleton
          v-for="index in 3"
          :key="index"
          view="grid"
        />
      </template>
    </div>
  </section>
</template>

<script>
export default {
  props: {
    keyword: {
      type: [String, Number],
      required: true
    },
    suggestions: {
      type: Array,
      required: false,
      default: () => []
    },
    suggestionCount: {
      type: [String, Number],
      required: false,
      default: 0
    },
    recommendations: {
      type: Array,
      required: false,
      default: () => []
    }
  },
  computed: {
    hasSuggestions () {
      if (Array.isArray(this.suggestions) && this.suggestions.length) {
        return true
      }
      return false
    },
    hasRecommendations () {
      if (Array.isArray(this.recommendations) && this.recommendations.length) {
        return true
      }
      return false
    }
  }
}
</script>
