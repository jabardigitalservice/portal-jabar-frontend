<template>
  <ul v-show="isMenuActive" class="bg-green-800 w-full absolute top-full left-0 border-t border-white">
    <BaseContainer>
      <div
        class="flex mx-auto items-start pt-6 pb-10 bg-no-repeat"
        :style="{ backgroundImage: `url('/images/menu.svg')`, backgroundPosition: '100% 100%' }"
      >
        <div class="flex flex-col gap-6 flex-grow">
          <li>
            <Link :link="link" class="text-white font-roboto font-medium text-3xl leading-10" @click="setActiveMenu">
              {{ title }}
            </Link>
          </li>
          <li>
            <ul class="flex flex-wrap gap-y-10 gap-x-20">
              <li v-for="item in items" :key="item.id">
                <Link v-if="item.icon" :link="item.link" class="flex gap-4 w-80 items-start" @click="setActiveMenu">
                  <img class="py-1.5" :src="item.icon">
                  <div>
                    <h4 class="text-lg font-bold text-gray-50 whitespace-nowrap">
                      {{ item.title }}
                    </h4>
                    <p class="text-sm text-gray-50 font-roboto opacity-80">
                      {{ item.description }}
                    </p>
                  </div>
                </Link>
                <ul v-else class="flex gap-4 w-80 items-start">
                  <div>
                    <li v-if="item.title" class="text-lg font-roboto font-bold text-gray-50 uppercase mb-4">
                      <Link :link="item.link" @click="setActiveMenu">
                        {{ item.title }}
                      </Link>
                    </li>
                    <ul v-if="item.items.length" class="flex flex-col gap-4">
                      <li v-for="subItem in item.items" :key="subItem.id">
                        <Link :link="subItem.link" class="text-lg text-gray-50 font-roboto opacity-80" @click="setActiveMenu">
                          {{ subItem.title }}
                        </Link>
                      </li>
                    </ul>
                  </div>
                </ul>
              </li>
            </ul>
          </li>
        </div>
        <div class="cursor-pointer" tabindex="0" @click.stop="setActiveMenu">
          <Icon name="times" size="24px" class="text-white" />
        </div>
      </div>
    </BaseContainer>
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
