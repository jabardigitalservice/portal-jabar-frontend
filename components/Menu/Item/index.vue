<template>
  <ul v-show="isMenuActive" class="bg-green-800 w-full absolute top-full left-0 border-t border-white">
    <div class="container">
      <div
        class="flex mx-auto items-start pt-7 pb-10 bg-no-repeat"
        :style="{ backgroundImage: `url('/images/menu.svg')`, backgroundPosition: '100% 100%' }"
      >
        <div class="flex flex-col gap-7 flex-grow">
          <li>
            <MenuLink :link="link" class="text-3xl font-medium text-white leading-10">
              {{ title }}
            </MenuLink>
          </li>
          <li>
            <ul class="flex flex-wrap gap-y-10 gap-x-20">
              <li v-for="item in items" :key="item.id">
                <MenuLink v-if="item.icon" :link="item.link" class="flex gap-4 w-80 items-start">
                  <img :src="item.icon">
                  <div>
                    <h4 class="text-lg font-bold text-gray-50 whitespace-nowrap">
                      {{ item.title }}
                    </h4>
                    <p class="text-sm text-gray-100">
                      {{ item.description }}
                    </p>
                  </div>
                </MenuLink>
                <ul v-else class="flex gap-4 w-80 items-start">
                  <div>
                    <li v-if="item.title" class="text-lg font-bold text-gray-50 uppercase mb-4">
                      <MenuLink :link="item.link">
                        {{ item.title }}
                      </MenuLink>
                    </li>
                    <ul v-if="item.items.length" class="flex flex-col gap-4">
                      <li v-for="subItem in item.items" :key="subItem.id">
                        <MenuLink :link="subItem.link" class="text-lg opacity-80">
                          {{ subItem.title }}
                        </MenuLink>
                      </li>
                    </ul>
                  </div>
                </ul>
              </li>
            </ul>
          </li>
        </div>
        <div class="text-white cursor-pointer" tabindex="0" @click.stop="setActiveMenu">
          <!--
              TODO: Replace icon with icon from jabar design system
            -->
          <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
          </svg>
        </div>
      </div>
    </div>
  </ul>
</template>

<script>
export default {
  props: {
    id: {
      type: Number,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    link: {
      type: String,
      required: true
    },
    items: {
      type: Array,
      required: true
    },
    activeMenu: {
      type: Number,
      required: false,
      default: null
    }
  },
  computed: {
    isMenuActive () {
      return this.activeMenu === this.id
    }
  },
  methods: {
    setActiveMenu () {
      this.$emit('click', null)
    }
  }
}
</script>
