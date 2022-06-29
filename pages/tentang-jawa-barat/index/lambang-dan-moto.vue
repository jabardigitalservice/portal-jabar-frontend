<template>
  <section>
    <div class="mb-9">
      <h2 class="font-lora font-bold text-green-700 text-[28px] md:text-4xl text-center md:text-left leading-[56px] mb-4">
        Lambang dan Moto
      </h2>
      <p class="text-sm leading-6 text-blue-gray-800 mb-8">
        Lambang Jawa Barat secara keseluruhan adalah sebuah perisai berbentuk bulat telur dengan hiasan pita di bagian bawahnya yang berisikan motto Jawa Barat. Bentuk bulat telur pada lambang Jawa Barat berasal dari bentuk perisai sebagai penjagaan diri.
      </p>
      <div class="banner">
        <div class="banner__overlay" />
        <img class="banner__logo" src="/images/about/logo.svg" width="260" height="268" alt="Logo Jawa Barat">
      </div>
    </div>
    <div class="mb-12 lg:mb-16">
      <h3 class="md:p-6 font-lora font-bold text-2xl md:text-[26px] text-center md:text-left text-blue-gray-700 mb-6 md:mb-0">
        Makna Logo
      </h3>
      <ul class="grid md:grid-cols-2 logo-items">
        <li
          v-for="item in logoItems"
          :key="item.id"
          class="min-h-[159px] p-6 flex flex-col-reverse md:flex-row gap-6
          md:odd:border-r md:border-b md:last-of-type:border-b-0"
        >
          <div>
            <p class="font-roboto font-bold text-green-700 mb-2">
              {{ item.title }}
            </p>
            <p class="text-sm text-blue-gray-600 leading-6">
              {{ item.description }}
            </p>
          </div>
          <div class="h-12 md:h-28 flex justify-start md:justify-center items-center flex-shrink-0 mb-4 md:mb-0">
            <Icon
              :src="item.icon"
              :alt="item.title"
            />
          </div>
        </li>
      </ul>
    </div>
    <div class="p-4 md:p-6 bg-gray-100 rounded-2xl">
      <h3 class="font-lora font-bold text-[26px] text-center md:text-left text-blue-gray-700 mb-6">
        Makna Warna
      </h3>
      <ul class="grid gap-4 md:grid-cols-3">
        <li v-for="color in colors" :key="color.id" class="p-4 lg:p-6 rounded-xl flex flex-col xl:flex-row gap-6 bg-white">
          <div
            class="w-[26px] h-[26px] rounded-full flex-shrink-0"
            :style="{ backgroundColor: color.hex, border: `1px solid ${color.border}` }"
          />
          <div>
            <p class="text-green-700 font-bold font-roboto mb-2">
              {{ color.title }}
            </p>
            <p class="font-lato text-sm leading-6 text-blue-gray-600">
              {{ color.description }}
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
      logoItems: [
        {
          id: 1,
          title: 'Padi',
          description: 'Melambangkan bahan makanan pokok masyarakat Jawa Barat dengan 17 butir gabah melambangkan tanggal hari kemerdekaan Republik Indonesia',
          icon: require('~/static/icons/lambang-dan-moto/padi.svg')
        },
        {
          id: 2,
          title: 'Kapas Satu Tangkai',
          description: 'Melambangkan kesuburan sandang, dengan 8 kuntum bunga menggambarkan bulan proklamasi Republik Indonesia',
          icon: require('~/static/icons/lambang-dan-moto/kapas.svg')
        },
        {
          id: 3,
          title: 'Kujang',
          description: 'Merupakan alat serbaguna yang selama ini dianggap senjata khas masyarakat Sunda. Pada salah satu sisi “kujang” tersebut terdapat lima buah lubang yang melambangkan lima dasar pokok negara “Pancasila”',
          icon: require('~/static/icons/lambang-dan-moto/kujang.svg')
        },
        {
          id: 4,
          title: 'Gunung',
          description: 'Melambangkan bahwa sebagian besar wilayah Jawa Barat adalah daerah pegunungan',
          icon: require('~/static/icons/lambang-dan-moto/gunung.svg')
        },
        {
          id: 5,
          title: 'Sungai',
          description: 'Melambangkan terusan, saluran, dan laut yang menjadi ciri alam Jawa Barat',
          icon: require('~/static/icons/lambang-dan-moto/sungai.svg')
        },
        {
          id: 6,
          title: 'Petak - Petak di Bawah Gunung',
          description: 'Melambangkan lahan pertanian berupa sawah, ladang, dan perkebunan sebagai kekayaan alam Jawa Barat',
          icon: require('~/static/icons/lambang-dan-moto/petak.svg')
        },
        {
          id: 7,
          title: 'Dam/Bendungan',
          description: 'Melambangkan kegiatan di bidang irigasi yang merupakan salah satu perhatian pokok Jawa Barat sebagai daerah agraris',
          icon: require('~/static/icons/lambang-dan-moto/bendungan.svg')
        }
      ],
      colors: [
        {
          id: 1,
          title: 'Hijau',
          description: 'Melambangkan kesuburan dan kemakmuran tanah Jawa Barat',
          hex: '#009B4C'
        },
        {
          id: 2,
          title: 'Biru',
          description: 'Melambangkan ketentraman atau kedamaian',
          hex: '#00A2E9'
        },
        {
          id: 3,
          title: 'Kuning',
          description: 'Melambangkan keagungan, kemuliaan dan kekayaan',
          hex: '#FFF000'
        },
        {
          id: 4,
          title: 'Hitam',
          description: 'Melambangkan keteguhan dan keabadian',
          hex: '#000000'
        },
        {
          id: 5,
          title: 'Merah',
          description: 'Melambangkan keberanian',
          hex: '#E62129'
        },
        {
          id: 6,
          title: 'Putih',
          description: 'Melambangkan keagungan, kemuliaan dan kekayaan',
          hex: '#FFFFFF',
          border: '#BDBDBD'
        }
      ]
    }
  }
}
</script>

<style scoped>
.banner {
  position: relative;
  width: 100%;
  height: 344px;
  border-radius: 18px;
  background-image: url('/images/about/background.png'); background-position: center top; background-size: cover; background-repeat: no-repeat;
}
.banner__overlay {
  width: 100%;
  height: 344px;
  border-radius: 18px;
  background: linear-gradient(180deg, rgba(7, 33, 0, 0.6) 0%, rgba(5, 27, 0, 0.9) 100%);
}
.banner__logo {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
@media screen and (min-width: 1024px) {
  .logo-items > li:nth-child(odd) {
    border-right: 1px solid #e5e7eb;
  }
  .logo-items > li:nth-child(odd):not(:nth-last-child(-n+2)) {
    border-bottom: 1px solid #e5e7eb;
  }
  .logo-items > li:nth-child(even):not(:nth-last-child(-n+1)) {
    border-bottom: 1px solid #e5e7eb;
  }
}
</style>
