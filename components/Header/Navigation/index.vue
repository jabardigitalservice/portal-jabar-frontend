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
        @click="setActiveMenu"
      >
        <HeaderMenuItem
          :id="menu.id"
          :title="menu.title"
          :link="menu.link"
          :items="menu.items"
          :active-menu="activeMenu"
          @click="setActiveMenu"
        />
      </HeaderMenuList>
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
  methods: {
    setActiveMenu (id) {
      this.activeMenu = id
      this.$emit('active', id)
    }
  }
}
</script>
