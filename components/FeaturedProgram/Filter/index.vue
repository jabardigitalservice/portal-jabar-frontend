<template>
  <div class="featured-program__filter">
    <div class="flex absolute z-20">
      <p class="mr-4 mt-3 align-baseline font-lato text-gray-800">
        Tampilkan
      </p>
      <JdsPopover :value="isDropdownOpen">
        <template #activator>
          <JdsInputText
            readonly
            :value="inputValue"
            class="cursor-pointer"
            @focus="toggleDropdown"
          >
            <template #suffix-icon>
              <Icon
                name="chevron-down"
                size="16px"
                class="text-green-700 transition-all ease-in duration-150"
                :class="isDropdownOpen ? 'rotate-180' : null"
                @click="toggleDropdown"
              />
            </template>
          </JdsInputText>
        </template>
        <JdsPopoverDropdown class="w-full p-4">
          <div>
            <JdsCheckbox
              v-model="checkAll"
              text="Pilih Semua"
              :indeterminate="isIndeterminate"
            />
          </div>
          <div v-for="(category, index) in categories" :key="index">
            <JdsCheckbox
              :text="category"
              class="capitalize"
              :checked="isSelected(category)"
              @change="setSelected(category)"
            />
          </div>
        </JdsPopoverDropdown>
      </JdsPopover>
    </div>
    <!-- transparent overlay to close dropdown when click outside -->
    <div
      v-if="isDropdownOpen"
      class="absolute inset-0"
      @click="toggleDropdown"
    />
  </div>
</template>

<script>
import { featuredProgramCategory } from 'static/data/index'
import debounce from 'lodash/debounce'

export default {
  data () {
    return {
      isDropdownOpen: false,
      selected: [...featuredProgramCategory]
    }
  },
  computed: {
    categories () {
      return featuredProgramCategory
    },
    checkAll: {
      get () {
        return this.selected.length === this.categories.length
      },
      set (value) {
        const checked = []

        if (value) {
          this.categories.forEach((category) => {
            checked.push(category)
          })
        }

        this.selected = checked
      }
    },
    isAllSelected () {
      return this.selected.length === this.categories.length
    },
    isIndeterminate () {
      if (this.selected.length && this.selected.length < this.categories.length) {
        return true
      }

      return false
    },
    inputValue () {
      if (this.isAllSelected) {
        return 'Semua kategori'
      }

      return `${this.selected.length} kategori`
    }
  },
  watch: {
    /**
     * Debounce the event emit to prevent
     * API call abuse
     */
    selected: debounce(function () {
      if (this.isAllSelected) {
        this.$emit('change:filter', null)
      } else {
        this.$emit('change:filter', this.selected)
      }
    }, 1000)
  },
  methods: {
    toggleDropdown () {
      this.isDropdownOpen = !this.isDropdownOpen
    },
    isSelected (category) {
      return this.selected.includes(category)
    },
    setSelected (category) {
      let checked = []

      if (!this.selected.includes(category)) {
        checked = [...this.selected, category]
        this.selected = [...checked]
        return
      }

      checked = this.selected.filter(item => item !== category)
      this.selected = [...checked]
    }
  }
}
</script>

<style>
/**
 * Override default jds-popover styling
 */
.jds-popover__content {
  margin-top: 8px !important;
}
.jds-popover-dropdown__body {
  display: flex !important;
  flex-direction: column !important;
  gap: 8px !important;
}
/**
 * Override default jds-input-text styling
 */
.featured-program__filter .jds-input-text__input-wrapper {
  height: auto !important;
  border-color: #E3E7ED !important;
}

.featured-program__filter .jds-input-text__input-wrapper input {
  padding: 10px 8px !important;
}
</style>
