<template>
  <main>
    <section class="relative">
      <NewsHeader />
    </section>
    <section class="news__categories py-4 border-b border-gray-200 overflow-hidden overflow-x-scroll">
      <NewsCategory
        :categories="categories"
        :current-category="currentCategory"
        @click="setCurrentCategory"
      />
    </section>
  </main>
</template>

<script>
import { newsCategories } from '~/static/data'

export default {
  data () {
    return {
      categories: newsCategories,
      currentCategory: 'ekonomi'
    }
  },
  methods: {
    setCurrentCategory (category) {
      this.currentCategory = category
    }
  }
}
</script>

<style scoped>
/* Hide scrollbar for Chrome, Safari and Opera */
.news__categories::-webkit-scrollbar {
  display: none;
}

/* Hide scrollbar for IE, Edge and Firefox */
.news__categories {
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
}
</style>
