<template>
  <div>
    <Header />
    <Nuxt keep-alive :keep-alive-props="{ max: 5 }" />
    <Footer />
  </div>
</template>
