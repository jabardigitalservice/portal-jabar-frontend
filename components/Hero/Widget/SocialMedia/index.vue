<template>
  <ul
    class="flex mt-4 justify-center gap-6
    lg:mt-0 lg:absolute lg:h-[740px] lg:top-0 lg:right-6 lg:flex-col"
  >
    <li
      v-for="socialMediaSite in socialMediaSites"
      :key="socialMediaSite.id"
      class="bg-white bg-opacity-5 backdrop-filter backdrop-blur-sm rounded-lg group cursor-pointer border-l border-t border-transparent
      hover:bg-opacity-10 hover:border-white hover:border-opacity-10"
    >
      <Link
        :link="socialMediaSite.link"
        :aria-label="socialMediaSite.name"
        class="flex justify-center items-center p-3"
      >
        <Icon
          :name="socialMediaSite.icon"
          size="18px"
          class="text-white group-hover:opacity-100 lg:opacity-40"
        />
      </Link>
    </li>
  </ul>
</template>

<script>
import { socialMediaSites } from '~/static/data'

export default {
  data () {
    return {
      socialMediaSites
    }
  }
}
</script>
