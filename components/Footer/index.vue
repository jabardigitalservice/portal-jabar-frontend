<template>
  <footer class="bg-green-800">
    <div class="container mx-auto">
      <div
        class="flex flex-col gap-9 pt-14 pb-12 bg-no-repeat text-white"
        :style="{ backgroundImage: `url('/images/menu.svg')`, backgroundPosition: '100% 100%' }"
      >
        <img src="/logo.svg" alt="Logo Portal Jabar" width="151" height="46">
        <div class="grid grid-cols-2">
          <FooterContact />
          <FooterMenu />
        </div>
      </div>
    </div>
    <div class="border-t border-white border-opacity-20">
      <div class="container mx-auto">
        <div class="flex justify-between py-6 text-sm leading-6">
          <p class="text-white">
            Copyright © {{ year }} Pemerintah Daerah Provinsi Jawa Barat. All Right Reserved
          </p>
          <FooterNavigation />
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  computed: {
    year () {
      return new Date().getFullYear()
    }
  }
}
</script>
