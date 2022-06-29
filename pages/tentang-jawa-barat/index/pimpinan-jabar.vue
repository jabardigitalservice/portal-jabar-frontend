<template>
  <section class="overflow-hidden">
    <div class="mb-12">
      <h2 class="font-lora font-bold text-green-700 text-[28px] md:text-4xl text-center md:text-left leading-[56px] mb-4">
        Pimpinan Jawa Barat
      </h2>
      <p class="text-sm leading-6 text-blue-gray-800 mb-8">
        Gubernur Jawa Barat adalah kepala daerah tingkat I yang memegang pemerintahan di Jawa Barat bersama dengan Wakil Gubernur dan 120 anggota Dewan Perwakilan Rakyat Daerah Jawa Barat. Gubernur dan Wakil Gubernur Jawa Barat dipilih melalui pemilihan umum yang dilaksanakan 5 tahun sekali.
      </p>
      <div class="grid grid:cols-1 lg:grid-cols-[1fr,auto] gap-8 items-center bg-green-700 rounded-[18px] py-4 px-7 md:p-6 relative">
        <div class="hidden md:block absolute left-0 bottom-0">
          <svg width="117" height="114" viewBox="0 0 117 114" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M7.62939e-06 0C31.0303 2.6432e-06 60.7897 12.0107 82.7315 33.3898C104.673 54.769 117 83.7653 117 114H79.6837C79.6837 93.4085 71.2885 73.6603 56.3449 59.0999C41.4013 44.5394 21.1334 36.3595 7.62939e-06 36.3595V0Z" fill="#008444" />
          </svg>
        </div>
        <div class="relative z-10">
          <h3 class="mb-3 font-lora font-bold text-2xl leading-9 text-white text-center lg:text-left md:mx-auto md:max-w-[25ch] lg:mx-0">
            Gubernur dan Wakil Gubernur Provinsi Jawa Barat
          </h3>
          <p class="font-lora font-bold text-green-100 text-center lg:text-left">
            Periode 2018-2023
          </p>
        </div>
        <div class="min-w-0 flex flex-col md:flex-row md:justify-center w-full lg:flex-row gap-4">
          <div class="p-4 bg-green-800 rounded-2xl flex flex-col justify-center items-center w-full min-w-[200px] md:max-w-[200px]">
            <p class="font-lato font-bold text-sm leading-6 text-green-300">
              Gubernur
            </p>
            <p class="font-lato font-bold text-sm leading-6 text-white mb-3">
              Dr. H. Moch. Ridwan Kamil
            </p>
            <img class="mb-3" src="/images/about/pimpinan/ridwan-kamil.png" alt="Ridwan Kamil" width="103" height="125">
            <button class="bg-green-700 py-[10px] text-sm rounded-lg text-white w-full hover:bg-[#008f4a]" @click="setSelectedProfile('gubernur')">
              Lihat Profil
            </button>
          </div>
          <div class="p-4 bg-green-800 rounded-2xl flex flex-col justify-center items-center w-full min-w-[200px] md:max-w-[200px]">
            <p class="font-lato font-bold text-sm leading-6 text-green-300">
              Wakil Gubernur
            </p>
            <p class="font-lato font-bold text-sm leading-6 text-white mb-3">
              H. Uu Ruzhanul Ulum
            </p>
            <img class="mb-3" src="/images/about/pimpinan/ruzhanul-ulum.png" alt="Ruzhanul Ulum" width="103" height="125">
            <button class="bg-green-700 py-[10px] text-sm rounded-lg text-white w-full hover:bg-[#008f4a]" @click="setSelectedProfile('wakil gubernur')">
              Lihat Profil
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="relative">
      <h3 class="font-lora font-bold text-2xl md:text-4xl text-center md:text-left text-blue-gray-700 mb-7">
        Masa Jabatan Gubernur Sebelumnya
      </h3>
      <swiper
        v-show="swiperReady"
        ref="jabarLeaderSwiper"
        :options="swiperOptions"
        :auto-update="true"
        :auto-destroy="true"
        :delete-instance-on-destroy="true"
        :cleanup-styles-on-destroy="true"
        @ready="swiperReady = true"
        @slide-change="setCurrentSlide"
      >
        <swiper-slide
          v-for="(item, index) in items"
          :key="item.id"
          class="md:!w-[fit-content]"
        >
          <div class="min-w-[328px]">
            <div class="flex items-center">
              <p class="px-4 py-2 bg-green-700 rounded-[42px] font-lato font-bold text-xs text-white whitespace-nowrap">
                {{ item.period }}
              </p>
              <div :class="{'w-full h-0.5 bg-green-700': index !== items.length - 1}" />
            </div>
            <div class="p-6 rounded-2xl mt-4 flex items-center gap-4 hover:bg-green-50 transition-all ease-out duration-300">
              <img :src="item.image" :alt="item.name" width="50" height="50">
              <div>
                <p class="font-lato text-xs text-blue-gray-300">
                  Gubernur
                </p>
                <p class="font-lato font-bold text-sm text-blue-gray-700">
                  {{ item.name }}
                </p>
              </div>
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

      <!-- Swiper Skeleton -->
      <div v-show="!swiperReady" class="w-full h-[146px] flex overflow-hidden gap-8">
        <div v-for="index in 9" :key="index" class="min-w-[328px] h-full bg-gray-200 animate-pulse rounded-xl" />
      </div>
    </div>

    <!-- Jabar Leader ModaL -->
    <BaseModal :show="isModalOpen" button-label="Tutup" @close="closeModal">
      <template #header>
        <h1 class="font-roboto font-medium text-[21px] leading-[34px] capitalize text-green-700 px-6 py-2">
          Profil {{ selectedProfile }} Jawa Barat
        </h1>
      </template>
      <section class="rounded-2xl flex max-h-[443px] max-w-[640px]">
        <img :src="profile[selectedProfile].image" alt="" width="255" height="443" class="flex-shrink-0">
        <div class="overflow-y-auto px-5 flex flex-col">
          <h3 class="font-lato text-gray-800 text-sm leading-6 mb-6">
            {{ profile[selectedProfile].about }}
          </h3>
          <h4 class="font-roboto font-medium text-base text-gray-800 leading-[26px]">
            Nama Lengkap
          </h4>
          <p class="font-lato text-sm text-gray-800 leading-6 mb-6">
            {{ profile[selectedProfile].name }}
          </p>
          <h4 class="font-roboto font-medium text-base text-gray-800 leading-[26px]">
            Tempat Tanggal Lahir
          </h4>
          <p class="font-lato text-sm text-gray-800 leading-6 mb-6">
            {{ profile[selectedProfile].dateOfBirth }}
          </p>
          <h4 class="font-roboto font-medium text-base text-gray-800 leading-[26px]">
            Riwayat Pendidikan
          </h4>
          <ul class="mb-6 list-disc">
            <li v-for="education in profile[selectedProfile].educations" :key="education.id" class="font-lato text-sm text-gray-800 leading-6 ml-6">
              {{ education.description }}
            </li>
          </ul>
          <h4 class="font-roboto font-medium text-base text-gray-800 leading-[26px]">
            Karier
          </h4>
          <ul class="mb-6 list-disc">
            <li v-for="career in profile[selectedProfile].careers" :key="career.id" class="font-lato text-sm text-gray-800 leading-6 ml-6">
              {{ career.description }}
            </li>
          </ul>
          <h4 class="font-roboto font-medium text-base text-gray-800 leading-[26px]">
            Penghargaan
          </h4>
          <ul class="list-disc">
            <li v-for="award in profile[selectedProfile].awards" :key="award.id" class="font-lato text-sm text-gray-800 leading-6 ml-6">
              {{ award.description }}
            </li>
          </ul>
        </div>
      </section>
    </BaseModal>
  </section>
</template>

<script>
export default {
  data () {
    return {
      profile: Object.freeze({
        gubernur: {
          name: 'Mochamad Ridwan Kamil, ST.,M.Ud',
          dateOfBirth: 'Bandung, 4 Oktober 1971',
          educations: [
            {
              id: 1,
              description: 'S2, Master of Urban Design University of California, Berkeley, AS (1999-2001)'
            },
            {
              id: 2,
              description: 'S1, Teknik Arsitektur, Institut Teknologi Bandung (1990-1995)'
            }
          ],
          careers: [
            {
              id: 1,
              description: 'Gubernur Jawa Barat (2018-2023)'
            },
            {
              id: 2,
              description: 'Walikota Bandung (2013-2018)'
            },
            {
              id: 3,
              description: 'Arsitek'
            },
            {
              id: 4,
              description: 'Dosen Institut Teknologi Bandung (ITB)'
            }
          ],
          awards: [
            {
              id: 1,
              description: 'Best Governor for Healthcare and Action Against Pandemi dari Indonesia Awards (2021)'
            },
            {
              id: 2,
              description: 'The Best 7 Asia Governor dari Asia Business Info (2020)'
            },
            {
              id: 3,
              description: 'Doctor Honoris Kausa Bidang Public Administration di Dong-A University, Busan, Korea Selatan (2019)'
            }
          ],
          about: 'Ridwan Kamil adalah seorang arsitek sekaligus politikus yang kini menjabat sebagai Gubernur Jawa Barat yang ke-14.',
          image: '/images/about/profil/ridwan-kamil.png'
        },
        'wakil gubernur': {
          name: 'H. Uu Ruzhanul Ulum, SE',
          dateOfBirth: 'Tasikmalaya, 10 Mei 1969',
          educations: [
            {
              id: 1,
              description: 'Universitas Siliwangi (1997)'
            }
          ],
          careers: [
            {
              id: 1,
              description: 'Wakil Gubernur Jawa Barat (2018-2023)'
            },
            {
              id: 2,
              description: 'Bupati Tasikmalaya (2011-2018)'
            }
          ],
          awards: [
            {
              id: 1,
              description: 'Peduli Jurnalis dari Persatuan Wartawan Indonesia (2021)'
            },
            {
              id: 2,
              description: 'Lencana Adhitya Karya Mahatva Yodha Kategori Pembina Umum Karang Taruna Terbaik (2018)'
            },
            {
              id: 3,
              description: 'Satya Lencana Jasa Bhakti Koperasi dari Kementrian Koperasi dan Usaha Kecil Menengah Republik Indonesia (2017)'
            }
          ],
          about: 'Memulai karir politiknya sebagai anggota DPRD pada tahun 1999, kini Uu Ruzhanul Ulum resmi memimpin Jawa Barat bersama Ridwan Kamil.',
          image: '/images/about/profil/uu-ruzhanul-ulum.png'
        }
      }),
      items: [
        {
          id: 1,
          name: 'Ahmad Heryawan',
          period: 'Juni 2008 - Juni 2018',
          image: '/images/about/pimpinan/ahmad-heryawan.png'
        },
        {
          id: 2,
          name: 'Danny Setiawan',
          period: 'Juni 2003 - Juni 2008',
          image: '/images/about/pimpinan/danny-setiawan.png'
        },
        {
          id: 3,
          name: 'HR. Nuriana',
          period: '1993 - Juni 2003',
          image: '/images/about/pimpinan/nuriana.png'
        },
        {
          id: 4,
          name: 'Yogie Suardi Memet',
          period: '1985 - 1993',
          image: '/images/about/pimpinan/yogie.png'
        },
        {
          id: 5,
          name: 'Aang Kunaefi',
          period: '1975 - 1985',
          image: '/images/about/pimpinan/aang.png'
        },
        {
          id: 6,
          name: 'Solihin GP',
          period: '1970 - 1974',
          image: '/images/about/pimpinan/solihin.png'
        },
        {
          id: 7,
          name: 'Mashudi',
          period: '1960 - 1970',
          image: '/images/about/pimpinan/mashudi.png'
        },
        {
          id: 8,
          name: 'Ipik Gandamana',
          period: '1956 - 1959',
          image: '/images/about/pimpinan/ipik.png'
        },
        {
          id: 9,
          name: 'Sanusi Hardjadinata',
          period: '1951 - 1956',
          image: '/images/about/pimpinan/sanusi.png'
        },
        {
          id: 10,
          name: 'R. Mas Sewaka',
          period: '1950 - 1956',
          image: '/images/about/pimpinan/sewaka.png'
        },
        {
          id: 11,
          name: 'Ukar Bratakusumah',
          period: '1948 - 1950',
          image: '/images/about/pimpinan/ukar.png'
        },
        {
          id: 12,
          name: 'R. Mas Sewaka',
          period: '1946 - 1948',
          image: '/images/about/pimpinan/sewaka.png'
        },
        {
          id: 13,
          name: 'Murdjani',
          period: '1946 - 1946',
          image: '/images/about/pimpinan/murdjani.png'
        },
        {
          id: 14,
          name: 'Datuk Djamin',
          period: '1945 - 1945',
          image: '/images/about/pimpinan/datuk.png'
        },
        {
          id: 15,
          name: 'Mas Sutardjo Kertohadikusumo',
          period: '1945 - 1945',
          image: '/images/about/pimpinan/sutardjo.png'
        }
      ],
      currentSlide: 0,
      isModalOpen: false,
      selectedProfile: 'gubernur',
      swiperReady: false,
      swiperOptions: Object.freeze({
        slidesPerView: 1,
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
          768: {
            slidesPerView: 'auto'
          }
        }
      })
    }
  },
  computed: {
    swiper () {
      return this.$refs.jabarLeaderSwiper.$swiper
    },
    isFirstSlide () {
      return this.currentSlide === 0
    },
    isLastSlide () {
      return this.currentSlide === this.items.length - 1
    }
  },
  methods: {
    showModal () {
      this.isModalOpen = true
    },
    closeModal () {
      this.isModalOpen = false
    },
    setSelectedProfile (selectedProfile) {
      if (!['gubernur', 'wakil gubernur'].includes(selectedProfile)) { return }

      this.selectedProfile = selectedProfile
      this.showModal()
    },
    setCurrentSlide () {
      this.currentSlide = this.swiper.activeIndex
    }
  }
}
</script>
