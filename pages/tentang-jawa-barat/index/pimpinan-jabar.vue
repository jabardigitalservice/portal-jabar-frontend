<template>
  <section class="overflow-hidden">
    <div class="mb-16">
      <h2 class="font-lora font-bold text-green-700 text-4xl leading-[56px] mb-4">
        Pimpinan Jawa Barat
      </h2>
      <p class="text-sm leading-6 text-blue-gray-800 mb-8">
        Gubernur Jawa Barat adalah kepala daerah tingkat I yang memegang pemerintahan di Jawa Barat bersama dengan Wakil Gubernur dan 120 anggota Dewan Perwakilan Rakyat Daerah Jawa Barat. Gubernur dan Wakil Gubernur Jawa Barat dipilih melalui pemilihan umum yang dilaksanakan 5 tahun sekali.
      </p>
      <div class="flex flex-col xl:flex-row gap-8 items-center xl:grid-cols-2 bg-green-700 rounded-[18px] p-6 relative">
        <div class="absolute left-0 bottom-0">
          <svg width="117" height="114" viewBox="0 0 117 114" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M7.62939e-06 0C31.0303 2.6432e-06 60.7897 12.0107 82.7315 33.3898C104.673 54.769 117 83.7653 117 114H79.6837C79.6837 93.4085 71.2885 73.6603 56.3449 59.0999C41.4013 44.5394 21.1334 36.3595 7.62939e-06 36.3595V0Z" fill="#008444" />
          </svg>
        </div>
        <div>
          <h3 class="mb-3 font-lora font-bold text-2xl leading-9 text-white text-center xl:text-left">
            Gubernur dan Wakil Gubernur Provinsi Jawa Barat
          </h3>
          <p class="font-lora font-bold text-green-100 text-center xl:text-left">
            Periode 2018-2023
          </p>
        </div>
        <div class="flex flex-col lg:flex-row gap-4">
          <div class="p-4 bg-green-800 rounded-2xl flex flex-col justify-center items-center min-w-[200px]">
            <p class="font-lato font-bold text-sm leading-6 text-green-300">
              Gubernur
            </p>
            <p class="font-lato font-bold text-sm leading-6 text-white mb-3">
              Dr. H. Moch. Ridwan Kamil
            </p>
            <img class="mb-3" src="/images/about/pimpinan/ridwan-kamil.png" alt="Ridwan Kamil" width="103" height="125">
            <button class="bg-green-700 py-[10px] text-sm rounded-lg text-white w-full hover:bg-[#008f4a]">
              Lihat Profil
            </button>
          </div>
          <div class="p-4 bg-green-800 rounded-2xl flex flex-col justify-center items-center min-w-[200px]">
            <p class="font-lato font-bold text-sm leading-6 text-green-300">
              Wakil Gubernur
            </p>
            <p class="font-lato font-bold text-sm leading-6 text-white mb-3">
              H. Uu Ruzhanul Ulum
            </p>
            <img class="mb-3" src="/images/about/pimpinan/ruzhanul-ulum.png" alt="Ruzhanul Ulum" width="103" height="125">
            <button class="bg-green-700 py-[10px] text-sm rounded-lg text-white w-full hover:bg-[#008f4a]">
              Lihat Profil
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="relative">
      <h3 class="font-lora font-bold text-[26px] text-blue-gray-700 mb-7">
        Masa Jabatan Gubernur Sebelumnya
      </h3>
      <ul class="flex overflow-x-auto relative">
        <li v-for="(item, index) in items" :key="item.id" class="min-w-[328px]">
          <div class="flex items-center">
            <p class="px-4 py-2 bg-green-700 rounded-[42px] font-lato font-bold text-xs text-white whitespace-nowrap">
              {{ item.period }}
            </p>
            <div :class="{'w-full h-0.5 bg-green-700': index !== items.length - 1}" />
          </div>
          <div class="p-6 rounded-2xl mt-12 flex items-center gap-4 hover:bg-green-50 transition-all ease-out duration-300">
            <img :src="item.image" alt="Ahmad Heryawan" width="50" height="50">
            <div>
              <p class="font-lato text-xs text-blue-gray-300">
                Gubernur
              </p>
              <p class="font-lato font-bold text-sm text-blue-gray-700">
                {{ item.name }}
              </p>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </section>
</template>

<script>
export default {
  data () {
    return {
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
      ]
    }
  }
}
</script>

<style scoped>
/* Hide scrollbar for Chrome, Safari and Opera */
ul::-webkit-scrollbar {
  display: none;
}
/* Hide scrollbar for IE, Edge and Firefox */
ul {
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
}
.line:nth-of-type() {
  background-color: red;
}
</style>
