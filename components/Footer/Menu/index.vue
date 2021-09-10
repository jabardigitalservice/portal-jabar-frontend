<template>
  <div class="grid grid-cols-3">
    <div class="col-span-2 flex flex-col gap-6">
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
    <div class="flex flex-col items-start">
      <div class="flex flex-col gap-6 pb-4 border-b border-white border-opacity-20">
        <p class="font-bold">
          Umpan Balik
        </p>
        <button type="button" class="text-sm leading-6">
          Isi survei performa situs web
        </button>
      </div>
      <div class="flex flex-col gap-6 pt-4">
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
</template>

<script>
import { layananPublikMenu } from '~/static/data/menus'

export default {
  data () {
    return {
      menus: layananPublikMenu,
      socialMediaSites: [
        {
          id: 1,
          name: 'Facebook',
          icon: 'facebook',
          link: 'https://www.facebook.com/jabarprov'
        },
        {
          id: 2,
          name: 'Instagram',
          icon: 'instagram',
          link: 'https://www.instagram.com/jabarprovgoid'
        },
        {
          id: 3,
          name: 'Twitter',
          icon: 'twitter',
          link: 'https://twitter.com/jabarprovgoid'
        },
        {
          id: 4,
          name: 'YouTube',
          icon: 'youtube',
          link: 'https://www.youtube.com/channel/UCiDN1p49p87vtkhMC5BhdXA'
        }
      ]
    }
  }
}
</script>
