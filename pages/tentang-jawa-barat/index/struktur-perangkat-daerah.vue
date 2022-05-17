<template>
  <section>
    <div class="mb-16">
      <h2 class="font-lora font-bold text-green-700 text-4xl leading-[56px] mb-4">
        Struktur Perangkat Daerah
      </h2>
      <p class="text-sm leading-6 text-blue-gray-800 mb-8">
        Berdasarkan Peraturan Gubernur Jawa Barat No. 82 tahun 2020 tentang Kedudukan dan Susunan Perangkat Daerah Provinsi Jawa Barat, Perangkat Daerah merupakan unsur pembantu Gubernur dan Dewan Perwakilan Rakyat Daerah dalam menyelenggarakan urusan pemerintahan yang menjadi kewenangan Daerah Provinsi Jawa Barat.
      </p>
      <div class="flex justify-center items-center w-full p-8 rounded-[18px] bg-gray-100">
        <img src="/images/about/struktur-perangkat-daerah.png" width="630" height="335" alt="Struktur perangkat daerah">
      </div>
    </div>
    <div>
      <h3 class="font-lora font-bold text-[26px] text-blue-gray-700 mb-7">
        Tugas Pokok dan Fungsi
      </h3>
      <ul class="grid gap-6 lg:grid-cols-2">
        <li v-for="item in items" :key="item.id" class="p-5 rounded-lg border border-gray-300">
          <h3 class="font-lato font-bold text-xl text-green-700 mb-4">
            {{ item.title }}
          </h3>
          <ul class="px-3 bg-gray-50 flex flex-col divide-y divide-blue-gray-50">
            <li v-for="list in item.lists" :key="list.id" class="py-3 text-sm text-blue-gray-400 leading-6">
              {{ list.description }}
            </li>
          </ul>
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
          title: 'Sekretariat Daerah Provinsi',
          lists: [
            {
              id: 1,
              description: 'Sekretariat Daerah Provinsi merupakan unsur staf.'
            },
            {
              id: 2,
              description: 'Adapun Sekretariat Daerah Provinsi dipimpin oleh Sekretaris Daerah Provinsi yang berkedudukan di bawah dan bertanggungjawab kepada Gubernur.'
            }
          ]
        },
        {
          id: 2,
          title: 'Sekretariat DPRD Provinsi',
          lists: [
            {
              id: 1,
              description: 'Sekretariat DPRD Provinsi merupakan unsur pelayanan administrasi dan pemberian dukungan terhadap tugas dan fungsi DPRD.'
            },
            {
              id: 2,
              description: 'Adapun Sekretariat Daerah Provinsi dipimpin oleh Sekretaris Daerah Provinsi yang berkedudukan di bawah dan bertanggungjawab kepada Gubernur.'
            }
          ]
        },
        {
          id: 3,
          title: 'Inspektorat Daerah Provinsi',
          lists: [
            {
              id: 1,
              description: 'Inspektorat Daerah Provinsi merupakan unsur pengawas penyelenggaraan Pemerintahan Daerah Provinsi.'
            },
            {
              id: 2,
              description: 'Inspektorat Daerah Provinsi dipimpin oleh Inspektur.'
            }
          ]
        },
        {
          id: 4,
          title: 'Dinas Daerah Provinsi',
          lists: [
            {
              id: 1,
              description: 'Dinas Daerah Provinsi merupakan pelaksana Urusan Pemerintahan yang menjadi kewenangan Daerah Provinsi Jawa Barat.'
            },
            {
              id: 2,
              description: 'Adapun Dinas Daerah dipimpin oleh Kepala Dinas dengan yang berkedudukan di bawah dan bertangungjawab kepada Gubernur melalui Sekretaris Daerah Provinsi.'
            }
          ]
        },
        {
          id: 4,
          title: 'Badan Daerah Provinsi',
          lists: [
            {
              id: 1,
              description: 'Badan Daerah Provinsi merupakan unsur penunjang Urusan Pemerintahan yang menjadi kewenangan Daerah Provinsi Jawa Barat.'
            },
            {
              id: 2,
              description: 'Adapun Badan Daerah dipimpin oleh Kepala Badan yang berkedudukan di bawah dan bertanggungjawab kepada Gubernur melalui Sekretaris Daerah Provinsi.'
            }
          ]
        }
      ]
    }
  }
}
</script>
