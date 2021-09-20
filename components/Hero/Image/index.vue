<template>
  <div class="h-screen">
    <Carousel :items="items" />
    <div
      class="w-full h-screen absolute top-0"
      style="background: linear-gradient(100deg, rgba(0,40,19,0.9) 0%, rgba(0,32,39,0.8) 55%);"
    />
  </div>
</template>

<script>
export default {
  computed: {
    items () {
      return [1, 2, 3].map(item => ({ image: `/images/banners/${item}.webp`, title: 'Jawa Barat' }))
    }
  }
}
</script>
