<template>
  <div class="w-full">
    <div class="relative">
      <InputSearch
        id="searchBar"
        v-model.trim="inputValue"
        :clear="false"
        placeholder="Masukkan kata kunci pencarian"
        @submit="getData"
        @focus="setFocus(true)"
        @blur="setFocus(false)"
      />
      <template v-if="withSuggestion">
        <div v-show="hasSuggestions" class="absolute w-full mt-2 z-20">
          <Options
            class="w-full"
            :options="suggestions"
            header="Saran pencarian"
            @click="suggestionClicked"
          />
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import debounce from 'lodash/debounce'

export default {
  props: {
    withSuggestion: {
      type: Boolean,
      default: false
    }
  },
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
      if (this.withSuggestion && this.hasValue && this.isFocused) {
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
          const response = await this.$axios.$get(`/v1/search/suggest?q=${this.inputValue}&per_page=5`)
          this.suggestions = response.map(item => ({ label: item.value, value: item.value }))
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

      this.suggestions = []
    },
    suggestionClicked ({ value }) {
      /**
       * Change the route query params on suggestion click
       */
      this.$router.push({
        path: this.$route.path,
        query: { ...this.$route.query, q: value }
      })

      this.suggestions = []
    },
    setFocus (bool) {
      this.isFocused = bool
    }
  }
}
</script>
