<template>
  <main class="overflow-hidden">
    <Jumbotron v-bind="jumbotron">
      <template #breadcrumb>
        <Breadcrumb class="mb-6" :items="breadcrumbItems" />
      </template>
    </Jumbotron>
    <section class="w-full bg-gray-200">
      <BaseContainer class="relative -top-24 z-20">
        <div class="p-3 md:p-6 lg:py-8 lg:px-10 rounded-xl bg-white min-h-screen">
          <div class="about__jabar w-full grid grid-cols-1 lg:grid-cols-[268px,auto] gap-6">
            <!-- Submenu Swiper (Mobile and Tablet Only) -->
            <div
              v-on-clickaway="closeDropdown"
              class="h-[42px] overflow-hidden lg:hidden"
            >
              <swiper
                v-show="isSwiperReady"
                :auto-update="true"
                :auto-destroy="true"
                :delete-instance-on-destroy="true"
                :cleanup-styles-on-destroy="true"
                class="w-full"
                @ready="isSwiperReady = true"
              >
                <swiper-slide
                  v-for="(menu, index) in menus"
                  :key="menu.id"
                  class="!w-[fit-content]"
                >
                  <div
                    class="relative min-w-[200px] h-[42px] px-4 flex gap-4 items-center justify-between border-b-2"
                    :class="activeMenuIndex === index ? 'border-green-800' : 'border-transparent'"
                    @click="toggleDropdown(index)"
                  >
                    <p
                      class="font-bold"
                      :class="activeMenuIndex === index ? 'text-green-800' : 'text-gray-500'"
                    >
                      {{ menu.title }}
                    </p>
                    <Icon
                      name="chevron-down"
                      size="16px"
                      class="transition-all ease-brand duration-250"
                      :class="[
                        activeMenuIndex === index ? 'text-green-800' : 'text-gray-500',
                        activeMenuIndex === index && isDropdownOpen ? '-rotate-180' : 'rotate-0'
                      ]"
                    />
                  </div>
                </swiper-slide>
              </swiper>
              <JdsPopover
                :value="isDropdownOpen"
                :options="popoverOptions"
                class="w-full"
              >
                <template #activator>
                  <div class="w-full" />
                </template>
                <JdsPopoverDropdown class="p-3">
                  <div v-for="item in menus[activeMenuIndex].items" :key="item.id">
                    <NuxtLink :to="item.link" class="text-sm text-gray-700 hover:text-green-700">
                      {{ item.label }}
                    </NuxtLink>
                  </div>
                </JdsPopoverDropdown>
              </JdsPopover>
            </div>

            <!-- Sidebar menu (Dekstop Only) -->
            <aside class="hidden lg:block p-4 border border-gray-200 rounded-xl h-[fit-content]">
              <ul v-for="menu in menus" :key="menu.id">
                <p class="text-sm font-bold text-gray-800 mb-5">
                  {{ menu.title }}
                </p>
                <li v-for="item in menu.items" :key="item.id" class="mb-5 ml-7">
                  <NuxtLink :to="item.link" class="text-sm text-gray-700 hover:text-green-700">
                    {{ item.label }}
                  </NuxtLink>
                </li>
              </ul>
            </aside>
            <!-- Content -->
            <NuxtChild />
          </div>
        </div>
      </BaseContainer>
    </section>
  </main>
</template>

<script>
import { directive as onClickaway } from 'vue-clickaway'

export default {
  directives: {
    onClickaway
  },
  data () {
    return {
      jumbotron: {
        title: 'Tentang Jawa Barat',
        subtitle: 'Ketahui segalanya tentang Jawa Barat mulai dari pemerintahan, program, hingga kondisi terkini.',
        backgroundImageUrl: '/images/jumbotron/default.webp'
      },
      breadcrumbItems: [
        {
          path: '/',
          label: 'Beranda'
        },
        {
          path: '/tentang-jawa-barat',
          label: 'Tentang Jawa Barat',
          active: true
        }
      ],
      menus: [
        {
          id: 1,
          title: 'Tentang Jawa Barat',
          items: [
            {
              id: 1,
              label: 'Visi Misi Pemprov Jabar',
              link: '/tentang-jawa-barat/visi-misi-pemprov-jabar'
            },
            {
              id: 2,
              label: 'Lambang dan Moto',
              link: '/tentang-jawa-barat/lambang-dan-moto'
            },
            {
              id: 3,
              label: 'Sejarah Jabar',
              link: '/tentang-jawa-barat/sejarah-jabar'
            },
            {
              id: 4,
              label: 'Pimpinan Jabar',
              link: '/tentang-jawa-barat/pimpinan-jabar'
            }
          ],
          open: false
        },
        {
          id: 2,
          title: 'Strukur Pemerintahan',
          items: [
            {
              id: 1,
              label: 'Struktur Perangkat Daerah',
              link: '/tentang-jawa-barat/struktur-perangkat-daerah'
            },
            {
              id: 2,
              label: 'Daftar Perangkat Daerah',
              link: '/tentang-jawa-barat/daftar-perangkat-daerah'
            }
          ],
          open: false
        },
        {
          id: 3,
          title: 'Pemerintah Daerah',
          items: [
            {
              id: 1,
              label: 'Daftar Kabupaten / Kota',
              link: '/tentang-jawa-barat/daftar-kabupaten-kota'
            }
          ],
          open: false
        }
      ],
      popoverOptions: {
        strategy: 'fixed',
        placement: 'bottom-start',
        modifiers: [
          {
            name: 'offset',
            options: { offset: [0, -4] }
          },
          {
            name: 'sameWidth',
            enabled: true,
            fn: ({ state }) => {
              state.styles.popper.width = `${state.rects.reference.width}px`
            },
            phase: 'beforeWrite',
            requires: ['computeStyles']
          }
        ]
      },
      activeMenuIndex: 0,
      isSwiperReady: false,
      isDropdownOpen: false
    }
  },
  methods: {
    toggleDropdown (index) {
      if (this.activeMenuIndex !== index) {
        this.activeMenuIndex = index
        this.isDropdownOpen = true
      } else {
        this.isDropdownOpen = !this.isDropdownOpen
      }
    },
    closeDropdown () {
      this.isDropdownOpen = false
    }
  }
}
</script>

<style>
.about__jabar .jds-popover__activator {
  width: 100% !important;
}

.about__jabar a.nuxt-link-active {
  @apply font-bold text-green-700;
}

.about__jabar .jds-popover-dropdown__body {
  @apply grid grid-cols-1 gap-4;
}
</style>
