<template>
  <div class="w-full">
    <div class="relative">
      <InputSearch
        id="searchBar"
        v-model.trim="inputValue"
        :clear="false"
        @submit="getData"
        @focus="setFocus(true)"
        @blur="setFocus(false)"
      />
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
      suggestions: [],
      isFocused: false
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
      if (this.hasValue && this.isFocused) {
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
      /**
       * Change the route query params on button click or form submit
       */
      this.$router.push({
        path: this.$route.path,
        query: { ...this.$route.query, q: data }
      })
    },
    suggestionClicked ({ value }) {
      /**
       * Change the route query params on suggestion click
       */
      this.$router.push({
        path: this.$route.path,
        query: { ...this.$route.query, q: value }
      })
    },
    setFocus (bool) {
      this.isFocused = bool
    }
  }
}
</script>
