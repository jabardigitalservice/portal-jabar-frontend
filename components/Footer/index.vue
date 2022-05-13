<template>
  <footer class="bg-green-800">
    <BaseContainer>
      <div
        class="py-6 md:py-12 flex flex-col gap-6 md:gap-12 bg-no-repeat"
        :style="{ backgroundImage: `url('/images/menu.svg')`, backgroundPosition: '100% 100%' }"
      >
        <img src="/logo.svg" alt="Logo Portal Jabar" width="151" height="46">
        <FooterInfo />
        <FooterSitemap />
      </div>
    </BaseContainer>
    <FooterCopyright />
  </footer>
</template>
