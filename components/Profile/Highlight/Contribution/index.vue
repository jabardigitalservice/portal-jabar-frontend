<template>
  <section class="jabar-contribution md:grid md:grid-cols-1 lg:grid-cols-[minmax(310px,370px),auto] gap-6 md:p-6">
    <div class="bg-green-primary rounded-lg text-white p-4 flex flex-col gap-4 mb-10 md:mb-0">
      <div>
        <p class="font-lora font-bold text-2xl text-center lg:text-left mb-2 leading-[44px] xl:leading-10">
          <span class="lg:text-[26px] xl:text-xl">Kontribusi</span> <br class="hidden lg:block"> Provinsi Jawa Barat <br> Terhadap Negara
        </p>
        <p class="text-sm leading-[23px] text-center lg:text-left">
          Jawa Barat merupakan rumah bagi 49,94 juta jiwa, selain itu Jawa Barat juga memiliki potensi pariwisata dan budaya yang sangat kaya.
        </p>
        <p class="text-sm leading-[23px] text-center lg:text-left">
          Sumber data: (IKP Diskominfo Jabar, 2022)
        </p>
      </div>
      <Link link="/arsip-dan-dokumen" tabindex="-1" class="w-full">
        <Button class="contribution-button w-full text-left" type="button" variant="primary">
          Lihat Laporan Perkembangan Jawa Barat
          <Icon name="open-new-tab" size="14px" />
        </Button>
      </Link>
    </div>

    <!-- Content Swiper (Mobile Only) -->
    <swiper
      v-show="swiperReady"
      ref="jabarContribution"
      class="md:hidden"
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
      >
        <div class="w-full min-h-[166px] rounded-lg border border-gray-200 p-4">
          <div class="flex flex-col gap-2">
            <Icon :src="item.icon" size="38px" />
            <p class="text-green-700 font-roboto font-bold text-lg">
              {{ item.percentage }}
            </p>
          </div>
          <p class="font-medium text-sm text-blue-gray-400">
            {{ item.description }}
          </p>
        </div>
      </swiper-slide>
      <template #pagination>
        <div class="flex w-full justify-between mt-4">
          <!-- Next Button -->
          <button
            :disabled="isFirstSlide"
            class="custom-button-prev flex-shrink-0 w-[42px] h-[42px] bg-green-700 hover:bg-green-600 rounded-full flex items-center justify-center disabled:bg-gray-100"
          >
            <Icon
              name="chevron-left"
              :class="isFirstSlide ? 'text-gray-500' : 'text-white'"
              size="16px"
            />
          </button>
          <!-- Pagination -->
          <div class="custom-pagination !w-[fit-content] flex items-center align-center" />
          <!-- Prev Button -->
          <button
            :disabled="isLastSlide"
            class="custom-button-next flex-shrink-0 w-[42px] h-[42px] bg-green-700 hover:bg-green-600 rounded-full flex items-center justify-center disabled:bg-gray-100"
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

    <!-- Content Grid (Tablet and Dekstop) -->
    <ul class="jabar-contribution__items hidden h-full md:grid grid-cols-2 xl:grid-cols-6 gap-3 mb-6">
      <li v-for="item in items" :key="item.id" class="min-h-[166px] rounded-lg border border-gray-200 p-4 flex flex-col justify-between xl:col-span-2">
        <div class="flex flex-col gap-2">
          <Icon :src="item.icon" size="38px" />
          <p class="text-green-700 font-roboto font-bold text-lg">
            {{ item.percentage }}
          </p>
        </div>
        <p class="font-medium text-sm text-blue-gray-400">
          {{ item.description }}
        </p>
      </li>
    </ul>
  </section>
</template>

<script>
export default {
  data () {
    return {
      currentSlide: 0,
      swiperReady: false,
      swiperOptions: Object.freeze({
        slidesPerView: 1,
        mousewheel: true,
        passiveListeners: true,
        pagination: {
          el: '.custom-pagination',
          type: 'custom',
          renderCustom (swiper, current, total) {
            return `<p>${current} dari ${total}</p>`
          }
        },
        navigation: {
          nextEl: '.custom-button-next',
          prevEl: '.custom-button-prev'
        }
      }),
      items: [
        {
          id: 1,
          icon: '/icons/selayang-pandang/icon-kontribusi-pdb-nasional.svg',
          percentage: '14.33%',
          description: 'Kontribusi terhadap Produk Domestik Bruto (PDB) Nasional.'
        },
        {
          id: 2,
          icon: '/icons/selayang-pandang/icon-kontribusi-pdb-manufaktur.svg',
          percentage: '60%',
          description: 'Kontribusi terhadap Produk Domestik Bruto (PDB) Sektor Industri Manufaktur.'
        },
        {
          id: 3,
          icon: '/icons/selayang-pandang/icon-kontribusi-beras.svg',
          percentage: '17.76%',
          description: 'Produsen Beras Nasional.'
        },
        {
          id: 4,
          icon: '/icons/selayang-pandang/icon-kontribusi-ekspor.svg',
          percentage: 'AS 18.4%, Jepang 12.52%',
          description: 'Provinsi Produsen Komoditi Ekspor Nasional.'
        },
        {
          id: 5,
          icon: '/icons/selayang-pandang/icon-kontribusi-pma.svg',
          percentage: '34.46%',
          description: 'Kontribusi Penanaman Modal Asing (PMA) Jawa Barat terhadap Nasional.'
        }
      ]
    }
  },
  computed: {
    swiper () {
      return this.$refs.jabarContribution.$swiper
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

<style scoped>
.contribution-button.jds-button--primary {
  background-color: #FFFFFF;
  color: #069550;
}
.contribution-button.jds-button--primary:hover {
  background-color: #FAFAFA;
  color: #008444;
}

.jabar-contribution .jabar-contribution__items > li:last-child {
  @apply md:col-span-2
}

.jabar-contribution .jabar-contribution__items > li:nth-child(5) {
  @apply xl:row-start-1 xl:col-start-5
}

.jabar-contribution .jabar-contribution__items > li:nth-child(3),
.jabar-contribution .jabar-contribution__items > li:nth-child(4)
{
  @apply xl:col-span-3
}
</style>
