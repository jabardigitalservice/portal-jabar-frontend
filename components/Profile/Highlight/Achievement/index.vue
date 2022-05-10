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
    <!-- Section Items Slider -->
    <ul
      class="achievements__container md:overflow-auto flex gap-4 transition-transform ease-out duration-300 md:transition-none md:!translate-x-0"
      :style="sliderStyles"
    >
      <li
        v-for="item in items"
        :key="item.id"
        class="min-h-[185px] min-w-full p-4 rounded-xl flex flex-col gap-2 border border-[#E9EDF4]
        md:min-w-[492px] md:max-w-[492px] md:flex-row md:gap-6"
      >
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
      </li>
    </ul>
    <!-- Slider Navigation (Mobile Only) -->
    <div class="flex justify-between mt-3 md:hidden">
      <button
        :disabled="isFirstSlide"
        class="w-8 h-8 bg-green-700 hover:bg-green-600 rounded-full flex items-center justify-center disabled:bg-gray-100"
        @click="prevSlide"
      >
        <Icon
          name="chevron-left"
          size="16px"
          :class="isFirstSlide ? 'text-gray-400' : 'text-white'"
        />
      </button>
      <p class="font-lato text-sm leading-6 text-blue-gray-600">
        {{ currentSlide + 1 }} dari {{ items.length }}
      </p>
      <button
        :disabled="isLastSlide"
        class="w-8 h-8 bg-green-700 hover:bg-green-600 rounded-full flex items-center justify-center disabled:bg-gray-100"
        @click="nextSlide"
      >
        <Icon
          name="chevron-right"
          size="16px"
          :class="isLastSlide ? 'text-gray-400' : 'text-white'"
        />
      </button>
    </div>
    <div class="flex justify-center mt-8">
      <Link link="/selayang-pandang/prestasi-jawa-barat" tabindex="-1">
        <Button class="max-w-max" type="button" variant="secondary">
          Lihat Semua Penghargaan Provinsi Jawa Barat
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
    sliderStyles () {
      const index = this.currentSlide
      const padding = index * 16 // 16px is the padding of the slider container

      return {
        transform: `translateX(-${index * 100}%) translateX(-${padding}px)`
      }
    },
    isFirstSlide () {
      return this.currentSlide === 0
    },
    isLastSlide () {
      return this.currentSlide === this.items.length - 1
    }
  },
  methods: {
    nextSlide () {
      if (this.currentSlide < this.items.length - 1) {
        this.currentSlide = this.currentSlide + 1
      }
    },
    prevSlide () {
      if (this.currentSlide > 0) {
        this.currentSlide = this.currentSlide - 1
      }
    }
  }
}
</script>

<style scoped>
/* Hide scrollbar for Chrome, Safari and Opera */
.achievements__container::-webkit-scrollbar {
  display: none;
}

/* Hide scrollbar for IE, Edge and Firefox */
.achievements__container {
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
}
</style>
