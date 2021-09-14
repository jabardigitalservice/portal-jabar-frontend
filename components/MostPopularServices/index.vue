<template>
  <section class="bg-white pb-8">
    <div class="container mx-auto">
      <h2 class="text-4xl font-medium leading-loose mb-4">
        Layanan Terpopuler
      </h2>
      <div class="grid grid-cols-3 gap-x-8 mb-5">
        <div v-for="(category, index) in categories" :key="index">
          <p class="text-sm font-medium tracking-wide uppercase text-gray-600 mb-1">
            Untuk
          </p>
          <p class="text-3xl text-gray-900 capitalize font-medium">
            {{ category }}
          </p>
        </div>
      </div>
      <ul class="grid grid-cols-3 grid-rows-3 grid-flow-col gap-x-8 gap-y-2">
        <li v-for="menu in menus" :key="menu.id" class="bg-green-800 rounded-md text-white text-lg flex items-center">
          <a :href="menu.link" target="_blank" rel="noreferrer" class="p-4 w-full flex justify-between items-center">
            <span>{{ menu.title }}</span>
            <Icon name="arrow-right" size="14px" class="text-white" />
          </a>
        </li>
      </ul>
    </div>
  </section>
</template>

<script>
import { mostPopularServicesMenu } from '~/static/data/menus'

export default {
  data () {
    return {
      categories: ['Wargi', 'Usaha', 'Wisatawan'],
      menus: mostPopularServicesMenu
    }
  }
}
</script>
