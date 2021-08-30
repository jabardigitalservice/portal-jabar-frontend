<template>
  <div v-show="hasSuggestions" class="absolute bg-white flex flex-col mt-2 gap-2 border border-gray-500 rounded-lg px-2 py-3 w-full shadow-xl">
    <div v-for="(suggestion, index) in suggestions" :key="index" class="flex">
      <div
        class="line-clamp-1 text-left rounded-lg hover:bg-gray-100 px-2 py-1 w-full cursor-pointer leading-loose"
        @click="setSelectedSuggestion(suggestion.title)"
        v-html="highlightMatchingText(suggestion.title, query)"
      />
    </div>
  </div>
</template>

<script>
import debounce from 'lodash/debounce'

export default {
  props: {
    endpoint: {
      type: String,
      required: true
    },
    query: {
      type: String,
      required: false,
      default: ''
    },
    perPage: {
      type: Number,
      required: false,
      default: 5
    }
  },
  data () {
    return {
      suggestions: []
    }
  },
  computed: {
    hasValue () {
      return this.query !== ''
    },
    hasSuggestions () {
      return !!this.suggestions.length
    }
  },
  watch: {
    query () {
      if (this.hasValue) {
        this.getSuggestions()
      } else {
        this.suggestions = []
      }
    }
  },
  methods: {
    getSuggestions: debounce(async function () {
      if (this.hasValue) {
        const response = await this.$axios.$get(`${this.endpoint}?q=${this.query}&per_page=${this.perPage}`)
        this.suggestions = response.data
      } else {
        this.suggestions = []
      }
    }, 500),
    setSelectedSuggestion (data) {
      this.$emit('click', data)
      this.suggestions = []
    },
    highlightMatchingText (text, query) {
      return text.toLowerCase().replaceAll(query.toLowerCase(), `<b>${query.toLowerCase()}</b>`)
    }
  }
}
</script>
