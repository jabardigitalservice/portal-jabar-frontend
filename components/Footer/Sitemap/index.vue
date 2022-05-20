<template>
  <div class="flex w-full flex-col text-white">
    <div class="flex items-start gap-3">
      <Icon src="/icons/sitemap.svg" alt="Lokasi" size="18px" class="py-1" />
      <div class="flex w-full min-h-0 flex-col gap-4">
        <h2 class="font-roboto font-bold leading-7">
          Sitemap
        </h2>

        <!-- Sitemap Details (Mobile Only) -->
        <section class="min-w-0 flex flex-col divide-y divide-green-500 -mt-4 lg:hidden">
          <details
            v-for="navigation in navigationMenu"
            :key="`details-${navigation.id}`"
            class="py-4"
          >
            <summary class="flex justify-between items-center">
              <h3 class="font-bold">
                {{ navigation.title }}
              </h3>
              <div class="h-6 w-6 flex items-center justify-center rounded-full hover:bg-green-600 transition-all ease-in duration-150">
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
        </section>

        <!-- Sitemap Details (Large Screen)  -->
        <section
          class="min-w-0 w-11/12 hidden divide-x divide-green-500 justify-between
            lg:flex lg:-ml-8 xl:-ml-16"
        >
          <div
            v-for="navigation in navigationMenu"
            :key="`details-${navigation.id}`"
            class="px-8 xl:px-16"
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
        </section>
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
