<template>
  <nav class="flex items-center">
    <Link link="/" class="mr-auto w-8 h-8 lg:w-[60px] lg:h-[60px]">
      <img src="/logo.png" width="55" height="60" alt="Beranda">
    </Link>
    <HeaderMenu class="hidden lg:flex">
      <HeaderMenuList
        v-for="menu in menus"
        :id="menu.id"
        :key="menu.id"
        :title="menu.title"
        @click="clickDropdownMenu(menu)"
      />
      <transition name="fade" mode="out-in">
        <HeaderMenuItem
          v-if="activeMenu"
          :title="menuItems.title"
          :link="menuItems.link"
          :items="menuItems.items"
          @close="closeDropdownMenu(activeMenu)"
        />
      </transition>
    </HeaderMenu>
    <HeaderMenuMobile class="lg:hidden" />
  </nav>
</template>

<script>
import { navigationMenu } from '~/static/data'

export default {
  data () {
    return {
      menus: navigationMenu,
      activeMenu: null
    }
  },
  computed: {
    menuItems () {
      return this.menus.filter(menu => menu.id === this.activeMenu)[0]
    }
  },
  watch: {
    $route () {
      this.setActiveMenu(null)
    }
  },
  methods: {
    setActiveMenu (id) {
      this.activeMenu = id
      this.$emit('active', id)
    },
    closeDropdownMenu (activeMenu) {
      // active menu title get menu title based on index
      const activeMenuTitle = this.menus[activeMenu - 1].title
      this.setActiveMenu(null)
      this.gtagCloseMenu(activeMenuTitle)
    },
    clickDropdownMenu (menu) {
      this.setActiveMenu(menu.id)
      this.gtagDropdownMenu(menu.title)
    },
    gtagDropdownMenu (title) {
      this.$gtag.event('click', {
        event_category: 'click_dropdown_menu',
        event_label: `Click Dropdown Menu ${title}`,
        value: title
      })
    },
    gtagCloseMenu (title) {
      this.$gtag.event('click', {
        event_category: 'click_close_menu',
        event_label: `Click Close Menu ${title}`,
        value: title
      })
    }
  }
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  @apply transition-opacity ease-brand duration-250 opacity-100;
}

.fade-enter,
.fade-leave-to {
  @apply opacity-0;
}
</style>
