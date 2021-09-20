<template>
  <div class="relative">
    <HeroImage />
    <section class="flex justify-center items-center h-screen w-full absolute top-0">
      <div
        class="container mx-auto flex flex-col items-center -mt-20 bg-no-repeat py-3"
        style="background-image: url('/images/hero.svg'); background-position: center top;"
      >
        <h1
          class="text-white font-lora uppercase leading-snug font-bold text-center max-w-3xl mb-11 tracking-wider"
          style="font-size: 40px;"
        >
          Satu Portal untuk Semua Hal Tentang Jawa Barat
        </h1>
        <p class="text-white font-medium leading-relaxed text-center max-w-2xl mb-7">
          Portal ini menyediakan informasi resmi, akses ke berbagai layanan publik, dan tempat
          menyampaikan aspirasi mengenai program dari Pemerintah Daerah Provinsi Jawa Barat.
        </p>
        <HeroSearch />
      </div>
    </section>
    <HeroWidgetFeedback />
    <HeroWidgetSocialMedia />
    <div class="curved" />
  </div>
</template>

<style scoped>
.curved {
  position: relative;
  background-color: #FAFAFA;
  z-index: 10;
  width: 120%;
  margin-top: -50px;
  margin-left: -10%;
  margin-right: 10%;
  height: 100px;
  border-radius: 200vh 200vh 0% 0% / 20vh  20vh 0% 0%;
  -moz-border-radius: 200vh 200vh 0% 0% / 20vh  20vh 0% 0%;
  -webkit-border-radius: 200vh 200vh 0% 0% / 20vh  20vh 0% 0%;
  overflow: hidden;
}
</style>
