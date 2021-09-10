<template>
  <section class="py-12">
    <div class="container mx-auto">
      <div class="flex items-center gap-4 mb-4">
        <h2 class="font-medium text-4xl leading-loose">
          Program Unggulan
        </h2>
        <div class="flex-1 flex justify-center flex-col text-center">
          <div class="border-b border-gray-300" />
        </div>
        <Link link="/tentang-jawa-barat/program-unggulan" tabindex="-1">
          <Button type="button" variant="secondary">
            Lihat Semua Program
            <Icon name="open-new-tab" size="14px" />
          </Button>
        </Link>
      </div>
      <ul class="grid grid-cols-3 gap-8">
        <li
          v-for="menu in menus"
          :key="menu.id"
          class="flex flex-col gap-4 group bg-white p-6 rounded-lg border border-white hover:border-blue-gray-50 hover:shadow"
        >
          <img :src="menu.icon" :alt="menu.title" width="32px" height="32px">
          <h3 class="font-bold text-2xl leading-normal group-hover:text-green-800">
            {{ menu.title }}
          </h3>
          <p class="text-sm leading-6 text-gray-600 group-hover:text-blue-gray-800">
            {{ menu.description }}
          </p>
          <Link :link="menu.link" class="self-start">
            <Button type="button" variant="tertiary-paddingless" tabindex="-1">
              Selengkapnya
              <Icon name="arrow-right" size="14px" />
            </Button>
          </Link>
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
