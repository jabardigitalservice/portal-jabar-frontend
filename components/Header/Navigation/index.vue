<template>
  <nav class="flex items-center">
    <Link link="/" class="mr-auto">
      <img src="/logo.png" width="55" height="60" alt="Beranda">
    </Link>
    <HeaderMenu>
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
