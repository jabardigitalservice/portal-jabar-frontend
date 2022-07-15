<template>
  <div class="navigation__sidebar top-12 sm:top-16 left-0 right-0 bottom-0 fixed bg-green-primary z-50 border-t border-green-500 lg:hidden">
    <BaseContainer class="h-full">
      <div class="navigation__sidebar__container py-4 w-full h-full flex flex-col overflow-y-auto">
        <section class="min-w-0 flex flex-col">
          <details
            v-for="navigation in navigationMenu"
            :id="`sidebar-menu-${navigation.id}`"
            :key="`details-${navigation.id}`"
            class="navigation__sidebar__menu py-4 text-white transition-all ease-in duration-150"
            @click="closeOtherMenu(`sidebar-menu-${navigation.id}`)"
          >
            <summary class="flex justify-between items-center cursor-pointer">
              <h3>
                {{ navigation.title }}
              </h3>
              <div class="navigation__sidebar__button h-6 w-6 flex items-center justify-center rounded-full hover:bg-green-600">
                <Icon name="chevron-down" size="16px" fill="white" class="cursor-pointer transition-transform ease-in" />
              </div>
            </summary>
            <ul class="flex flex-col mt-3 gap-6 pl-6 py-3 border-l-2 border-green-500">
              <li v-for="item in navigation.items" :key="item.id">
                <Link :link="item.link" class="text-sm font-normal leading-6">
                  {{ item.title }}
                </Link>
              </li>
            </ul>
          </details>
        </section>
        <section class="mt-auto pt-4 border-t border-green-500">
          <div class="flex items-start gap-3 mb-4">
            <Icon src="/icons/network.svg" alt="Lokasi" size="20px" class="py-1" />
            <div class="flex-1 flex flex-col gap-2 text-white">
              <p class="font-bold mb-4 text-base">
                Media Sosial
              </p>
              <div class="w-full flex justify-between">
                <a
                  v-for="socialMediaSite in socialMediaSites"
                  :key="socialMediaSite.id"
                  :href="socialMediaSite.link"
                  target="_blank"
                  :aria-label="socialMediaSite.name"
                  rel="noreferrer"
                  class="p-2 flex justify-center items-center rounded border border-white border-opacity-20 text-base"
                >
                  <Icon :name="socialMediaSite.icon" size="18px" />
                </a>
              </div>
            </div>
          </div>
          <p class="font-lato text-sm font-normal leading-6 text-white text-center">
            Copyright © {{ year }} Pemerintah Daerah Provinsi Jawa Barat. All Right Reserved
          </p>
        </section>
      </div>
    </BaseContainer>
  </div>
</template>

<script>
import { navigationMenu, socialMediaSites } from '~/static/data'

export default {
  data () {
    return {
      navigationMenu,
      socialMediaSites
    }
  },
  computed: {
    year () {
      return new Date().getFullYear()
    }
  },
  methods: {
    closeOtherMenu (id) {
      // select all sidebar menu except the element with id of `id`
      const sidebarMenus = [...document.querySelectorAll('.navigation__sidebar__menu')]
        .filter(el => el.id !== id)

      sidebarMenus.forEach(element => element.removeAttribute('open'))
    }
  }
}
</script>

<style>
/* Hide default details marker */
.navigation__sidebar__menu summary::-webkit-details-marker {
  display:none;
}

.navigation__sidebar__menu[open] summary {
  font-weight: bold;
}

@keyframes details-show {
  from {
    opacity:0;
  }
  to {
    opacity: 1;
  }
}

.navigation__sidebar__menu[open] summary ~ * {
  animation: details-show 300ms ease-in;
}

.navigation__sidebar__menu[open] .navigation__sidebar__button > * {
  transform: rotate(-180deg);
}

/* Hide scrollbar for Chrome, Safari and Opera */
.navigation__sidebar__container::-webkit-scrollbar {
  display: none;
}

/* Hide scrollbar for IE, Edge and Firefox */
.navigation__sidebar__container {
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
}
</style>
