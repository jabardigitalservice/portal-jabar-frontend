<template>
  <!-- TODO: Remove dummy data  -->
  <article
    class="w-full grid p-3 group rounded-xl cursor-pointer border border-transparent
    transition-all duration-150 ease-out hover:border-[#E9EDF4] hover:shadow-md"
    :class="view === 'list' ? 'grid-cols-search-item gap-6 items-center' : 'grid-cols-1'"
  >
    <Link :link="link">
      <img
        :src="image"
        :alt="title"
        width="120px"
        height="120px"
        class="self-start object-cover object-center rounded-lg "
        :class=" view === 'list' ? 'w-[120px] h-[120px]' : 'w-full h-[120px] mb-6'"
      >
    </Link>
    <div class="w-full flex flex-col">
      <span
        class="bg-gray-100 px-2 py-1 rounded-[4px] mb-2 w-max font-lato text-xs leading-5 text-[#8D8D8D]
      group-hover:bg-green-50 group-hover:text-green-700"
      >
        {{ domain.label }}
      </span>
      <Link :link="link">
        <h1
          class="font-lato font-medium text-lg leading-7 text-blue-gray-800 mb-[6px] group-hover:text-green-700"
          :class="view === 'list' ? ' line-clamp-1' : 'line-clamp-2'"
        >
          {{ title }}
        </h1>
      </Link>
      <template v-if="domain.type === 'news'">
        <p class="font-normal text-xs leading-5 text-gray-700">
          <span class="group-hover:text-blue-gray-800 capitalize">{{ category }}</span> | {{ date }}
        </p>
      </template>
      <template v-else>
        <p
          class="font-lato font-normal text-sm leading-6 text-[#717F8C] line-clamp-2
        group-hover:text-blue-gray-600"
        >
          {{ description }}
        </p>
      </template>
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
      return this.item?.excerpt || '-'
    },
    date () {
      return this.item?.created_at ? this.formatDate(this.item?.created_at) : '-'
    },
    link () {
      return `/${this.item?.slug}` || '#'
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
