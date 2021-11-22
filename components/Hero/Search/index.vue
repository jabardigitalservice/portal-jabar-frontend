<template>
  <div class="max-w-2xl w-full">
    <div class="relative">
      <InputSearch v-model.trim="inputValue" @submit="goToSearchPage" />
      <div v-show="hasSuggestions" class="absolute w-full mt-2 z-20">
        <Options
          class="w-full"
          :options="suggestions"
          header="Saran pencarian"
          @click="goToSearchPage"
        />
      </div>
    </div>
  </div>
</template>

<script>
import debounce from 'lodash/debounce'

export default {
  data () {
    return {
      inputValue: '',
      suggestions: []
    }
  },
  computed: {
    hasValue () {
      return this.inputValue !== ''
    },
    hasSuggestions () {
      return !!this.suggestions.length
    }
  },
  watch: {
    inputValue () {
      if (this.hasValue) {
        this.getSuggestions()
      } else {
        this.suggestions = []
      }
    }
  },
  deactivated () {
    this.inputValue = ''
  },
  methods: {
    goToSearchPage (data) {
      if (data.value) {
        this.$router.push(`/pencarian?q=${data.value}`)
      } else {
        this.$router.push(`/pencarian?q=${data}`)
      }
    },
    getSuggestions: debounce(async function () {
      if (this.hasValue) {
        const response = await this.$axios.$get(`/v1/search?q=${this.inputValue}&per_page=5`)
        this.suggestions = response.data.map(item => ({ label: item.title, value: item.title }))
      } else {
        this.suggestions = []
      }
    }, 500)
  }
}
</script>
