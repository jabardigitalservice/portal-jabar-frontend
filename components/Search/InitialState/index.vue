<template>
  <section class="w-full h-full min-h-screen flex flex-col items-center justify-center gap-8">
    <!-- Illustration -->
    <img
      src="/images/search/initial-state.svg"
      width="200px"
      height="130px"
      alt="ilustrasi pencarian tidak ditemukan"
    >
    <div>
      <h1 class="font-lora font-bold text-[21px] leading-8 text-blue-gray-800 text-center">
        Temukan Semua Hal Terkait Provinsi Jawa Barat
      </h1>
      <p class="font-lato font-medium text-base text-green-800 leading-7">
        Masukkan kata kunci yang ingin dicari pada kotak pencarian diatas
      </p>
    </div>
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
