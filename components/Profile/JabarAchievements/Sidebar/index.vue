<template>
  <aside class="jabar-achievements__sidebar max-w-[300px] h-[fit-content] border border-gray-200 rounded-xl py-3 px-4">
    <h2 class="font-roboto font-medium mb-4">
      Kategori
    </h2>
    <section class="flex flex-col gap-5">
      <JdsCheckbox
        v-model="checkAll"
        text="Pilih Semua"
        :indeterminate="isIndeterminate"
      />
      <div
        v-for="item in categories"
        :key="item.category"
        class="pl-7 flex min-w-0 justify-between items-center"
      >
        <JdsCheckbox
          :text="item.category"
          :title="item.category"
          size="sm"
          class="capitalize max-w-[75%]"
          :checked="isSelected(item.category)"
          @change="setSelected(item.category)"
        />
        <span class="leading-none text-xs text-gray-500">
          {{ item.count }}
        </span>
      </div>
    </section>
  </aside>
</template>

<script>
import debounce from 'lodash/debounce'

export default {
  data () {
    return {
      categories: [],
      isDropdownOpen: false,
      selected: []
    }
  },
  async fetch () {
    try {
      const response = await this.$axios.get('v1/awards/categories')
      this.categories = response.data
      this.selected = this.categories.map(item => item.category)
    } catch (error) {
      this.categories = []
      this.selected = []
    }
  },
  computed: {
    checkAll: {
      get () {
        return this.selected.length === this.categories.length
      },
      set (value) {
        const checked = []

        if (value) {
          this.categories.forEach((item) => {
            checked.push(item.category)
          })
        }

        this.selected = checked
      }
    },
    isAllSelected () {
      return this.selected.length === this.categories.length
    },
    isIndeterminate () {
      return this.selected.length > 0 && !this.isAllSelected
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
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  font-size: 14px;
  color: #616161;
  line-height: 16px;
}
</style>
