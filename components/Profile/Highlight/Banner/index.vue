<template>
  <section class="min-h-[288px] lg:h-[371px] lg:max-h-[371px] bg-green-700 rounded-xl grid grid-cols-1 md:grid-cols-2 items-center md:gap-x-0 lg:gap-x-12">
    <div class="flex flex-col justify-center p-4 md:px-6 xl:px-8 xl:py-12">
      <p class="font-lora font-bold text-2xl md:text-xl xl:text-[28px] text-center md:text-left text-white xl:mb-4">
        Dibalik Layar
      </p>
      <h1 class="font-lora font-bold text-2xl md:text-xl lg:text-[34px] xl:text-[40px] text-center md:text-left text-white mb-4 lg:leading-[54px] lg:max-w-[20ch] line-clamp-2">
        Provinsi Jawa Barat yang Responsif
      </h1>
      <p class="text-white text-sm leading-[23px] text-center md:text-left mb-4 md:line-clamp-3 lg:max-w-[60ch]">
        Simak siapa saja yang turut andil dalam menjadikan Provinsi Jawa Barat, menjadi Provinsi yang responsif dan Juara Lahir Batin.
      </p>
      <Link link="#" tabindex="-1">
        <Button
          class="banner-button w-full md:w-auto"
          type="button"
          variant="primary"
        >
          Tonton Sekarang
          <Icon name="open-new-tab" size="14px" />
        </Button>
      </Link>
    </div>
    <div class="hidden w-full h-full p-4 md:px-6 xl:px-8 xl:py-12 md:flex items-center justify-end relative overflow-hidden">
      <ProfileHighlightBannerBackground />
      <div class="hidden aspect-w-16 aspect-h-9 xl:aspect-w-2 xl:aspect-h-1 md:block w-full max-w-[513px] rounded-xl overflow-hidden">
        <img
          src="/images/banners/profile-highlight/behind-the-scene.webp"
          class="object-cover max-w-full max-h-full"
          width="513"
          height="278"
          alt="Di balik layar"
        >
      </div>
    </div>
  </section>
</template>

<style>
.banner-button.jds-button--primary {
  background-color: #FFFFFF;
  color: #069550;
}
.banner-button.jds-button--primary:hover {
  background-color: #FAFAFA;
  color: #008444;
}
</style>
