<template>
  <div class="max-w-xl lg:max-w-2xl w-full">
    <div class="relative mb-8">
      <InputSearch
        v-model.trim="inputValue"
        :placeholders="inputPlaceholders"
        @submit="goToSearchPage"
      />
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
      <div class="max-w-xl lg:max-w-2xl">
        <client-only>
          <swiper
            ref="swiper"
            :options="swiperOptions"
            :auto-update="true"
            :auto-destroy="true"
            :delete-instance-on-destroy="true"
            :cleanup-styles-on-destroy="false"
          >
            <swiper-slide v-for="(item, index) in popularSearchSuggestions" :key="index" class="!w-[fit-content]">
              <Link :link="`/pencarian?q=${encodeURI(item)}`" class="min-w-[182px] h-[54px] bg-white rounded-xl px-[14px] flex items-center justify-between">
                <p class="font-bold text-gray-800 text-base leading-6">
                  {{ item }}
                </p>
                <Icon name="open-new-tab" size="14px" class="text-green-800" />
              </Link>
            </swiper-slide>
          </swiper>

          <template #placeholder>
            <div class="w-full overflow-hidden flex gap-4">
              <div v-for="i in 4" :key="i" class="min-w-[182px] h-[54px] rounded-xl bg-gray-300 animate-pulse" />
            </div>
          </template>
        </client-only>
      </div>
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
      /* FIX ME: Input Placeholders should be dynamic */
      inputPlaceholders: ['Jawa Barat', 'Ridwan Kamil', 'Covid-19', 'G20', 'Minyak Goreng'],
      suggestions: [],
      popularSearchSuggestions,
      swiperOptions: Object.freeze({
        slidesPerView: 'auto',
        spaceBetween: 16,
        mousewheel: true,
        passiveListeners: true
      })
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
