<template>
  <section class="relative -top-48 lg:-top-36 z-10 -mb-44">
    <BaseContainer>
      <div class="bg-white p-4 pr-0 md:p-8 md:pr-4 lg:p-10 rounded-xl shadow">
        <h2 class="text-2xl md:text-4xl md:text-center lg:text-left font-medium leading-loose mb-8 lg:mb-12">
          Layanan Terpopuler
        </h2>
        <!-- Content Swiper (Mobile & Tablet Only) -->
        <section v-for="menu in menus" :key="menu.id" class="mb-8 lg:hidden">
          <div class="flex items-center gap-6 mb-3">
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
          <client-only>
            <swiper
              ref="swiper"
              :options="swiperOptions"
              :auto-update="true"
              :auto-destroy="true"
              :delete-instance-on-destroy="true"
              :cleanup-styles-on-destroy="true"
            >
              <swiper-slide
                v-for="(item) in menu.items"
                :key="item.id"
              >
                <li class="rounded-md w-full min-h-[130px] flex justify-start items-start p-4 pl-0">
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
                      class="opacity-40 filter grayscale"
                    />
                    <p class="font-bold text-blue-gray-600 ">
                      {{ item.title }}
                    </p>
                    <p class="text-xs leading-5 text-blue-gray-300 ">
                      {{ item.description }}
                    </p>
                  </a>
                </li>
              </swiper-slide>
            </swiper>
            <template #placeholder>
              <div class="overflow-hidden flex gap-4">
                <div v-for="i in 3" :key="i" class="w-[245px] min-h-[174px] rounded-md px-4 py-3 bg-gray-300 animate-pulse" />
              </div>
            </template>
          </client-only>
        </section>

        <!-- Content Grid (Dekstop Only) -->
        <section class="hidden lg:block lg:relative">
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
        </section>
      </div>
    </BaseContainer>
  </section>
</template>

<script>
import { mostPopularServicesMenu } from '~/static/data'

export default {
  data () {
    return {
      menus: mostPopularServicesMenu,
      swiperOptions: Object.freeze({
        slidesPerView: 1.3,
        spaceBetween: 16,
        passiveListeners: true,
        breakpoints: {
          768: {
            slidesPerView: 3
          }
        }
      })
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
