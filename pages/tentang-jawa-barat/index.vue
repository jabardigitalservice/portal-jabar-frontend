<template>
  <main class="overflow-hidden">
    <Jumbotron v-bind="jumbotron">
      <template #breadcrumb>
        <Breadcrumb class="mb-6" :items="breadcrumbItems" />
      </template>
    </Jumbotron>
    <section class="w-full bg-gray-200">
      <BaseContainer class="relative -top-24 z-20">
        <div class="py-8 px-10 rounded-xl bg-white min-h-screen">
          <div class="grid grid-cols-search-container gap-6">
            <!-- Sidebar menu -->
            <aside class="p-4 border border-gray-200 rounded-xl">
              <ul v-for="menu in menus" :key="menu.id">
                <p class="text-sm font-bold text-gray-800 mb-5">
                  {{ menu.title }}
                </p>
                <li v-for="item in menu.items" :key="item.id" class="mb-5 ml-7">
                  <NuxtLink :to="item.link" class="text-sm text-gray-700 hover:text-green-700">
                    {{ item.label }}
                  </NuxtLink>
                </li>
              </ul>
            </aside>
            <!-- Content -->
            <NuxtChild />
          </div>
        </div>
      </BaseContainer>
    </section>
  </main>
</template>

<script>
export default {
  data () {
    return {
      jumbotron: {
        title: 'Tentang Jawa Barat',
        subtitle: 'Ketahui segalanya tentang Jawa Barat mulai dari pemerintahan, program, hingga kondisi terkini.',
        backgroundImageUrl: '/images/jumbotron/default.webp'
      },
      breadcrumbItems: [
        {
          path: '/',
          label: 'Beranda'
        },
        {
          path: '/tentang-jawa-barat',
          label: 'Tentang Jawa Barat',
          active: true
        }
      ],
      menus: [
        {
          id: 1,
          title: 'Tentang Jawa Barat',
          items: [
            {
              id: 1,
              label: 'Visi Misi Pemprov Jabar',
              link: '/tentang-jawa-barat/visi-misi-pemprov-jabar'
            },
            {
              id: 2,
              label: 'Lambang dan Moto',
              link: '/tentang-jawa-barat/lambang-dan-moto'
            },
            {
              id: 3,
              label: 'Sejarah Jabar',
              link: '/tentang-jawa-barat/sejarah-jabar'
            },
            {
              id: 4,
              label: 'Pimpinan Jabar',
              link: '/tentang-jawa-barat/pimpinan-jabar'
            }
          ]
        },
        {
          id: 2,
          title: 'Strukur Pemerintahan',
          items: [
            {
              id: 1,
              label: 'Struktur Perangkat Daerah',
              link: '/tentang-jawa-barat/struktur-perangkat-daerah'
            },
            {
              id: 2,
              label: 'Daftar Perangkat Daerah',
              link: '/tentang-jawa-barat/daftar-perangkat-daerah'
            }
          ]
        },
        {
          id: 3,
          title: 'Pemerintah Daerah',
          items: [
            {
              id: 1,
              label: 'Daftar Kabupaten / Kota',
              link: '/tentang-jawa-barat/daftar-kabupaten-kota'
            }
          ]
        }
      ]
    }
  }
}
</script>

<style scoped>
a.nuxt-link-active {
  @apply font-bold text-green-700
}
</style>
