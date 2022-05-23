<template>
  <div class="relative">
    <HeroImage />
    <section class="flex justify-center items-center w-full absolute top-0 h-[740px]">
      <BaseContainer>
        <div
          class="flex flex-col items-center -mt-20 bg-no-repeat py-3"
          style="background-image: url('/images/hero.svg'); background-position: center top;"
        >
          <h1 class="text-white text-[42px] font-lora uppercase leading-normal font-bold text-center mb-12 tracking-wider">
            Menjawab Kebutuhan Informasi
            <br>
            Layanan Publik Warga Jabar
          </h1>
          <p class="text-gray-300 font-medium leading-relaxed text-center max-w-2xl mb-7">
            Temukan informasi layanan terkini dari semua Perangkat Daerah di
            Lingkungan Pemerintah Daerah Provinsi Jawa Barat.
          </p>
          <HeroSearch />
        </div>
      </BaseContainer>
    </section>
    <HeroWidgetFeedback />
    <HeroWidgetSocialMedia />
    <div class="curved" />
  </div>
</template>

<style scoped>
.curved {
  position: relative;
  background-color: #fafafa;
  z-index: 10;
  width: 120%;
  margin-top: -42px;
  margin-left: -10%;
  margin-right: 10%;
  height: 100px;
  border-radius: 200vh 200vh 0% 0% / 20vh 20vh 0% 0%;
  -moz-border-radius: 200vh 200vh 0% 0% / 20vh 20vh 0% 0%;
  -webkit-border-radius: 200vh 200vh 0% 0% / 20vh 20vh 0% 0%;
  overflow: hidden;
}
</style>
