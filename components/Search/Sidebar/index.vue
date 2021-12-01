<template>
  <div class="w-full border border-blue-gray-50 rounded-lg p-4">
    <p class="font-medium font-roboto mb-4">
      Kategori
    </p>
    <div class="mb-6 flex justify-between items-center">
      <JdsCheckbox
        v-model="checkAll"
        text="Semua Kategori"
        :indeterminate="isIndeterminate"
      />
      <p class="text-sm text-gray-500">
        {{ totalCount }}
      </p>
    </div>
    <div class="pl-7 flex flex-col gap-6">
      <template v-for="(category, index) in categories">
        <div :key="index" class="flex justify-between items-center">
          <JdsCheckbox
            size="sm"
            :checked="isSelected(category.value)"
            :text="category.label"
            @change="setSelectedCategory(category.value)"
          />
          <p class="text-sm text-gray-500">
            {{ getDomainCount(category.value) }}
          </p>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import { searchDomains } from '~/static/data'

export default {
  props: {
    domain: {
      type: Array,
      required: true
    },
    meta: {
      type: Object,
      required: true
    },
    totalCount: {
      type: Number,
      required: true
    }
  },
  computed: {
    categories () {
      return Object.keys(searchDomains).map(key => ({
        label: searchDomains[key],
        value: key
      }))
    },
    checkAll: {
      get () {
        return this.categories.length === this.domain.length
      },
      set (value) {
        const checked = []
        if (value) {
          this.categories.forEach((category) => {
            checked.push(category.value)
          })
        }

        this.$emit('checked', checked)
      }
    },
    isIndeterminate () {
      const hasItems = !!this.domain.length
      const isAllItemsChecked = this.domain.length === this.categories.length

      return hasItems && !isAllItemsChecked
    }
  },
  methods: {
    isSelected (value) {
      return this.domain.includes(value)
    },
    setSelectedCategory (value) {
      const exist = this.domain.includes(value)
      let checked

      if (exist) {
        checked = this.domain.filter(item => item !== value)
      } else {
        checked = [...this.domain, value]
      }

      this.$emit('checked', checked)
    },
    getDomainCount (category) {
      return this.meta.aggregations?.domain[category] || 0
    }
  }
}
</script>
