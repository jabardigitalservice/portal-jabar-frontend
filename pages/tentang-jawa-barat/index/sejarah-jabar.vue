<template>
  <section>
    <div class="mb-9">
      <h2 class="font-lora font-bold text-green-700 text-4xl leading-[56px] mb-4">
        Sejarah Jawa Barat
      </h2>
      <p class="text-sm leading-6 text-blue-gray-800 mb-8">
        Jawa Barat merupakan jantung budaya Sunda atau biasa disebut sebagai Tatar Sunda/Pasundan bersama dengan provinsi Banten meskipun banyak pendatang yang menetap dan tinggal dari berbagai suku bangsa lainnya di Indonesia terutama di wilayah metropolitan Jakarta dan migrasi di Cirebon sejak berabad abad lama.
      </p>
    </div>
    <ul class="flex flex-col gap-4 relative">
      <div class="absolute h-[calc(100%-80px)] w-[2px] left-[52px] bg-green-700 top-6" />
      <li v-for="item in history" :key="item.id" class="p-6 rounded-lg min-h-[100px]">
        <div class="flex gap-6">
          <p class="absolute text-xs text-center rounded-full p-2 bg-green-700 text-white self-start w-14 h-14 flex-shrink-0 flex justify-center items-center">
            {{ item.year }}
          </p>
          <div class="pl-20">
            <p class="text-blue-gray-700 mb-2 text-sm">
              {{ item.subtitle }}
            </p>
            <h3 class="font-lato font-bold text-blue-gray-700 mb-2">
              {{ item.title }}
            </h3>
            <p class="text-blue-gray-800 text-sm leading-6">
              {{ item.desription }}
            </p>
          </div>
        </div>
      </li>
    </ul>
  </section>
</template>

<script>
export default {
  data () {
    return {
      history: [
        {
          id: 1,
          year: 'Abad ke-5',
          title: 'Kerajaan Tarumanegara',
          desription: 'Jawa Barat pada abad ke-5 merupakan bagian dari Kerajaan Tarumanagara. Prasasti peninggalan Kerajaan Tarumanagara banyak tersebar di Jawa Barat. Ada tujuh prasasti yang ditulis dalam aksara Wengi (yang digunakan dalam masa Palawa India) dan bahasa Sansakerta yang sebagian besar menceritakan para raja Tarumanagara.'
        },
        {
          id: 2,
          year: 'Abad ke-8',
          title: 'Kerajaan Sunda/Pajajaran',
          desription: 'Setelah runtuhnya kerajaan Tarumanegara, kekuasaan di bagian barat Pulau Jawa dari Ujung Kulon sampai Kali Serayu dilanjutkan oleh Kerajaan Sunda. Salah satu prasasti dari zaman Kerajaan Sunda adalah prasasti Kebon Kopi II yang berasal dari tahun 932. Kerajaan Sunda beribukota di Pakuan Pajajaran (sekarang kota Bogor).'
        },
        {
          id: 3,
          year: 'Abad ke-16',
          title: 'Kesultanan Cirebon',
          desription: 'Pada abad ke-16, Kesultanan Demak tumbuh menjadi saingan ekonomi dan politik Kerajaan Sunda. Pelabuhan Cirebon (kelak menjadi Kota Cirebon) lepas dari Kerajaan Sunda karena pengaruh Kesultanan Demak. Pelabuhan ini kemudian tumbuh menjadi Kesultanan Cirebon yang memisahkan diri dari Kerajaan Sunda. Pelabuhan Banten juga lepas ke tangan Kesultanan Cirebon dan kemudian tumbuh menjadi Kesultanan Banten.'
        },
        {
          id: 4,
          year: 'Abad ke-17',
          title: 'Belanda Melalui VOC Memasuki Jayakarta',
          desription: 'VOC berkantor di Ambon sejak tahun 1610 hingga 1619. Namun, karena terdesak dengan penaklukan Portugis, maka VOC pindah ke Jayakarta atau Batavia di tahun 1619. Dan Gubernur Jenderal VOC yang pertama adalah Pieter Both.'
        },
        {
          id: 5,
          year: 'Abad ke-19',
          title: 'Kekuasaan VOC Belanda Semakin Terasa di Jawa Barat',
          desription: 'VOC mengembangkan wilayah kekuasaannya dengan mendirikan kekuasaannya di wilayah Banten. Upaya pengembangan wilayah kekuasaan tersebut yang tercatat pada tahun 1603 Masehi. Pada masa itu, Banten mengizinkan Kongsi Dangan Belanda, yakni VOC untuk menyandarkan kapal miliknya, mendirikan kantor-kantornya, hingga mengizinkan untuk mendirikan benteng pertahanannya di wilayah Banten tersebut.'
        },
        {
          id: 6,
          year: '1925',
          title: 'Hindia Belanda Membentuk Provinsi Jawa Barat',
          desription: 'Pembentukan provinsi itu sebagai pelaksanaan Bestuurshervormingwet tahun 1922, yang membagi Hindia Belanda atas kesatuan-kesatuan daerah provinsi.'
        },
        {
          id: 7,
          year: 'Agustus 1945',
          title: 'Jawa Barat Bergabung Dengan Republik Indonesia.',
          subtitle: '17 Agustus 1945'
        },
        {
          id: 8,
          year: 'Agustus 1945',
          title: 'Hari Jadi Pemerintah Provinsi Jawa Barat',
          subtitle: '19 Agustus 1945',
          desription: 'Sidang Panitia Persiapan Kemerdekaan Indonesia (PPKI) mengumumkan Jawa Barat sebagai salah satu dari 8 Provinsi di Indonesia. Selanjutnya, melalui Perda Nomor 26 Tahun 2010 tentang Hari Jadi Pemerintah Provinsi Jawa Barat, menetapkan tanggal 19 Agustus sebagai Hari Jadi Pemerintah Provinsi Jawa Barat'
        },
        {
          id: 9,
          year: 'Agustus 1945',
          title: 'Jawa Barat Menjadi Negara Pasundan',
          subtitle: '27 Agustus 1945',
          desription: 'Jawa Barat menjadi Negara Pasundan yang merupakan salah satu negara bagian dari Republik Indonesia Serikat.'
        },
        {
          id: 10,
          year: '1950',
          title: 'Kembalinya Jawa Barat ke Indonesia'
        }
      ]
    }
  }
}
</script>

<style scoped>
ul > li:nth-child(even) {
  background-color: #F5F5F5;
}
</style>
