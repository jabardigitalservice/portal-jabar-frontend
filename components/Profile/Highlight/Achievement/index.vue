<template>
  <section class="w-full overflow-hidden">
    <!-- Section Title and Subtitle -->
    <div class="flex flex-col gap-6 mb-8 md:px-8 md:flex-row">
      <div class="flex-1 flex flex-col justify-center">
        <h2 class="font-lora font-bold text-2xl text-blue-gray-400 text-center md:text-left lg:text-[28px]">
          Provinsi Jawa Barat
        </h2>
        <h3 class="font-lora font-bold text-[32px] text-blue-gray-800 text-center md:text-left lg:text-[40px]">
          Juara Lahir Batin
        </h3>
      </div>
      <p class="flex-1 max-w-[60ch] font-lato font-normal text-sm text-blue-gray-500 leading-6 text-center md:text-left">
        Sepanjang tahun 2021, Jawa Barat telah meraih 44 penghargaan atas prestasi yang telah ditorehkan di berbagai bidang.
        Ini menjadi pemicu bagi Pemerintah Daerah Provinsi Jawa Barat untuk terus tumbuh dan berikan yang terbaik bagi warga.
      </p>
    </div>

    <client-only>
      <!-- Jabar Achievements Slider -->
      <swiper
        v-show="swiperReady"
        ref="jabarAchievementSwiper"
        :options="swiperOptions"
        :auto-update="true"
        :auto-destroy="true"
        :delete-instance-on-destroy="true"
        :cleanup-styles-on-destroy="true"
        @ready="swiperReady = true"
        @slide-change="setCurrentSlide"
      >
        <swiper-slide
          v-for="item in items"
          :key="item.id"
          class="min-h-[185px] md:!w-[492px]"
        >
          <div class="min-h-full min-w-full p-4 rounded-xl flex flex-col gap-2 border border-[#E9EDF4]">
            <img
              :src="item.icon"
              :alt="item.title"
              class="w-[60px] h-[60px] object-cover"
              width="60"
              height="60"
            >
            <div>
              <p class="font-lato font-bold text-sm text-blue-gray-800 leading-6 md:text-base">
                {{ item.title }}
              </p>
              <p class="font-lato text-xs font-normal text-blue-gray-500 leading-5 mb-3 md:font-medium md:text-sm">
                {{ item.appreciator }}
              </p>
              <p class="font-lato text-xs font-normal text-[#415C84] leading-5 line-clamp-3 mb-3">
                {{ item.description }}
              </p>
              <span class="rounded-md px-[10px] py-2 text-xs font-normal text-gray-700 bg-gray-100">
                {{ item.category }}
              </span>
            </div>
          </div>
        </swiper-slide>
        <template #pagination>
          <div class="flex w-full justify-between mt-4 md:hidden">
            <!-- Next Button -->
            <button
              id="custom-button-prev"
              :disabled="isFirstSlide"
              class="flex-shrink-0 w-[42px] h-[42px] bg-green-700 hover:bg-green-600 rounded-full flex items-center justify-center disabled:bg-gray-100"
            >
              <Icon
                name="chevron-left"
                :class="isFirstSlide ? 'text-gray-500' : 'text-white'"
                size="16px"
              />
            </button>
            <!-- Pagination -->
            <div id="custom-pagination" class="!w-[fit-content] flex items-center align-center" />
            <!-- Prev Button -->
            <button
              id="custom-button-next"
              :disabled="isLastSlide"
              class="flex-shrink-0 w-[42px] h-[42px] bg-green-700 hover:bg-green-600 rounded-full flex items-center justify-center disabled:bg-gray-100"
            >
              <Icon
                name="chevron-right"
                :class="isLastSlide ? 'text-gray-500' : 'text-white'"
                size="16px"
              />
            </button>
          </div>
        </template>
      </swiper>
      <template #placeholder>
        <!-- Swiper Skeleton -->
        <div class="w-full min-h-[234px] overflow-x-hidden flex gap-4">
          <div
            v-for="index in 5"
            :key="`skeleton-${index}`"
            class="min-w-full h-full p-4 rounded-xl border border-[#E9EDF4] flex flex-col md:min-w-[492px]"
          >
            <div class="w-[60px] h-[60px] rounded-full bg-gray-200 mb-2" />
            <div class="w-5/6 h-5 bg-gray-200 rounded-md mb-6" />
            <div class="w-full h-4 bg-gray-200 rounded-md mb-2" />
            <div class="w-5/6 h-4 bg-gray-200 rounded-md mb-5" />
            <div class="w-28 h-5 bg-gray-200 rounded-md" />
          </div>
        </div>
        <div class="w-full h-8 flex justify-between mt-3 md:hidden">
          <div class="w-8 h-8 bg-gray-300 animate-pulse rounded-full" />
          <div class="w-8 h-8 bg-gray-300 animate-pulse rounded-full" />
        </div>
      </template>
    </client-only>

    <div class="flex justify-center mt-8">
      <Link link="/selayang-pandang/prestasi-jawa-barat" tabindex="-1">
        <Button class="max-w-max text-left md:text-center" type="button" variant="secondary">
          Kenali Lebih Lanjut Tentang Pemerintahan Jawa Barat
          <Icon name="open-new-tab" size="14px" />
        </Button>
      </Link>
    </div>
  </section>
</template>

<script>
export default {
  name: 'Achievement',
  data () {
    return {
      currentSlide: 0,
      swiperReady: false,
      swiperOptions: Object.freeze({
        slidesPerView: 1,
        spaceBetween: 16,
        mousewheel: true,
        passiveListeners: true,
        pagination: {
          el: '#custom-pagination',
          type: 'custom',
          renderCustom (swiper, current, total) {
            return `<p>${current} dari ${total}</p>`
          }
        },
        navigation: {
          nextEl: '#custom-button-next',
          prevEl: '#custom-button-prev'
        },
        breakpoints: {
          720: {
            slidesPerView: 'auto'
          }
        }
      }),
      items: [
        {
          id: 1,
          title: 'Anggota JDIHN terbaik tahun 2021',
          appreciator: 'Menteri Hukum dan HAM RI',
          category: 'Hukum dan HAM',
          description: 'Jaringan Dokumentasi dan Informasi Hukum (JDIH) Jabar menjadi penyedia layanan publik di bidang dokumentasi dan informasi hukum terbaik di tingkat provinsi.',
          icon: require('~/static/icons/selayang-pandang/icon-achievement-placeholder.svg')
        },
        {
          id: 2,
          title: 'Best Governor',
          appreciator: 'People of the Year 2021',
          category: 'Prestasi Gubernur',
          description: 'Gubernur Ridwan Kamil dinobatkan sebagai Best Governor untuk dua kategori, Healthcare & Action Against Pandemi dan E-Goverment & Digital Innovation.',
          icon: require('~/static/icons/selayang-pandang/icon-achievement-placeholder.svg')
        },
        {
          id: 3,
          title: 'Pembangunan Daerah Terbaik II',
          appreciator: 'Bappenas RI 2021',
          category: 'Pembangunan',
          description: 'Perencanaan pembangunan yang matang serta pencapaian yang telah diraih menuntun Jabar mendapatkan Penghargaan Pembangunan Daerah.',
          icon: require('~/static/icons/selayang-pandang/icon-achievement-placeholder.svg')
        },
        {
          id: 4,
          title: 'Pemerintah Daerah Terpopuler',
          appreciator: 'Anugerah Media Humas (AMH) 2021',
          category: 'Kehumasan',
          description: 'Humas Diskominfo Jabar berhasil menjalankan fungsi kehumasan, terutama dalam menyebarkan informasi akurat kepada masyarakat luas.',
          icon: require('~/static/icons/selayang-pandang/icon-achievement-placeholder.svg')
        },
        {
          id: 5,
          title: 'Penghargaan Sumber Daya Energi & Mineral',
          appreciator: 'Gatra Apresiasi Energi (GAE) 2021',
          category: 'Sumber Daya Energi & Mineral',
          description: 'Jabar menerima apresiasi atas peran pemerintah daerah dalam memberikan dukungan kontinuitas bagi kemajuan usaha energi di lingkup regional.',
          icon: require('~/static/icons/selayang-pandang/icon-achievement-placeholder.svg')
        }
      ]
    }
  },
  computed: {
    swiper () {
      return this.$refs.jabarAchievementSwiper.$swiper
    },
    isFirstSlide () {
      return this.currentSlide === 0
    },
    isLastSlide () {
      return this.currentSlide === this.items.length - 1
    }
  },
  methods: {
    setCurrentSlide () {
      this.currentSlide = this.swiper.activeIndex
    }
  }
}
</script>
