<template>
  <section>
    <h2 class="font-lora font-bold text-green-700 text-4xl mb-2 leading-[56px]">
      Visi Misi Pemerintahan Provinsi Jawa Barat <br> 2018-2023
    </h2>
    <div class="grid grid-cols-2 items-center gap-8 xl:gap-12 p-8 mb-8">
      <div class="p-0 overflow-hidden w-full h-[222px] rounded-xl aspect-w-16 aspect-h-9">
        <img src="/images/about/visi.png" alt="Visi Jawa Barat" width="398" height="222" class="object-cover">
      </div>
      <blockquote>
        <h3 class="font-lora font-bold text-green-700 text-[28px] mb-4">
          Visi
        </h3>
        <q class="font-bold">Terwujudnya Jawa Barat Juara Lahir Batin Dengan Inovasi dan Kolaborasi</q>
        <p class="text-sm">
          Nilai religius, bahagia, adil, kolaboratif dan inovatif
        </p>
      </blockquote>
    </div>
    <div class="bg-gray-100 p-8 rounded-2xl mb-8">
      <div class="flex items-center gap-12 xl:mb-16">
        <div>
          <h3 class="font-lora font-bold text-green-700 text-[28px] mb-4">
            Misi Pembangunan Jawa Barat
          </h3>
          <ol class="list-decimal">
            <li>
              <strong>Membentuk manusia pancasila yang bertaqwa</strong><br>
              <span class="text-sm">melalui peningkatan peran masjid dan tempat ibadah sebagai pusat peradaban, dengan sasaran misi yaitu pesantren juara, masjid juara, dan ulama juara.</span>
            </li>
            <li>
              <strong>Melahirkan manusia yang berbudaya, berkualitas, bahagia dan produktif melalui peningkatan pelayanan publik yang inovatif</strong><br>
              <span class="text-sm">dengan sasaran misi yaitu kesehatan juara, perempuan juara, olahraga juara, budaya juara, sekolah juara, guru juara, ibu juara, millennial juara, perguruan tinggi juara, dan smk juara.</span>
            </li>
            <li>
              <strong>Mempercepat pertumbuhan dan pemerataan pembangunan berbasis lingkungan dan tata ruang yang berkelanjutan melalui peningkatan konektivitas wilayah dan penataan daerah</strong><br>
              <span class="text-sm">dengan sasaran misi yaitu transportasi juara, logistik juara, gerbang desa juara, kota juara, pantura juara, pansela juara, dan energi juara.</span>
            </li>
          </ol>
        </div>
        <div class="py-4 overflow-hidden w-full h-[422px] aspect-w-9 aspect-h-16 rounded-xl hidden xl:block">
          <img src="/images/about/misi.png" alt="Misi Jawa Barat" width="308" height="422" class="object-cover">
        </div>
      </div>
      <div class="flex items-center gap-12">
        <div class="py-4 overflow-hidden w-full h-[336px] aspect-w-4 aspect-h-3 rounded-xl hidden xl:block">
          <img src="/images/about/misi-2.png" alt="Misi Jawa Barat" width="308" height="336" class="object-cover">
        </div>
        <div>
          <ol class="list-decimal start-4">
            <li>
              <strong>Meningkatkan produktivitas dan daya saing ekonomi umat yang sejahtera dan adil melalui pemanfaatan teknologi digital dan kolaborasi dengan pusat-pusat inovasi serta pelaku pembangunan</strong><br>
              <span class="text-sm">dengan sasaran misi yaitu nelayan juara, pariwisata juara, lingkungan juara, kelola sampah juara, tanggap bencana juara, ekonomi kreatif juara, buruh juara, industri juara, pasar juara, petani juara, umat juara, umkm juara, dan wirausaha juara.</span>
            </li>
            <li>
              <strong>Mewujudkan tata kelola pemerintahan yang inovatif dan kepemimpinan yang kolaboratif antara pemerintahan pusat, provinsi, dan kabupaten/kota</strong><br>
              <span class="text-sm">dengan sasaran misi yaitu birokrasi juara, APBD juara, ASN juara, dan BUMD juara.</span>
            </li>
          </ol>
        </div>
      </div>
    </div>
    <div class="p-8">
      <h3 class="text-blue-gray-800 text-[28px] font-bold font-lora text-center mb-8">
        <strong>Program Unggulan</strong><br>
        <span class="text-blue-gray-400 text-[22px]">Provinsi Jawa Barat 2018-2023</span>
      </h3>
      <ul class="grid grid-cols-2 xl:grid-cols-3 gap-3">
        <li
          v-for="program in featuredPrograms"
          :key="program.id"
          class="bg-white min-h-[158px] p-[14px] border border-[#DFE6F0] rounded-xl"
        >
          <div class="flex justify-center mb-2">
            <img
              :src="program.icon"
              :alt="program.title"
              width="32"
              height="32"
            >
          </div>
          <div class="h-[90px] flex items-center justify-center">
            <p class="font-lato text-sm leading-6 text-blue-gray-400 text-center">
              {{ program.title }}
            </p>
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
      featuredPrograms: [
        {
          id: 1,
          title: 'Meningkatkan akses pendidikan untuk semua',
          icon: require('~/static/icons/selayang-pandang/icon-prioritas-pembangunan-kesehatan.svg')
        },
        {
          id: 2,
          title: 'Desentralisasi pelayanan kesehatan',
          icon: require('~/static/icons/selayang-pandang/icon-prioritas-pembangunan-kesehatan.svg')
        },
        {
          id: 3,
          title: 'Meningkatkan pertumbuhan ekonomi berbasis inovasi',
          icon: require('~/static/icons/selayang-pandang/icon-prioritas-pembangunan-kesehatan.svg')
        },
        {
          id: 4,
          title: 'Mengembangkan destinasi dan infrastruktur pariwisata',
          icon: require('~/static/icons/selayang-pandang/icon-prioritas-pembangunan-kesehatan.svg')
        },
        {
          id: 5,
          title: 'Mewujudkan pesantren juara',
          icon: require('~/static/icons/selayang-pandang/icon-prioritas-pembangunan-kesehatan.svg')
        },
        {
          id: 6,
          title: 'Meningkatkan infrastruktur konektifitas wilayah',
          icon: require('~/static/icons/selayang-pandang/icon-prioritas-pembangunan-kesehatan.svg')
        },
        {
          id: 7,
          title: 'Gerakan membangun desa',
          icon: require('~/static/icons/selayang-pandang/icon-prioritas-pembangunan-kesehatan.svg')
        },
        {
          id: 8,
          title: 'Memberikan subsidi gratis untuk golongan ekonomi lemah',
          icon: require('~/static/icons/selayang-pandang/icon-prioritas-pembangunan-kesehatan.svg')
        },
        {
          id: 9,
          title: 'Meningkatkan inovasi pelayanan publik dan penataan daerah',
          icon: require('~/static/icons/selayang-pandang/icon-prioritas-pembangunan-kesehatan.svg')
        }
      ]
    }
  }
}
</script>

<style scoped>
ol {
  counter-reset: item;
  margin-left: 0;
  padding-left: 0;
}
ol.start-4 {
  counter-reset: item 3;
}
ol > li {
  display: block;
  margin-bottom: .5em;
  margin-left: 3em;
}
ol > li::before {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  background-color: red;
  border-radius: 100px;
  content: counter(item) "";
  counter-increment: item;
  width: 2em;
  margin-left: -3em;
  margin-right: 1em;
  font-size: 14px;
  padding: 4px;
  background-color: #069550;
  color: #FFFFFF;
}
</style>
