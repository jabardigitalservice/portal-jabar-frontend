<template>
  <BaseModal
    :show="open"
    button-label="Tutup"
    @close="$emit('close')"
  >
    <template #header>
      <div class="grid grid-cols-2 w-full px-4 py-3 md:px-6 md:py-4 pb-0 gap-y-5">
        <section class="col-span-2">
          <figure
            class="inline-flex w-12 h-12 p-1 items-center justify-center mb-1 bg-white rounded-full"
          >
            <img
              :src="programDetail.logo || '/icons/program-unggulan/logo-placeholder.svg'"
              :alt="programDetail.title"
              class="max-w-full max-h-full object-center object-contain"
            >
          </figure>
          <h1 class="font-medium text-2xl text-green-700 leading-relaxed">
            {{ programDetail.title || '-' }}
          </h1>
        </section>
      </div>
    </template>

    <div class="flex flex-col p-4 md:p-6 gap-6 max-w-[550px] overflow-y-auto overflow-x-hidden">
      <section class="col-span-2 flex gap-4">
        <Icon src="/icons/info-circle-outline.svg" size="16px" class="self-start text-green-600" />
        <div>
          <h2 class="font-lato text-xs text-blue-gray-200 mb-1 leading-5">
            Deskripsi Program
          </h2>
          <div class="w-full max-h-[116px] overflow-y-auto overscroll-y-contain pr-4">
            <p class="text-gray-800 font-normal text-sm leading-relaxed mb-4">
              {{ programDetail.description || '-' }}
            </p>
          </div>
        </div>
      </section>

      <div class="w-full grid grid-cols-1 md:grid-cols-2 gap-6">
        <section class="flex gap-4">
          <Icon src="/icons/organization.svg" size="16px" class="self-start text-green-600" />
          <div>
            <h2 class="font-lato text-xs text-blue-gray-200 mb-1 leading-5">
              Organisasi
            </h2>
            <p class="text-gray-800 font-normal text-sm leading-relaxed">
              {{ programDetail.organization || "-" }}
            </p>
          </div>
        </section>
        <section class="flex gap-4">
          <Icon src="/icons/category.svg" size="16px" class="self-start text-green-600" />
          <div>
            <h2 class="font-lato text-xs text-blue-gray-200 mb-1 leading-5">
              Kategori
            </h2>
            <template v-if="hasCategory">
              <ul class="w-full flex flex-wrap gap-2 gap-y-1">
                <li
                  v-for="category in programDetail.categories"
                  :key="category"
                  class="break-words min-w-0 capitalize font-lato text-xs text-gray-700 bg-gray-100 px-2 py-1 rounded-sm leading-5"
                >
                  {{ category }}
                </li>
              </ul>
            </template>
          </div>
        </section>
      </div>

      <section v-if="hasWebsite" class="col-span-2 flex gap-4">
        <Icon src="/icons/link.svg" size="16px" class="self-start text-green-600" />
        <div>
          <h2 class="font-lato text-xs text-blue-gray-200 mb-1 leading-5">
            Link Website
          </h2>
          <a
            v-for="(website, index) in programDetail.websites"
            :key="index"
            :href="website"
            rel="noopener noreferrer"
            target="_blank"
            class="block text-blue-500 text-sm hover:text-blue-700 underline mb-1 leading-relaxed line-clamp-1 break-all"
          >
            {{ website }}
          </a>
        </div>
      </section>

      <section v-if="hasSocialSites" class="col-span-2 flex gap-4">
        <Icon src="/icons/share.svg" size="16px" class="self-start text-green-600" />
        <div>
          <h2 class="font-lato text-xs text-blue-gray-200 mb-1 leading-5">
            Sosial Media
          </h2>
          <div class="flex gap-2">
            <Link
              v-for="(site, index) in socialSites"
              :key="index"
              :link="site.link"
              class="flex flex-col p-2 items-center justify-center gap-1
                      cursor-pointer hover:bg-green-50"
            >
              <Icon
                :src="site.logo"
                height="18px"
              />
              <p class="text-gray-800 capitalize font-normal text-sm leading-relaxed">
                {{ site.label }}
              </p>
            </Link>
          </div>
        </div>
      </section>
    </div>
  </BaseModal>
</template>

<script>
export default {
  name: 'ProgramDetail',
  props: {
    open: {
      type: Boolean,
      default: false
    },
    programDetail: {
      type: Object,
      default: () => ({})
    }
  },
  computed: {

    /**
     * Check whether selected program has website
     * @returns {Boolean}
     */
    hasWebsite () {
      const { websites } = this.programDetail

      if (Array.isArray(websites) && websites.length) {
        return true
      }

      return false
    },

    /**
     * Check whether selected program has category
     * @returns {Boolean}
     */
    hasCategory () {
      const { categories } = this.programDetail

      if (Array.isArray(categories) && categories.length) {
        return true
      }

      return false
    },

    /**
     * Check whether selected program has social sites
     * @returns {Boolean}
     */
    hasSocialSites () {
      // eslint-disable-next-line camelcase
      const { social_media } = this.programDetail

      // eslint-disable-next-line camelcase
      if (social_media && Object.keys(social_media).length) {
        const socialMedia = Object.values(social_media)

        if (socialMedia.every(item => item === '')) {
          return false
        }

        return true
      }

      return false
    },

    /**
     * Array of available social media sites
     * based on selected program
     * @returns {Array}
     */
    socialSites () {
      if (this.hasSocialSites) {
        // eslint-disable-next-line camelcase
        const { social_media } = this.programDetail
        const socialMedia = []

        // eslint-disable-next-line camelcase
        for (const item in social_media) {
          if (Object.hasOwnProperty.call(social_media, item)) {
            socialMedia.push({
              logo: `/icons/social-media/${item}-logo.svg`,
              label: item,
              link: social_media[item]
            })
          }
        }

        return socialMedia.filter(item => item.link !== '')
      }

      return []
    }
  }
}
</script>
