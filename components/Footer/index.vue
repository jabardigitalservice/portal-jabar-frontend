<template>
  <footer
    class="bg-green-800 text-white bg-no-repeat"
    :style="{ backgroundImage: `url('/images/menu.png')`, backgroundPosition: '98% 75%' }"
  >
    <div class="container">
      <div class="flex flex-col gap-10 pt-16 pb-24">
        <div class="flex items-center gap-4">
          <img src="/logo.png" alt="Logo Jawa Barat" width="65" height="76">
          <div class="flex flex-col text-lg">
            <p>Pemerintah Daerah Provinsi</p>
            <p class="font-medium">
              Jawa Barat
            </p>
          </div>
        </div>
        <div class="grid grid-cols-4">
          <div class="flex flex-col gap-10 col-span-2">
            <div class="flex flex-col gap-5 text-sm">
              <div class="flex gap-3">
                <div class="py-0.5">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M8.00016 1.33301C5.42016 1.33301 3.3335 3.41967 3.3335 5.99967C3.3335 8.77967 6.28016 12.613 7.4935 14.073C7.76016 14.393 8.24683 14.393 8.5135 14.073C9.72016 12.613 12.6668 8.77967 12.6668 5.99967C12.6668 3.41967 10.5802 1.33301 8.00016 1.33301ZM8.00016 7.66634C7.08016 7.66634 6.3335 6.91967 6.3335 5.99967C6.3335 5.07967 7.08016 4.33301 8.00016 4.33301C8.92016 4.33301 9.66683 5.07967 9.66683 5.99967C9.66683 6.91967 8.92016 7.66634 8.00016 7.66634Z" fill="white" fill-opacity="0.8" />
                  </svg>
                </div>
                <div class="flex flex-col gap-1">
                  <p>Gedung Sate Bandung</p>
                  <div class="flex flex-col opacity-80">
                    <p>Jl. Diponegoro No.22, Citarum, Bandung Wetan,</p>
                    <p>Kota Bandung, Jawa Barat 40115</p>
                  </div>
                </div>
              </div>
              <div class="flex gap-3">
                <div class="py-0.5">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M4.41333 7.19333C5.37333 9.08 6.92 10.62 8.80667 11.5867L10.2733 10.12C10.4533 9.94 10.72 9.88 10.9533 9.96C11.7 10.2067 12.5067 10.34 13.3333 10.34C13.7 10.34 14 10.64 14 11.0067V13.3333C14 13.7 13.7 14 13.3333 14C7.07333 14 2 8.92667 2 2.66667C2 2.3 2.3 2 2.66667 2H5C5.36667 2 5.66667 2.3 5.66667 2.66667C5.66667 3.5 5.8 4.3 6.04667 5.04667C6.12 5.28 6.06667 5.54 5.88 5.72667L4.41333 7.19333Z" fill="white" />
                  </svg>
                </div>
                <p>+62 22 423248</p>
              </div>
              <div class="flex gap-3">
                <div class="py-0.5">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M13.3332 2H2.6665C1.56521 2 0.67317 2.89823 0.67317 4L0.666504 11.9994C0.666504 13.1015 1.56498 14 2.6665 14H13.3332C14.4347 14 15.3332 13.1015 15.3332 12V4C15.3332 2.89848 14.4347 2 13.3332 2ZM3.65588 6.0001C3.34051 5.81008 3.23889 5.40038 3.42891 5.08502C3.61893 4.76965 4.02863 4.66803 4.34399 4.85805L7.9803 7.04902L11.7744 4.76296C12.0903 4.57264 12.5006 4.67442 12.691 4.99029C12.8809 5.30545 12.78 5.71483 12.4655 5.90574L8.00647 8.61201L8.0023 8.61893L3.65588 6.0001Z" fill="white" />
                  </svg>
                </div>
                <a href="mailto:info@jabarprov.go.id">info@jabarprov.go.id</a>
              </div>
            </div>
            <div class="flex gap-2">
              <a v-for="socialMediaSite in socialMediaSites" :key="socialMediaSite.id" :href="socialMediaSite.link" target="_blank" rel="noreferrer">
                <img :src="socialMediaSite.icon" :alt="socialMediaSite.name" width="34" height="34">
              </a>
            </div>
          </div>
          <div class="flex flex-col gap-6">
            <p class="font-medium">
              Layanan Pemerintah
            </p>
            <ul class="flex flex-col gap-4 text-sm">
              <li v-for="menu in menus" :key="menu.id">
                <MenuLink :link="menu.link">
                  {{ menu.title }}
                </MenuLink>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <div class="border-t border-white border-opacity-20">
      <div class="container">
        <div class="flex justify-between py-6 text-xs">
          <p>Copyright © {{ year }} Pemerintah Daerah Provinsi Jawa Barat. All Right Reserved</p>
          <div class="flex gap-6">
            <div class="flex items-center gap-1 cursor-pointer">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M5.995 1C3.235 1 1 3.24 1 6C1 8.76 3.235 11 5.995 11C8.76 11 11 8.76 11 6C11 3.24 8.76 1 5.995 1ZM9.46 4.00003H7.985C7.825 3.37503 7.595 2.77503 7.295 2.22003C8.215 2.53503 8.98 3.17503 9.46 4.00003ZM6 2.01998C6.415 2.61998 6.74 3.28498 6.955 3.99998H5.045C5.26 3.28498 5.585 2.61998 6 2.01998ZM2.13 7C2.05 6.68 2 6.345 2 6C2 5.655 2.05 5.32 2.13 5H3.82C3.78 5.33 3.75 5.66 3.75 6C3.75 6.34 3.78 6.67 3.82 7H2.13ZM2.54 8H4.015C4.175 8.625 4.405 9.225 4.705 9.78C3.785 9.465 3.02 8.83 2.54 8ZM4.015 4.00003H2.54C3.02 3.17003 3.785 2.53503 4.705 2.22003C4.405 2.77503 4.175 3.37503 4.015 4.00003ZM6 9.98C5.585 9.38 5.26 8.715 5.045 8H6.955C6.74 8.715 6.415 9.38 6 9.98ZM7.17 7H4.83C4.785 6.67 4.75 6.34 4.75 6C4.75 5.66 4.785 5.325 4.83 5H7.17C7.215 5.325 7.25 5.66 7.25 6C7.25 6.34 7.215 6.67 7.17 7ZM7.295 9.78C7.595 9.225 7.825 8.625 7.985 8H9.46C8.98 8.825 8.215 9.465 7.295 9.78ZM8.18 7C8.22 6.67 8.25 6.34 8.25 6C8.25 5.66 8.22 5.33 8.18 5H9.87C9.95 5.32 10 5.655 10 6C10 6.345 9.95 6.68 9.87 7H8.18Z" fill="white" fill-opacity="0.8" />
              </svg>
              <p>Bahasa</p>
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M8.35012 5.81235C8.61203 5.48497 8.37894 5 7.95969 5H4.04031C3.62106 5 3.38797 5.48497 3.64988 5.81235L5.60957 8.26196C5.80973 8.51216 6.19027 8.51216 6.39043 8.26196L8.35012 5.81235Z" fill="white" />
              </svg>
            </div>
            <MenuLink link="/">
              Beranda
            </MenuLink>
            <MenuLink link="#">
              Sitemap
            </MenuLink>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
import { layananPemerintahMenu } from '~/static/data/menus'

export default {
  data () {
    return {
      menus: layananPemerintahMenu,
      socialMediaSites: [
        {
          id: 1,
          name: 'Facebook',
          icon: '/icons/facebook-footer.svg',
          link: 'https://www.facebook.com/jabarprov'
        },
        {
          id: 2,
          name: 'Instagram',
          icon: '/icons/instagram-footer.svg',
          link: 'https://www.instagram.com/jabarprovgoid'
        },
        {
          id: 3,
          name: 'Twitter',
          icon: '/icons/twitter-footer.svg',
          link: 'https://twitter.com/jabarprovgoid'
        },
        {
          id: 4,
          name: 'YouTube',
          icon: '/icons/youtube-footer.svg',
          link: 'https://www.youtube.com/channel/UCiDN1p49p87vtkhMC5BhdXA'
        }
      ]
    }
  },
  computed: {
    year () {
      return new Date().getFullYear()
    }
  }
}
</script>
