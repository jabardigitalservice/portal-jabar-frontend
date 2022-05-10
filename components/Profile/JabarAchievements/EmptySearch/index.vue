<template>
  <section class="w-full h-full flex flex-col items-center justify-center gap-8 py-8">
    <h1 class="text-center font-lora text-[21px] leading-[34px] text-blue-gray-700 font-bold">
      Mohon maaf, pencarian dengan kata kunci <br>
      <span class="text-green-800">{{ keyword }}</span>
      tidak dapat ditemukan.
    </h1>
    <!-- Illustration -->
    <img
      src="/images/search/empty-state.svg"
      width="275px"
      height="195px"
      alt="ilustrasi pencarian tidak ditemukan"
    >
    <!-- Recommendations -->
    <slot name="recommendations" />
    <section class="w-full min-w-0 flex flex-col items-center justify-center">
      <p class="font-lato font-bold text-sm leading-6 text-gray-800 mb-8">
        Rekomendasi untuk Anda
      </p>
      <div class="w-full grid grid-cols-3 gap-4">
        <ProfileJabarAchievementsItem
          v-for="item in recommendations"
          :key="item.id"
          list-view="grid"
          :title="item.title"
          :appreciator="item.appreciator"
          :category="item.category"
          :description="item.description"
          :icon="item.icon"
        />
      </div>
    </section>
  </section>
</template>

<script>
export default {
  props: {
    keyword: {
      type: [String, Number],
      required: true
    }
  },
  data () {
    return {
      recommendations: [
        {
          id: 1,
          title: 'Anggota JDIHN Terbaik Tahun 2021',
          logo: null,
          appreciator: 'Menteri Hukum dan HAM RI',
          description: 'Jaringan Dokumentasi dan Informasi Hukum (JDIH) Jabar menjadi penyedia layanan publik di bidang dokumentasi dan informasi hukum terbaik di tingkat provinsi.',
          category: 'Hukum dan HAM'
        },
        {
          id: 2,
          title: 'Best Governor',
          logo: null,
          appreciator: 'People of the Year 2021',
          description: 'Gubernur Ridwan Kamil dinobatkan sebagai Best Governor untuk dua kategori, Healthcare & Action Against Pandemi dan E-Goverment & Digital Innovation.',
          category: 'Prestasi Gubernur'
        },
        {
          id: 3,
          title: 'Penghargaan Abiwada Adara Bidang Kemanusiaan',
          logo: null,
          appreciator: 'FISIP Universitas Pasundan',
          description: 'Gubernur Ridwan Kamil menerima penghargaan Abiwada Adara Bidang Kemanusiaan terkait kontribusi nyata dalam penanganan Covid-19 di Jabar.',
          category: 'Prestasi Gubernur'
        }
      ]
    }
  }
}
</script>
