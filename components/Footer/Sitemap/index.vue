<template>
  <div class="footer-sitemap flex w-full flex-col text-white">
    <div class="flex items-start gap-3">
      <Icon src="/icons/sitemap.svg" alt="Lokasi" size="18px" class="py-1" />
      <div class="flex w-full flex-col gap-4">
        <h2 class="font-roboto font-bold leading-7">
          Sitemap
        </h2>
        <!-- Sitemap Details (Mobile Only) -->
        <details
          v-for="navigation in navigationMenu"
          :key="`details-${navigation.id}`"
          class="footer-sitemap__details lg:hidden"
        >
          <summary class="flex justify-between items-center">
            <h3 class="font-bold">
              {{ navigation.title }}
            </h3>
            <div class="footer-sitemap__toggle-icon h-6 w-6 flex items-center justify-center rounded-full hover:bg-green-600 transition-all ease-in duration-150">
              <Icon name="chevron-down" size="16px" fill="white" class="cursor-pointer" />
            </div>
          </summary>
          <ul class="grid grid-cols-1 md:grid-cols-2 mt-2 gap-2">
            <li v-for="item in navigation.items" :key="item.id">
              <Link :link="item.link" class="text-sm font-normal leading-6">
                {{ item.title }}
              </Link>
            </li>
          </ul>
        </details>
        <!-- Sitemap Details (Large Screen)  -->
        <div class="hidden lg:flex lg:justify-between lg:pr-20">
          <div
            v-for="navigation in navigationMenu"
            :key="`details-${navigation.id}`"
            class="footer-sitemap__lg "
          >
            <h3 class="font-roboto text-base leading-6 font-bold mb-2">
              {{ navigation.title }}
            </h3>
            <ul class="grid grid-rows-4 grid-flow-col-dense gap-x-8 gap-y-2">
              <li v-for="item in navigation.items" :key="item.id" class="min-w-[95px]">
                <Link :link="item.link" class="text-sm font-normal leading-6 whitespace-nowrap">
                  {{ item.title }}
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import { navigationMenu } from '~/static/data'

export default {
  data () {
    return {
      navigationMenu
    }
  }
}
</script>

<style scoped>
.footer-sitemap .footer-sitemap__details + .footer-sitemap__details {
  padding-top: 20px;
  border-top: 1px solid #1FB767;
}

.footer-sitemap .footer-sitemap__lg:not(:first-child) {
  border-left: 1px solid #1FB767;
  padding-left: 32px;
}

.footer-sitemap__details[open] .footer-sitemap__toggle-icon {
  transform: rotate(180deg);
}
</style>
