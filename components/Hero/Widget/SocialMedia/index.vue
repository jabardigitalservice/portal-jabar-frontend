<template>
  <ul class="absolute h-[700px] top-0 right-6 flex flex-col justify-center gap-6">
    <li
      v-for="socialMediaSite in socialMediaSites"
      :key="socialMediaSite.id"
      class="bg-white bg-opacity-5 backdrop-filter backdrop-blur-sm rounded-lg group cursor-pointer border-l border-t border-transparent hover:bg-opacity-10 hover:border-white hover:border-opacity-10"
    >
      <Link
        :link="socialMediaSite.link"
        :aria-label="socialMediaSite.name"
        class="flex justify-center items-center p-3"
      >
        <Icon :name="socialMediaSite.icon" size="18px" class="text-white opacity-40 group-hover:opacity-100" />
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
