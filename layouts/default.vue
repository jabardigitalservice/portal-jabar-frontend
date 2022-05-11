<template>
  <div>
    <PortalTarget name="modal" />
    <Header />
    <div class="relative">
      <GPRWidget />
      <Nuxt keep-alive :keep-alive-props="{ max: 5 }" />
    </div>
    <Footer />
  </div>
</template>
