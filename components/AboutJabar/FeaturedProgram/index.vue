<template>
  <section class="w-full bg-gray-200">
    <div class="relative container mx-auto -top-24 z-20">
      <div class="py-8 px-10 rounded-xl bg-white">
        <div class="p-4">
          <!-- Search and Filter -->
          <section class="flex w-full justify-between mb-8">
            <!--
              NOTE:
              Category Selection will be implemented in the next PR

            <div class="inline-flex gap-4 items-center">
              <p class="font-lato text-md text-gray-800 font-normal">
                Tampilkan
              </p>
              <jds-select />
            </div>
            -->

            <!--
              TODO: replace this component with JdsSearch small variant
              -->
            <Search
              v-model="searchValue"
              placeholder="Cari Program"
              small
            />
          </section>

          <!-- Featured Program Card -->
          <section class="grid grid-cols-3 gap-8">
            <Card
              v-for="item in programList"
              :key="item.id"
              :title="item.title"
              :description="item.excerpt || '-'"
              icon="/icons/program-unggulan/sapawarga.svg"
              @click="showDetail(item)"
            />
          </section>

          <Modal :show="openModal">
            <div class="grid grid-cols-2 w-full px-6 gap-y-5">
              <section class="col-span-2">
                <figure class="inline-flex w-10 h-10 p-1 items-center justify-center mb-1">
                  <img
                    src="/icons/program-unggulan/sapawarga.svg"
                    :alt="programDetail.title"
                    class="w-full h-full object-center"
                  >
                </figure>
                <h1 class="font-medium text-2xl text-green-700 leading-relaxed">
                  {{ programDetail.title || '-' }}
                </h1>
              </section>

              <section class="col-span-2 flex gap-4">
                <Icon src="/icons/info-circle-outline.svg" size="16px" class="self-start text-green-600" />
                <div>
                  <h2 class="font-lato text-xs text-blue-gray-200 mb-1">
                    Deskripsi Program
                  </h2>
                  <p class="text-gray-800 font-normal text-sm">
                    {{ programDetail.description || '-' }}
                  </p>
                </div>
              </section>

              <section class="col-span-1 flex gap-4">
                <Icon src="/icons/organization.svg" size="16px" class="self-start text-green-600" />
                <div>
                  <h2 class="font-lato text-xs text-blue-gray-200 mb-1">
                    Organisasi
                  </h2>
                  <p class="text-gray-800 font-normal text-sm">
                    {{ programDetail.organization || "-" }}
                  </p>
                </div>
              </section>

              <section class="col-span-1 flex gap-4">
                <Icon src="/icons/category.svg" size="16px" class="self-start text-green-600" />
                <div>
                  <h2 class="font-lato text-xs text-blue-gray-200 mb-1">
                    Kategori
                  </h2>
                  <template v-if="hasCategory">
                    <p
                      v-for="(category, index) in programDetail.categories"
                      :key="index"
                      class="text-gray-800 font-normal capitalize text-sm"
                    >
                      {{ category }}
                    </p>
                  </template>
                  <template v-else>
                    <p class="text-gray-800 font-normal text-sm">
                      -
                    </p>
                  </template>
                </div>
              </section>

              <section class="col-span-2 flex gap-4">
                <Icon src="/icons/link.svg" size="16px" class="self-start text-green-600" />
                <div>
                  <h2 class="font-lato text-xs text-blue-gray-200 mb-1">
                    Link Website
                  </h2>
                  <template v-if="hasWebsite">
                    <a
                      v-for="(website, index) in programDetail.websites"
                      :key="index"
                      :href="website"
                      rel="noopener noreferrer"
                      target="_blank"
                      class="block text-blue-500 text-sm hover:text-blue-700 underline mb-1"
                    >
                      {{ website }}
                    </a>
                  </template>
                  <template v-else>
                    <p class="text-gray-800 font-normal text-sm">
                      Link tidak tersedia
                    </p>
                  </template>
                </div>
              </section>

              <section v-if="hasSocialSites" class="col-span-2 flex gap-4">
                <Icon src="/icons/share.svg" size="16px" class="self-start text-green-600" />
                <div>
                  <h2 class="font-lato text-xs text-blue-gray-200 mb-1">
                    Social Media
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
                      <p class="text-gray-800 capitalize font-normal text-sm ">
                        {{ site.label }}
                      </p>
                    </Link>
                  </div>
                </div>
              </section>

              <section
                class="col-span-2 flex justify-center mb-4"
                @click="closeDetail"
              >
                <Button>Tutup</Button>
              </section>
            </div>
          </Modal>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import Card from '~/components/Base/Card'

export default {
  name: 'FeaturedProgramList',
  components: {
    Card
  },
  data () {
    return {
      programList: [],
      searchValue: '',
      programDetail: {},
      openModal: false
    }
  },
  async fetch () {
    try {
      const response = await this.$axios('v1/featured-programs')
      this.programList = response.data.data
    } catch (error) {
      this.programList = []
      // silent error
    }
  },
  computed: {

    /**
     * Check whether selected program has website
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
  },
  methods: {
    /**
     * Open a Modal containing featured program details
     * @params {Object} item
     */
    showDetail (item) {
      this.programDetail = { ...item }
      this.openModal = true
    },

    /**
     * Close current Modal
     * @params {Object} item
     */
    closeDetail () {
      this.openModal = false
      this.programDetail = {}
    }
  }
}
</script>
