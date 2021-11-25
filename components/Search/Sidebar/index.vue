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
        20
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
            4
          </p>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      categories: [
        {
          label: 'Layanan Publik',
          value: 'public-service'
        },
        {
          label: 'Berita',
          value: 'news'
        },
        {
          label: 'Informasi',
          value: 'information'
        },
        {
          label: 'Pengumuman',
          value: 'announcement'
        },
        {
          label: 'Tentang Jawa Barat',
          value: 'about'
        }
      ],
      checked: []
    }
  },
  computed: {
    checkAll: {
      get () {
        return this.categories.length === this.checked.length
      },
      set (value) {
        const checked = []
        if (value) {
          this.categories.forEach((category) => {
            checked.push(category.value)
          })
        }
        this.checked = checked
      }
    },
    isIndeterminate () {
      const hasItems = !!this.checked.length
      const isAllItemsChecked = this.checked.length === this.categories.length

      return hasItems && !isAllItemsChecked
    }
  },
  methods: {
    isSelected (value) {
      return this.checked.includes(value)
    },
    setSelectedCategory (value) {
      const exist = this.checked.includes(value)
      if (exist) {
        this.checked = this.checked.filter(item => item !== value)
      } else {
        this.checked.push(value)
      }
    }
  }
}
</script>
