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
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M11.3397 0.660095C10.8998 0.220059 10.3698 0 9.75002 0H2.24998C1.63025 0 1.10021 0.220059 0.660095 0.660095C0.220059 1.10021 0 1.63022 0 2.24998V9.74994C0 10.3696 0.220059 10.8997 0.660095 11.3398C1.10021 11.7799 1.63025 12 2.24998 12H9.74994C10.3697 12 10.8997 11.7799 11.3396 11.3398C11.7797 10.8997 11.9998 10.3697 11.9998 9.74994V2.24998C11.9998 1.63022 11.7797 1.10013 11.3397 0.660095ZM9.99996 6.24996C9.99996 6.46871 9.89825 6.62227 9.69524 6.71087C9.62762 6.7369 9.56227 6.74992 9.49989 6.74992C9.3594 6.74992 9.24217 6.70037 9.14834 6.6015L8.02342 5.47652L3.85174 9.64845C3.75266 9.74734 3.63557 9.7969 3.50012 9.7969C3.36461 9.7969 3.24742 9.74734 3.14847 9.64845L2.35161 8.85145C2.25264 8.75267 2.20313 8.63525 2.20313 8.49991C2.20313 8.36463 2.25264 8.24737 2.35161 8.14848L6.52354 3.9765L5.39853 2.85152C5.23703 2.70048 5.20061 2.51829 5.2891 2.30466C5.3776 2.10159 5.53133 1.99994 5.75007 1.99994H9.49991C9.63531 1.99994 9.75253 2.04947 9.85165 2.14847C9.95051 2.24736 9.99999 2.36459 9.99999 2.50001V6.24996H9.99996Z" fill="#099449" />
              </svg>
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
