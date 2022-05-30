<template>
  <article
    class="search-item min-w-0 w-full p-3 group rounded-xl cursor-pointer border border-transparent
    transition-all duration-150 ease-out hover:border-[#E9EDF4] hover:shadow-md"
    :class="view === 'grid' ? 'flex flex-col' : 'flex gap-4'"
  >
    <a :href="link" target="_blank" rel="noopener" :aria-label="title" :title="title">
      <div
        class="self-start rounded-lg overflow-hidden flex items-center justify-center bg-gray-50"
        :class="{
          'w-[120px] h-[120px]' : view === 'list',
          'w-full h-[120px] mb-6': view === 'grid',
          'w-[72px] h-[72px]' : small
        }"
      >
        <img
          v-if="image"
          :src="image"
          :alt="title"
          width="72"
          height="72"
          :class="{
            'group-hover:scale-110 transition-all ease-in duration-150' : true,
            'w-full h-full object-cover object-center': domain.type !== 'featured_program'
          }"
        >
        <img
          v-else
          src="/icons/program-unggulan/logo-placeholder.svg"
          alt="gambar tidak ditemukan"
          width="60"
          height="60"
        >
      </div>
    </a>
    <div class="w-full flex flex-col">
      <span
        class="bg-gray-100 px-2 py-1 rounded-[4px] mb-2 w-max font-lato text-xs leading-5 text-[#8D8D8D]
      group-hover:bg-green-50 group-hover:text-green-700"
        :class="small ? 'hidden' : null"
      >
        {{ domain.label }}
      </span>
      <a :href="link" target="_blank" rel="noopener" :aria-label="title" :title="title">
        <h1
          class="font-lato font-medium text-lg leading-7 text-blue-gray-800 mb-[6px] group-hover:text-green-700"
          :class="view === 'list' ? ' line-clamp-1' : 'line-clamp-2'"
        >
          {{ title }}
        </h1>
      </a>
      <p
        class="search-item__description font-lato font-normal text-sm leading-6 text-[#717F8C] line-clamp-2 mb-2
        group-hover:text-blue-gray-600"
        v-html="description"
      />
      <p v-if="domain.type === 'news'" class="font-normal text-xs leading-5 text-gray-700">
        <span class="group-hover:text-blue-gray-800 capitalize">{{ category }}</span> | {{ date }}
      </p>
    </div>
  </article>
</template>

<script>
import { format, daysDifference, relativeTime } from '~/utils/date'
import { searchDomains } from '~/static/data'

export default {
  props: {
    item: {
      type: Object,
      required: true
    },
    view: {
      type: String,
      default: 'list',
      validator (value) {
        return ['list', 'grid'].includes(value)
      }
    },
    small: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    domain () {
      const DOMAINS = searchDomains
      return {
        type: this.item?.domain || null,
        label: DOMAINS[this.item?.domain] ?? null
      }
    },
    image () {
      return this.item?.thumbnail || null
    },
    title () {
      return this.item?.title || '-'
    },
    category () {
      return this.item?.category || '-'
    },
    description () {
      const highlight = this.item?.highlight?.content || []

      if (Array.isArray(highlight) && highlight.length > 0) {
        return highlight[0]
      }

      return this.item?.excerpt || '-'
    },
    date () {
      return this.item?.created_at ? this.formatDate(new Date(this.item.created_at)) : '-'
    },
    link () {
      const domain = this.item?.domain || null
      const slug = this.item?.slug || '#'
      const url = this.item?.url || '#'
      const id = this.item?.id || null

      switch (domain) {
        case 'news':
          return `/berita/${slug}`
        case 'public_service':
          return url
        case 'featured_program':
          return `/tentang-jawa-barat/program-unggulan?id=${id}`
        default:
          return url
      }
    }
  },
  methods: {
    formatDate (date) {
      const differenceInDays = daysDifference(date)

      if (differenceInDays > 0) {
        return format(date, { day: 'numeric', month: 'long', year: 'numeric' })
      }

      return relativeTime(date)
    }
  }
}
</script>

<style>
.search-item .search-item__description > strong {
  color: #424242;
}
</style>
