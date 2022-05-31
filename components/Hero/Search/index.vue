<template>
  <div class="max-w-2xl w-full">
    <div class="relative mb-8">
      <InputSearch v-model.trim="inputValue" @submit="goToSearchPage" />
      <!-- NOTE: Temporarily Hide Feature -->
      <!-- <div v-show="hasSuggestions" class="absolute w-full mt-2 z-20">
        <Options
          class="w-full"
          :options="suggestions"
          header="Saran pencarian"
          @click="goToSearchPage"
        />
      </div> -->
    </div>

    <!-- Suggestion Card -->
    <section>
      <p class="font-lato font-bold text-base leading-6 text-center text-gray-300 mb-4">
        Pencarian populer di Jawa Barat
      </p>
      <ul class="suggestions max-w-2xl flex gap-4 overflow-x-auto">
        <li v-for="(item, index) in popularSearchSuggestions" :key="index">
          <Link :link="`/pencarian?q=${encodeURI(item)}`" class="min-w-[182px] h-[54px] bg-white rounded-xl px-[14px] flex items-center justify-between">
            <p class="font-bold text-gray-800 text-base leading-6">
              {{ item }}
            </p>
            <Icon name="open-new-tab" size="14px" class="text-green-800" />
          </Link>
        </li>
      </ul>
    </section>
  </div>
</template>

<script>
import debounce from 'lodash/debounce'
import { popularSearchSuggestions } from 'static/data'

export default {
  data () {
    return {
      inputValue: '',
      suggestions: [],
      popularSearchSuggestions
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
        // NOTE: Temporarily disable feature
        // this.getSuggestions()
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
        const response = await this.$axios.$get(
          `/v1/search/suggest?q=${this.inputValue}&per_page=5`
        )
        this.suggestions = response.map(item => ({
          label: item.value,
          value: item.value
        }))
      } else {
        this.suggestions = []
      }
    }, 500)
  }
}
</script>

<style scoped>
/* Hide scrollbar for Chrome, Safari and Opera */
.suggestions::-webkit-scrollbar {
  display: none;
}

/* Hide scrollbar for IE, Edge and Firefox */
.suggestions {
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
}
</style>
