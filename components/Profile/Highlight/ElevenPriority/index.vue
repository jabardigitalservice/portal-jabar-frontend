<template>
  <section class="w-full rounded-2xl bg-[#F9FAFB] p-4 md:p-8 overflow-hidden">
    <!-- Section Header (Mobile Only) -->
    <div class="mb-3 md:hidden">
      <h2 class="font-lora font-bold text-2xl text-center text-blue-gray-700 leading-10">
        11 Prioritas
      </h2>
      <p class="font-lora font-bold text-blue-gray-400 leading-6 text-center">
        Pembangunan Jawa Barat pada Tahun 2022
      </p>
    </div>
    <!-- Section Items -->
    <ul
      class="flex gap-4 transition-transform ease-out duration-300
      md:transition-none md:!translate-x-0 md:gap-3 md:grid md:grid-cols-3 md:grid-rows-4
      lg:grid-cols-4 lg:grid-rows-3"
      :style="sliderStyles"
    >
      <li
        v-for="item in items"
        :key="item.id"
        class="min-w-full md:w-full bg-white min-h-[158px] p-[14px] border border-[#DFE6F0] rounded-xl"
      >
        <div class="flex justify-center mb-2">
          <img
            :src="item.icon"
            :alt="item.title"
            width="32"
            height="32"
          >
        </div>
        <div class="h-[90px] flex items-center justify-center">
          <p class="font-lato text-sm leading-6 text-blue-gray-400 text-center">
            {{ item.title }}
          </p>
        </div>
      </li>
      <li class="w-full min-h-[158px] flex items-center justify-end md:row-start-1 md:col-start-3 lg:col-start-4">
        <div class="text-right">
          <h2 class="font-lora font-bold text-[36px] text-blue-gray-700 leading-10">
            11 Prioritas
          </h2>
          <p class="font-lora font-bold text-blue-gray-400 leading-6 spacing">
            Pembangunan Jawa Barat <wbr> pada Tahun 2022
          </p>
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
  </section>
</template>

<script>
export default {
  name: 'ElevenPriority',
  data () {
    return {
      currentSlide: 0,
      items: [
        {
          id: 1,
          title: 'Reformasi Sistem Kesehatan',
          icon: require('~/static/icons/selayang-pandang/icon-prioritas-pembangunan-kesehatan.svg')
        },
        {
          id: 2,
          title: 'Pemulihan dan Pertumbuhan Ekonomi Kerakyatan Berbasis Inovasi',
          icon: require('~/static/icons/selayang-pandang/icon-prioritas-pembangunan-inovasi.svg')
        },
        {
          id: 3,
          title: 'Penguatan Sistem Ketahanan Pangan Berkelanjutan',
          icon: require('~/static/icons/selayang-pandang/icon-prioritas-pembangunan-pangan.svg')
        },
        {
          id: 4,
          title: 'Reformasi Sistem Perlindungan Sosial',
          icon: require('~/static/icons/selayang-pandang/icon-prioritas-pembangunan-sosial.svg')
        },
        {
          id: 5,
          title: 'Reformasi Sistem Pendidikan dan Pemajuan Kebudayaan',
          icon: require('~/static/icons/selayang-pandang/icon-prioritas-pembangunan-pendidikan.svg')
        },
        {
          id: 6,
          title: 'Reformasi Sistem Kesiapsiagaan Penanggulangan Resiko Bencana',
          icon: require('~/static/icons/selayang-pandang/icon-prioritas-pembangunan-bencana.svg')
        },
        {
          id: 7,
          title: 'Inovasi Pelayanan Publik dan Penataan Daerah',
          icon: require('~/static/icons/selayang-pandang/icon-prioritas-pembangunan-penataan-daerah.svg')
        },
        {
          id: 8,
          title: 'Gerakan Membangun Desa',
          icon: require('~/static/icons/selayang-pandang/icon-prioritas-pembangunan-kesehatan.svg')
        },
        {
          id: 9,
          title: 'Pendidikan Agama dan Tempat Ibadah Juara',
          icon: require('~/static/icons/selayang-pandang/icon-prioritas-pembangunan-kesehatan.svg')
        },
        {
          id: 10,
          title: 'Pengembangan Infrastruktur Konektivitas Wilayah dan Pengelolaan Lingkungan Hidup',
          icon: require('~/static/icons/selayang-pandang/icon-prioritas-pembangunan-kesehatan.svg')
        },
        {
          id: 11,
          title: 'Pengembangan Destinasi dan Infrastruktur Pariwisata',
          icon: require('~/static/icons/selayang-pandang/icon-prioritas-pembangunan-kesehatan.svg')
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
