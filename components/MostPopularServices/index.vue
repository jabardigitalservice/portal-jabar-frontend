<template>
  <section class="relative -top-36 z-10 -mb-44">
    <BaseContainer>
      <div class="bg-white p-10 rounded-xl shadow">
        <h2 class="text-4xl font-medium leading-loose mb-12">
          Layanan Terpopuler
        </h2>
        <div class="relative">
          <div class="grid grid-cols-3 gap-x-14 mb-8">
            <div
              v-for="menu in menus"
              :key="menu.id"
              class="flex items-center gap-6 px-4"
            >
              <Icon :src="menu.icon" size="56px" :alt="menu.name" />
              <div>
                <p class="font-roboto font-bold text-sm tracking-wide uppercase text-blue-gray-300 mb-1">
                  Untuk
                </p>
                <p class="font-roboto text-3xl font-bold">
                  {{ menu.name }}
                </p>
              </div>
            </div>
          </div>
          <div class="divide divide-left" />
          <ul class="grid grid-cols-3 grid-rows-3 grid-flow-col gap-x-14 gap-y-7">
            <template v-for="menu in menus">
              <li
                v-for="item in menu.items"
                :key="item.id"
                class="rounded-md flex justify-start items-start px-4 py-3 group hover:bg-green-50"
              >
                <a
                  :href="item.link"
                  target="_blank"
                  rel="noreferrer"
                  class="w-full flex flex-col gap-1"
                >
                  <Icon
                    :src="item.icon"
                    size="24px"
                    :alt="item.title"
                    class="opacity-40 filter grayscale group-hover:grayscale-0 group-hover:opacity-100"
                  />
                  <p class="font-bold text-blue-gray-600 group-hover:text-green-800">
                    {{ item.title }}
                  </p>
                  <p class="text-xs leading-5 text-blue-gray-300 group-hover:text-blue-gray-800">
                    {{ item.description }}
                  </p>
                </a>
              </li>
            </template>
          </ul>
          <div class="divide divide-right" />
        </div>
      </div>
    </BaseContainer>
  </section>
</template>

<script>
import { mostPopularServicesMenu } from '~/static/data'

export default {
  data () {
    return {
      menus: mostPopularServicesMenu
    }
  }
}
</script>

<style scoped>
.divide {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 1px;
  height: 80%;
  border: none;
  background-color: #EEEEEE;
}
.divide-left {
  left: 32.5%;
}
.divide-right {
  right: 32.5%;
}
</style>
