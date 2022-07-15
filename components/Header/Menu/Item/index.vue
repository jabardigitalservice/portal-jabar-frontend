<template>
  <section class="bg-green-primary w-full absolute top-full left-0 border-t border-green-400">
    <BaseContainer>
      <div
        class="flex mx-auto items-start pt-6 pb-10 bg-no-repeat"
        :style="{ backgroundImage: `url('/images/menu.svg')`, backgroundPosition: '100% 100%' }"
      >
        <div class="flex flex-col gap-8 flex-grow">
          <Link :link="link" class="text-white font-roboto font-medium text-3xl leading-10">
            {{ title }}
          </Link>
          <nav
            class="grid grid-cols-3 grid-rows-2 gap-y-6 gap-x-20"
            :class="{ 'grid-flow-col': items.length <= 3}"
          >
            <li v-for="item in items" :key="item.id">
              <Link :link="item.link" class="flex gap-4 items-start">
                <img
                  class="py-1.5"
                  :src="item.icon"
                  width="52"
                  height="52"
                  :alt="item.title"
                >
                <div>
                  <h4 class="text-lg font-bold text-gray-50 whitespace-nowrap">
                    {{ item.title }}
                  </h4>
                  <p class="text-sm text-gray-50 font-roboto opacity-80">
                    {{ item.description }}
                  </p>
                </div>
              </Link>
            </li>
          </nav>
        </div>
        <div class="cursor-pointer" tabindex="0" @click.stop="$emit('close')">
          <Icon name="times" size="24px" class="text-white" />
        </div>
      </div>
    </BaseContainer>
  </section>
</template>

<script>
export default {
  props: {
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
    }
  }
}
</script>
