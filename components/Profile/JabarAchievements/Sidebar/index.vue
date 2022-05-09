<template>
  <aside class="jabar-achievements__sidebar max-w-[300px] min-w-0 border border-gray-200 rounded-xl py-3 px-4 ">
    <h2 class="font-roboto font-medium mb-4">
      Kategori
    </h2>
    <section class="flex flex-col gap-3 ">
      <div>
        <JdsCheckbox
          v-model="checkAll"
          text="Pilih Semua"
          :indeterminate="isIndeterminate"
        />
      </div>
      <div v-for="(category, index) in categories" :key="index" class="pl-7">
        <JdsCheckbox
          :text="category"
          size="sm"
          class="capitalize"
          :checked="isSelected(category)"
          @change="setSelected(category)"
        />
      </div>
    </section>
  </aside>
</template>

<script>
import { jabarAchievementsCategory } from 'static/data/index'
import debounce from 'lodash/debounce'

export default {
  data () {
    return {
      isDropdownOpen: false,
      selected: [...jabarAchievementsCategory]
    }
  },
  computed: {
    categories () {
      return jabarAchievementsCategory
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

      if (this.selected.length === 0) {
        return 'Tidak ada kategori yang dipilih'
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
.jabar-achievements__sidebar .jds-checkbox__option-label {
  font-size: 14px;
  color: #616161;
  line-height: 16px;
}
</style>
