<template>
  <section class="pb-8">
    <div class="container">
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
            {{ menu.title }}
            <!--
              TODO: Replace icon with icon from jabar design system
            -->
            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd" />
            </svg>
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
