<template>
  <section class="breadcrumb inline-flex">
    <template v-for="(item, index) in breadcrumbItems">
      <nuxt-link
        :key="index"
        :to="item.path"
        class="breadcrumb__item font-roboto text-sm flex items-center"
        :class="[
          item.active || isActive(item.path) ? 'font-bold text-white' : 'text-blue-400',
          items.length ? '' : 'capitalize'
        ]"
      >
        {{ truncate(item.label) }}
      </nuxt-link>
    </template>
  </section>
</template>

<script>
export default {
  name: 'Breadcrumb',
  props: {
    /**
     * Predefined array of breadcrumb items
     * Use this props to override default breadcrumb item list.
     */
    items: {
      type: Array,
      default: () => []
    },
    /**
     * Array of hidden breadcrumb item
     */
    hideItems: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    breadcrumbItems () {
      /**
       * return `items` props if defined
       */
      if (Array.isArray(this.items) && this.items.length > 0) {
        return this.items
      }

      const fullPath = this.$route.path
      const params = fullPath.substring(1).split('/')
      const crumbs = []
      let path = ''

      // Add homepage to first index of breadcrumb items
      crumbs.push({
        path: '/',
        label: 'beranda'
      })

      params.map((param) => {
        path = `${path}/${param}`

        crumbs.push({
          path,
          label: param.replace('/', '').replace(/-/g, ' ')
        })

        return null
      })

      /**
       * Remove any breadcrumb item that is defined on
       * hideItems props (if any)
       */

      if (Array.isArray(this.hideItems) && this.hideItems.length > 0) {
        const hiddenItems = this.hideItems.map(item => item.toLowerCase())

        return crumbs.filter(item => !hiddenItems.includes(item.pathName))
      }

      return crumbs
    }
  },
  methods: {
    isActive (path) {
      return path === this.$route.path
    },
    truncate (item) {
      const a = item.split(' ').slice(0, 6)

      if (a.length >= 6) {
        return a.join(' ') + '...'
      }

      return a.join(' ')
    }
  }
}
</script>

<style lang="scss" scoped>

.breadcrumb {
  &__item + &__item::before {
    content: '';
    display: inline-block;
    margin: 0 12px;
    width: 10px;
    height: 10px;
    background-image: url('/icons/arrow-right.svg');
    background-repeat: no-repeat;
    background-position: center;
  }
}
</style>
