<template>
  <section class="bg-white p-16">
    <BaseContainer>
      <ul class="grid grid-cols-3 grid-rows-3 gap-x-20 gap-y-12">
        <li class="flex flex-col gap-2">
          <h2 class="text-4xl font-medium leading-loose">
            Akses Cepat
          </h2>
          <p class="text-sm text-gray-600 leading-6">
            Dapatkan kemudahaan akses ke beberapa layanan Pemerintah Provinsi Jawa Barat untuk kebutuhan Anda.
          </p>
        </li>
        <li v-for="menu in menus" :key="menu.id" class="group px-4 py-3 rounded-md hover:bg-green-50">
          <Link :link="menu.link" class="flex flex-col gap-4">
            <Icon :src="menu.icon" :alt="menu.title" width="32" height="32" />
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
