<template>
  <div v-on-clickaway="closeDropdown" class="w-full overflow-hidden">
    <JdsPopover :value="isDropdownOpen" :options="popoverOptions">
      <template #activator>
        <JdsInputText
          readonly
          :value="inputValue"
          class="cursor-pointer"
          :title="inputValue"
          @focus="toggleDropdown"
        >
          <template #suffix-icon>
            <Icon
              name="chevron-down"
              size="16px"
              :class="{
                'text-green-700 transition-all ease-in duration-150' : true,
                'rotate-180': isDropdownOpen
              }"
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
</template>

<script>
import debounce from 'lodash/debounce'
import { directive as onClickaway } from 'vue-clickaway'

export default {
  directives: {
    onClickaway
  },
  props: {
    items: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      isDropdownOpen: false,
      selected: [...this.items],
      popoverOptions: {
        placement: 'bottom-start',
        modifiers: [
          {
            name: 'offset',
            options: { offset: [0, 8] }
          }
        ]
      }
    }
  },
  computed: {
    categories () {
      return this.items
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
    closeDropdown () {
      this.isDropdownOpen = false
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
