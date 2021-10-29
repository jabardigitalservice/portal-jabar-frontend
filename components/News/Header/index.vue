<template>
  <div>
    <div class="absolute top-24 w-full z-10">
      <BaseContainer>
        <Breadcrumb class="mb-6" />
      </BaseContainer>
    </div>
    <div style="height: calc(100vh - 100px);">
      <div
        class="w-full absolute top-0 h-full"
        style="background: linear-gradient(100deg, rgba(0,40,19,0.9) 0%, rgba(0,32,39,0.8) 55%);"
      />
      <Carousel
        :items="items"
        :duration="10000"
        :speed="1000"
        :hover="false"
        :pause-on-hover="false"
      >
        <template #filter>
          <div
            class="w-full absolute top-0 h-full"
            style="background: radial-gradient(circle, rgba(0,23,28,0.08) 0%, rgba(0,11,14,0.59) 50%, rgba(0,11,14,0.82) 100%);"
          />
        </template>
        <template #default="{ item, index, slider }">
          <div class="absolute bottom-0 w-full text-white">
            <BaseContainer class="grid grid-cols-1 lg:grid-cols-7">
              <div class="flex flex-col justify-end h-full lg:col-span-5 lg:pr-40 pb-8">
                <div>
                  <p class="font-roboto uppercase leading-relaxed tracking-wider opacity-80 mb-1">
                    {{ item.category }}
                  </p>
                  <h3 class="line-clamp-2 font-lora font-bold text-4xl leading-normal mb-6">
                    {{ item.title }}
                  </h3>
                  <div class="flex gap-2 opacity-60 text-sm mb-6">
                    <div class="flex items-center gap-2">
                      <Icon src="/icons/calendar.svg" size="16px" alt="Diterbitkan" />
                      <p>{{ formatDate(item.created_at) }}</p>
                    </div>
                    <div class="hidden sm:block">
                      |
                    </div>
                    <div class="hidden sm:flex sm:items-center sm:gap-2">
                      <Icon src="/icons/pen.svg" size="16px" alt="Penulis" />
                      <p>Penulis: {{ item.created_by }}</p>
                    </div>
                  </div>
                </div>
                <div class="flex justify-between items-center">
                  <Link :link="`/berita/${getSlug(slider)}`">
                    <button type="button" class="border border-white border-opacity-30 px-4 py-2 rounded-lg">
                      Baca Selengkapnya
                    </button>
                  </Link>
                  <div class="flex items-center gap-4">
                    <div class="cursor-pointer" @click="slider.prev()">
                      <Icon name="chevron-left" size="10px" />
                    </div>
                    <p class="text-gray-500">
                      <span class="font-bold text-white mr-1">{{ index + 1 }}</span>dari {{ items.length }}
                    </p>
                    <div class="cursor-pointer" @click="slider.next()">
                      <Icon name="chevron-right" size="10px" />
                    </div>
                  </div>
                </div>
              </div>
            </BaseContainer>
          </div>
        </template>
      </Carousel>
    </div>
  </div>
</template>

<script>
import { format, daysDifference, relativeTime } from '~/utils/date'

export default {
  data () {
    return {
      /**
       *  TODO: replace this data with data from api
       */
      items: [
        {
          id: 1,
          title: 'Pemprov Jabar Matangkan Rencana Pembangunan Etalase Citarum',
          category: 'Pemerintahan',
          image: 'https://i.ytimg.com/vi/DLLn7hm1JpU/maxresdefault.jpg',
          slug: 'penanganan-covid-19-di-jabar-membaik-ridwan-kamil-minta-vaksinasi-dipercepat-40c0aaee7bd',
          created_at: '2021-10-26T04:34:11Z',
          created_by: 'Admin',
          related_news: []
        },
        {
          id: 2,
          title: 'Penanganan Covid-19 di Jabar Membaik, Ridwan Kamil Minta Vaksinasi Dipercepat',
          category: 'Sosial',
          image: 'https://www.radarcirebon.com/wp-content/uploads/2021/01/3-RIDWAN-KAMIL-RAPAT.jpeg',
          slug: 'penanganan-covid-19-di-jabar-membaik-ridwan-kamil-minta-vaksinasi-dipercepat-40c0aaee7bd',
          created_at: '2021-10-26T04:34:11Z',
          created_by: 'Admin',
          related_news: []
        },
        {
          id: 3,
          title: 'Jabar Terus Tingkatkan Vaksinasi bagi Pelajar dan Lansia',
          category: 'Kesehatan',
          image: 'https://bp2mi.go.id/uploads/berita/images/Kolaborasi_Pemprov._Jabar,_BP2MI_Sosialisasi__UU_No._18_2017_tentang_Pelindungan_Pekerja_Migran_Indonesia_IMG-20210407-WA0114.jpg',
          slug: 'jabar-terus-tingkatkan-vaksinasi-bagi-pelajar-dan-lansia-40c0aaee7bd',
          created_at: '2021-10-26T04:34:11Z',
          created_by: 'Admin',
          related_news: []
        },
        {
          id: 4,
          title: 'Gubernur Jabar Melepas 200 Pemuda Agri Mandiri',
          category: 'Politik',
          image: 'https://assets.pikiran-rakyat.com/crop/0x0:0x0/x/photo/2021/01/09/3294711490.jpg',
          slug: 'gubernur-jabar-melepas-200-pemuda-agri-mandiri-40c0aaee7bd',
          created_at: '2021-10-26T04:34:11Z',
          created_by: 'Admin',
          related_news: []
        },
        {
          id: 5,
          title: 'Wagub Ajak Pemuda Satukan Visi Membangun',
          category: 'Pendidikan',
          image: 'https://disk.mediaindonesia.com/thumbs/1800x1200/news/2020/08/4021dfdcb2e8cb7ec36e8196f6a2814e.jpeg',
          slug: 'wagub-ajak-pemuda-satukan-visi-membangun-40c0aaee7bd',
          created_at: '2021-10-26T04:34:11Z',
          created_by: 'Admin',
          related_news: []
        }
      ]
    }
  },
  methods: {
    formatDate (date) {
      const differenceInDays = daysDifference(date)

      if (differenceInDays > 0) {
        return format(date, { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })
      }

      return relativeTime(date)
    },
    getSlug (slider) {
      const index = slider?.details().relativeSlide || 0

      return this.items[index].slug
    }
  }
}
</script>
