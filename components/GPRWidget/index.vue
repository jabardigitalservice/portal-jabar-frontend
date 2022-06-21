<template>
  <div
    class="gpr-widget h-full w-full absolute z-[40] select-none"
    :class="isOpen ? 'pointer-events-auto' : 'pointer-events-none'"
    @click.self="toggleOpen"
  >
    <div
      class="gpr-widget__container sticky top-[190px] grid grid-cols-[350px,auto] max-w-max mb-6
      transition-transform ease-in duration-150"
      :class="{ 'gpr-widget__container--open' : isOpen }"
    >
      <div class="w-[350px] py-1 bg-[#262879] rounded-lg overflow-hidden">
        <div
          id="gpr-kominfo-widget-container"
          class="h-[450px] overflow-y-auto pointer-events-auto"
        />
      </div>
      <div
        class="self-center relative left-[-55px] bg-[#262879] rounded-br-lg rounded-bl-lg
        text-white pointer-events-auto transform -rotate-90 cursor-pointer"
        @click="toggleOpen"
      >
        <div class="flex items-center gap-6 p-4">
          <div class="bg-[#1D1F69] flex rounded-full items-center justify-center p-1">
            <Icon
              name="chevron-down"
              class="transform ease-in duration-150"
              size="14px"
              fill="white"
              :class="isOpen ? 'rotate-180' : 'rotate-0'"
            />
          </div>
          <p class="text-sm font-medium whitespace-nowrap">
            GPR Widget
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      isOpen: false
    }
  },
  head () {
    return {
      script: [
        {
          hid: 'text/javascript"',
          src: 'https://widget.kominfo.go.id/gpr-widget-kominfo.min.js',
          defer: true
        }
      ]
    }
  },
  methods: {
    toggleOpen () {
      this.isOpen = !this.isOpen
    }
  }
}
</script>

<style scoped>
.gpr-widget .gpr-widget__container {
  transform: translateX(-350px);
}

.gpr-widget .gpr-widget__container--open  {
  transform: translateX(0);
}

/* Hide scrollbar for Chrome, Safari and Opera */
#gpr-kominfo-widget-container::-webkit-scrollbar {
  display: none;
}

/* Hide scrollbar for IE, Edge and Firefox */
#gpr-kominfo-widget-container {
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
}
</style>
