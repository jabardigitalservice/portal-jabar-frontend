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
      const isArray = Array.isArray(this.suggestions)

      if (isArray) {
        return !!this.suggestions.length
      }

      return false
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
        try {
          const response = await this.$axios.$get(`/v1/search?q=${this.inputValue}&per_page=5`)
          if (response) {
            this.suggestions = response.data.map(item => ({ label: item.title, value: item.title }))
          }
        } catch (error) {
          // silent error
        }
      } else {
        this.suggestions = []
      }
    }, 500),
    getData (data) {
      this.$emit('search', data)
      // clear the suggestions to close the dropdown
      this.suggestions = []
    },
    suggestionClicked ({ value }) {
      this.$emit('search', value)
      // clear the suggestions to close the dropdown
      this.suggestions = []
    }
  }
}
</script>
