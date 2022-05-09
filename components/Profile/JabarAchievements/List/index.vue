<template>
  <ul :class="listView === 'list' ? 'flex flex-col gap-6' : 'grid grid-cols-2 gap-4'">
    <ProfileJabarAchievementsItem
      v-for="item in items"
      :key="item.id"
      :list-view="listView"
      :title="item.title"
      :appreciator="item.appreciator"
      :category="item.category"
      :description="item.description"
      :icon="item.icon"
    />
  </ul>
</template>

<script>
export default {
  props: {
    listView: {
      type: String,
      default: 'list'
    }
  },
  data () {
    return {
      items: [
        {
          id: 1,
          title: 'Anggota JDIHN terbaik tahun 2021',
          appreciator: 'Menteri Hukum dan HAM RI',
          category: 'Hukum dan HAM',
          description: 'Jaringan Dokumentasi dan Informasi Hukum (JDIH) Jabar menjadi penyedia layanan publik di bidang dokumentasi dan informasi hukum terbaik di tingkat provinsi.',
          icon: require('~/static/icons/selayang-pandang/achievement-idc-dx-awards.png')
        },
        {
          id: 2,
          title: 'Pembangunan Daerah Terbaik II',
          appreciator: 'Bappenas RI',
          category: 'Pembangunan',
          description: 'Perencanaan pembangunan yang matang serta pencapaian yang telah diraih menuntun Jabar mendapatkan Penghargaan Pembangunan Daerah.',
          icon: require('~/static/icons/selayang-pandang/icon-achievement-placeholder.svg')
        },
        {
          id: 3,
          title: 'Pemerintah Daerah Terpopuler',
          appreciator: 'Anugerah Media Humas (AMH) 2021',
          category: 'Hukum dan HAM',
          description: 'Jaringan Dokumentasi dan Informasi Hukum (JDIH) Jabar menjadi penyedia layanan publik di bidang dokumentasi dan informasi hukum terbaik di tingkat provinsi.',
          icon: require('~/static/icons/selayang-pandang/achievement-idc-dx-awards.png')
        },
        {
          id: 4,
          title: 'Best Governor',
          appreciator: 'People Of The Year 2021',
          category: 'Personal Gubernur',
          description: 'Gubernur Ridwan Kamil dinobatkan sebagai Best Governor untuk dua kategori, Healthcare & Action Against Pandemi dan E-Goverment & Digital Innovation.',
          icon: require('~/static/icons/selayang-pandang/icon-achievement-placeholder.svg')
        },
        {
          id: 5,
          title: 'Penghargaan Sumber Daya Energi & Mineral',
          appreciator: 'Gatra Apresiasi Energi (GAE) 2021',
          category: 'Sumber Daya Energi dan Mineral',
          description: 'Jabar menerima apresiasi atas peran pemerintah daerah dalam memberikan dukungan kontinuitas bagi kemajuan usaha energi di lingkup regional',
          icon: require('~/static/icons/selayang-pandang/achievement-idc-dx-awards.png')
        }
      ]
    }
  }

}
</script>
