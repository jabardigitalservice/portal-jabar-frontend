<template>
  <ul class="absolute h-screen top-0 right-6 flex flex-col justify-center gap-6">
    <li
      v-for="socialMediaSite in socialMediaSites"
      :key="socialMediaSite.id"
      class="bg-white bg-opacity-5 backdrop-filter backdrop-blur-sm rounded-lg group cursor-pointer border-l border-t border-transparent hover:bg-opacity-10 hover:border-white hover:border-opacity-10"
    >
      <Link
        :link="socialMediaSite.link"
        class="flex justify-center items-center p-3"
      >
        <Icon :name="socialMediaSite.icon" size="18px" class="text-white opacity-40 group-hover:opacity-100" />
      </Link>
    </li>
  </ul>
</template>

<script>
export default {
  data () {
    return {
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
