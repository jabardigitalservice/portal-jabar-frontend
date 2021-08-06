<template>
  <nav class="flex items-center">
    <MenuLink link="/" class="mr-auto">
      <img src="/logo.png" width="55" height="60" alt="Beranda">
    </MenuLink>
    <Menu>
      <MenuList
        v-for="menu in menus"
        :id="menu.id"
        :key="menu.id"
        :title="menu.title"
        @click="setActiveMenu"
      >
        <MenuItem
          :id="menu.id"
          :title="menu.title"
          :link="menu.link"
          :items="menu.items"
          :active-menu="activeMenu"
          @click="setActiveMenu"
        />
      </MenuList>
    </Menu>
  </nav>
</template>

<script>
import { navigationMenu } from '~/static/data/menus'

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
    }
  }
}
</script>
