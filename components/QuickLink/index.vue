<template>
  <section class="bg-white py-4 md:p-4 xl:p-16">
    <BaseContainer>
      <ul class="grid md:grid-cols-3 md:grid-rows-[auto,1fr,1fr] lg:grid-rows-3 md:gap-x-6 lg:gap-x-20 gap-y-6 lg:gap-y-12">
        <li class="md:row-start-1 md:col-start-1 md:col-end-4 lg:row-start-auto lg:col-start-auto lg:col-end-auto flex flex-col gap-2 lg:gap-6">
          <h2 class="text-2xl text-center lg:text-left md:text-4xl font-medium leading-loose">
            Akses Cepat
          </h2>
          <p class="text-center lg:text-left text-sm text-gray-600 leading-6">
            Dapatkan kemudahaan akses ke beberapa layanan Pemerintah Provinsi Jawa Barat untuk kebutuhan Anda.
          </p>
        </li>
        <li v-for="menu in menus" :key="menu.id" class="group px-4 py-3 rounded-md hover:bg-green-50">
          <Link :link="menu.link" class="flex flex-col gap-4">
            <LazyImg :src="menu.icon" :alt="menu.title" width="32" height="32" />
            <p class="font-roboto font-bold group-hover:text-green-800">
              {{ menu.title }}
            </p>
            <p class="text-sm text-gray-600 leading-6 group-hover:text-blue-gray-800 focus:outline-none">
              {{ menu.description }}
            </p>
          </Link>
        </li>
      </ul>
    </BaseContainer>
  </section>
</template>

<script>
import { quickLinkMenu } from '~/static/data'

export default {
  data () {
    return {
      menus: quickLinkMenu
    }
  }
}
</script>
