<template>
  <section
    class="bg-white flex justify-center items-center bg-no-repeat bg-bottom bg-contain"
    :style="{ backgroundImage: `url('/images/hero.svg')`, height: '528px' }"
  >
    <div class="container mx-auto flex flex-col items-center gap-10">
      <h1 class="text-5xl leading-snug font-medium text-center max-w-4xl">
        Informasi, Layanan dan Pemerintahan Jawa Barat
      </h1>
      <p class="text-xl text-gray-800 leading-relaxed text-center max-w-2xl">
        Di sini kamu bisa akses informasi, layanan publik, dan sampaikan aspirasi mengenai program dari Pemerintah Daerah Provinsi Jawa Barat.
      </p>
      <div class="w-3/5">
        <Search>
          <!--
            TODO: Replace search input with search component from jabar design system
          -->
          <SearchInput v-model.trim="inputValue" @submit="goToSearchPage" />
          <SearchSuggestion endpoint="/v1/search" :query="inputValue" @click="goToSearchPage" />
        </Search>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data () {
    return {
      inputValue: ''
    }
  },
  deactivated () {
    this.inputValue = ''
  },
  methods: {
    goToSearchPage (query) {
      this.$router.push(`/pencarian?q=${query}`)
    }
  }
}
</script>
