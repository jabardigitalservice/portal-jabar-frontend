<template>
  <div class="col-span-3 grid grid-cols-5">
    <div class="col-span-3 flex flex-col gap-6 px-8">
      <p class="font-bold">
        Layanan Publik
      </p>
      <ul class="flex flex-col gap-4 text-sm leading-6">
        <li v-for="menu in menus" :key="menu.id">
          <Link :link="menu.link">
            {{ menu.title }}
          </Link>
        </li>
      </ul>
    </div>
    <div class="col-span-2 flex flex-col items-start px-8">
      <div class="flex gap-3 border-b border-white border-opacity-20">
        <Icon src="/icons/feedback.svg" alt="Lokasi" size="20px" class="py-1 self-start" />
        <div class="flex flex-col gap-6 pb-4">
          <p class="font-bold">
            Umpan Balik
          </p>
          <button type="button" class="text-sm text-left leading-6" @click="toggleFeedbackForm">
            Isi survei performa situs web
          </button>
          <Feedback :show="isFeedbackFormOpen" @close="toggleFeedbackForm" />
        </div>
      </div>
      <div class="flex gap-3 pt-4">
        <Icon src="/icons/social-media.svg" alt="Lokasi" size="20px" class="py-1 self-start" />
        <div class="flex flex-col gap-6">
          <p class="font-bold">
            Social Media
          </p>
          <div class="flex gap-3">
            <a
              v-for="socialMediaSite in socialMediaSites"
              :key="socialMediaSite.id"
              :href="socialMediaSite.link"
              target="_blank"
              :aria-label="socialMediaSite.name"
              rel="noreferrer"
              class="p-2 flex justify-center items-center rounded border border-white border-opacity-20"
            >
              <Icon :name="socialMediaSite.icon" size="18px" />
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { publicServiceMenu, socialMediaSites } from '~/static/data'

export default {
  data () {
    return {
      isFeedbackFormOpen: false,
      menus: publicServiceMenu,
      socialMediaSites
    }
  },
  methods: {
    toggleFeedbackForm () {
      this.isFeedbackFormOpen = !this.isFeedbackFormOpen
    }
  }
}
</script>
