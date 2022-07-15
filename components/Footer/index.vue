<template>
  <footer class="bg-green-primary">
    <BaseContainer>
      <div
        class="py-6 md:py-12 flex flex-col gap-6 md:gap-12 bg-no-repeat"
        :style="{ backgroundImage: `url('/images/menu.svg')`, backgroundPosition: '100% 100%' }"
      >
        <Link link="/" class="w-[fit-content]">
          <div class="flex items-center gap-4">
            <img src="/logo.png" alt="Logo Jawa Barat" width="65" height="76">
            <div>
              <p class="text-white text-lg font-roboto">
                Pemerintah Daerah Provinsi
              </p>
              <p class="font-medium text-lg text-white font-roboto">
                Jawa Barat
              </p>
            </div>
          </div>
        </Link>
        <FooterInfo />
        <FooterSitemap />
      </div>
    </BaseContainer>
    <FooterCopyright />
  </footer>
</template>
