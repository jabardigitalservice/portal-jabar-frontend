<template>
  <section class="pt-6 pb-16">
    <div class="container">
      <h2 class="text-4xl font-medium leading-loose mb-4 text-center">
        Akses Cepat
      </h2>
      <ul class="grid grid-cols-4 gap-4">
        <li v-for="menu in menus" :key="menu.id" class="p-4 rounded-md cursor-pointer hover:shadow-md">
          <a :href="menu.link" target="_blank" rel="noreferrer">
            <img :src="menu.icon" :alt="menu.title" width="32" height="32" class="mb-2">
            <div class="flex gap-2 items-center mb-2">
              <span class="text-lg font-medium">{{ menu.title }}</span>
              <Icon name="open-new-tab" size="14px" class="text-green-800" />
            </div>
            <p class="text-sm text-gray-600 leading-normal">{{ menu.description }}</p>
          </a>
        </li>
      </ul>
    </div>
  </section>
</template>

<script>
import { quickLinkMenu } from '~/static/data/menus'

export default {
  data () {
    return {
      menus: quickLinkMenu
    }
  }
}
</script>
