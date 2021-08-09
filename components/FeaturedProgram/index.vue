<template>
  <section class="bg-gray-50 py-6">
    <div class="container">
      <div class="flex justify-between items-center">
        <h2 class="text-4xl font-medium leading-loose mb-4">
          Program Unggulan
        </h2>
        <nuxt-link to="#" class="font-bold text-green-800 hover:text-green-900">
          Selengkapnya
        </nuxt-link>
      </div>
      <ul class="grid grid-cols-3 gap-8">
        <li v-for="menu in menus" :key="menu.id" class="bg-white rounded-lg p-4 cursor-pointer hover:shadow">
          <a :href="menu.link" target="_blank" rel="noreferrer">
            <img :src="menu.icon" :alt="menu.title" class="mb-2" width="32px" height="32px">
            <h3 class="text-2xl font-medium mb-2">{{ menu.title }}</h3>
            <p class="text-gray-800 leading-7">{{ menu.description }}</p>
          </a>
        </li>
      </ul>
    </div>
  </section>
</template>

<script>
import { featuredProgramMenu } from '~/static/data/menus'

export default {
  data () {
    return {
      menus: featuredProgramMenu
    }
  }
}
</script>
