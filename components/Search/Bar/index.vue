<template>
  <div class="w-full">
    <div class="relative">
      <InputSearch v-model.trim="inputValue" :clear="false" @submit="getData" />
      <div v-show="hasSuggestions" class="absolute w-full mt-2 z-20">
        <Options
          class="w-full"
          :options="suggestions"
          header="Saran pencarian"
          @click="suggestionClicked"
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
      inputValue: this.$route.query.q || '',
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
    },
    $route (to) {
      if (to?.name === 'pencarian') {
        this.inputValue = to.query.q
      }
    }
  },
  deactivated () {
    this.inputValue = ''
  },
  methods: {
    getSuggestions: debounce(async function () {
      if (this.hasValue) {
        const response = await this.$axios.$get(`/v1/search?q=${this.inputValue}&per_page=5`)
        this.suggestions = response.data.map(item => ({ label: item.title, value: item.title }))
      } else {
        this.suggestions = []
      }
    }, 500),
    getData (data) {
      // TODO: Add action to get data
    },
    suggestionClicked ({ value }) {
      // TODO: Add action to get data
    }
  }
}
</script>
