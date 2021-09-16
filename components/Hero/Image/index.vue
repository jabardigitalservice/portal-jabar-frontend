<template>
  <div class="h-screen">
    <Carousel :images="images" />
    <div
      class="w-full h-screen absolute top-0"
      style="background: linear-gradient(100deg, rgba(0,40,19,0.9) 0%, rgba(0,32,39,0.8) 55%);"
    />
  </div>
</template>

<script>
export default {
  computed: {
    images () {
      return [1, 2, 3].map(image => ({ source: `/images/banners/${image}.webp`, title: 'Jawa Barat' }))
    }
  }
}
</script>
