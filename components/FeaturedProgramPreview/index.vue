<template>
  <section class="py-14">
    <BaseContainer>
      <div class="flex flex-col md:flex-row items-center gap-1 md:gap-4 mb-8">
        <h2 class="font-medium text-2xl md:text-4xl leading-loose">
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

      <!-- Content Swiper (Mobile and Tablet Only) -->
      <div class="lg:hidden">
        <client-only>
          <swiper
            ref="swiper"
            :options="swiperOptions"
            :auto-update="true"
            :auto-destroy="true"
            :delete-instance-on-destroy="true"
            :cleanup-styles-on-destroy="true"
            class="!-mr-6 md:!mr-0"
          >
            <swiper-slide
              v-for="menu in menus"
              :key="menu.id"
              class="!w-[fit-content]"
            >
              <div
                class="w-[275px] h-[253px] md:w-[400px] md:h-[230px] lg:w-full lg:h-full flex flex-col gap-4 group
              bg-white p-6 rounded-lg border border-white hover:border-blue-gray-50 hover:shadow"
              >
                <LazyImg :src="menu.icon" :alt="menu.title" width="32" height="32" />
                <h3 class="font-bold text-xl md:text-2xl leading-normal group-hover:text-green-800">
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
              </div>
            </swiper-slide>
          </swiper>

          <template #placeholder>
            <div class="flex w-[fit-content] overflow-x-hidden gap-4">
              <div v-for="i in 3" :key="i" class="w-[275px] h-[253px] md:w-[400px] md:h-[230px] rounded-xl bg-gray-300 animate-pulse" />
            </div>
          </template>
        </client-only>
      </div>

      <!-- Content Grid (Desktop Only) -->
      <ul class="hidden lg:grid lg:grid-cols-3 lg:gap-8">
        <li
          v-for="menu in menus"
          :key="menu.id"
          class="flex flex-col gap-4 group bg-white p-6 rounded-lg border border-white hover:border-blue-gray-50 hover:shadow"
        >
          <LazyImg :src="menu.icon" :alt="menu.title" width="32" height="32" />
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
    </BaseContainer>
  </section>
</template>

<script>
import { featuredProgramMenu } from '~/static/data'

export default {
  data () {
    return {
      menus: featuredProgramMenu,
      swiperOptions: Object.freeze({
        slidesPerView: 'auto',
        spaceBetween: 16,
        mousewheel: true,
        passiveListeners: true
      })
    }
  }
}
</script>
