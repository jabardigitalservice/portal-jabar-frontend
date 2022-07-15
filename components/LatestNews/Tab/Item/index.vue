<template>
  <LatestNewsTabItemSkeleton v-if="fetchState.pending" />
  <li v-else class="hover:bg-green-50 p-3 rounded-lg group transition-colors ease-brand duration-250">
    <Link :link="`/berita/${slug}`">
      <div class="flex flex-col gap-3 w-full">
        <p class="line-clamp-2 font-medium leading-7 group-hover:text-green-900">
          {{ title }}
        </p>
        <div class="flex justify-between items-center">
          <div class="flex gap-2 text-xs">
            <p class="text-gray-700 group-hover:text-blue-gray-800 capitalize">
              {{ category }}
            </p>
            <div class="text-gray-700 group-hover:text-blue-gray-800">
              |
            </div>
            <p class="text-gray-700 group-hover:text-blue-gray-800">
              {{ date }}
            </p>
          </div>
          <Icon name="open-new-tab" size="16px" class="invisible text-green-800 group-hover:visible" />
        </div>
      </div>
    </Link>
  </li>
</template>

<script>
import { daysDifference, format, relativeTime } from '~/utils/date'

export default {
  props: {
    title: {
      type: String,
      required: true
    },
    slug: {
      type: String,
      required: true
    },
    publishedAt: {
      type: String,
      required: true
    },
    category: {
      type: String,
      required: true
    },
    fetchState: {
      type: Object,
      required: true
    }
  },
  computed: {
    date () {
      const differenceInDays = daysDifference(this.publishedAt)

      if (differenceInDays > 0) {
        return format(this.publishedAt, { day: 'numeric', month: 'long', year: 'numeric' })
      }

      return relativeTime(this.publishedAt)
    }
  }
}
</script>
