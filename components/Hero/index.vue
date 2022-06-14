<template>
  <div class="relative">
    <HeroImage />
    <section class="flex justify-center items-center w-full absolute top-0 h-[740px]">
      <BaseContainer>
        <div
          class="flex flex-col items-center -mt-20 bg-no-repeat py-3"
          style="background-image: url('/images/hero.svg'); background-position: center top; background-size: contain;"
        >
          <h1
            class="text-white font-lora uppercase leading-normal font-bold text-center tracking-wider max-w-[40ch]
            mb-4 md:mb-6 lg:mb-12 text-[17px] sm:text-[28px] lg:text-[42px]"
          >
            Menjawab Kebutuhan Informasi Publik Warga Jawa Barat
          </h1>
          <p class="text-gray-300 font-medium leading-relaxed text-center max-w-2xl mb-4 md:mb-7 text-sm md:text-base">
            Temukan informasi publik terkini dari Pemerintahan Daerah Provinsi Jawa Barat
          </p>
          <HeroSearch />
          <HeroWidgetFeedback />
          <HeroWidgetSocialMedia />
        </div>
      </BaseContainer>
    </section>
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
