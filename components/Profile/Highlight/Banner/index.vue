<template>
  <section class="min-h-[384px] bg-green-700 rounded-xl grid grid-cols-2 items-center gap-x-14">
    <div class="pl-8 py-4">
      <p class="font-lora font-bold text-[28px] text-white line-clamp-1">
        Di Balik Layar
      </p>
      <h1 class="font-lora font-bold text-[40px] text-white mb-4 leading-[54px] line-clamp-2">
        Provinsi Jawa Barat Yang Responsif
      </h1>
      <p class="text-white text-sm leading-[23px] mb-4 line-clamp-2">
        Simak siapa saja yang turut andil dalam menjadikan Provinsi Jawa Barat, menjadi Provinsi yang responsif dan Juara Lahir Batin.
      </p>
      <Link link="#" tabindex="-1">
        <Button class="banner-button" type="button" variant="primary">
          Lihat di sini
          <Icon name="open-new-tab" size="14px" />
        </Button>
      </Link>
    </div>
    <div class="relative w-full h-full px-12 py-14 overflow-hidden">
      <ProfileHighlightBannerBackground />
      <div
        class="w-full h-[278px] rounded-xl relative ml-4 overflow-hidden aspect-w-16 aspect-h-9"
      >
        <img
          src="/images/banners/profile-highlight/behind-the-scene.webp"
          class="object-cover"
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
