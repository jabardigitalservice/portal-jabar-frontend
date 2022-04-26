<template>
  <main class="overflow-hidden">
    <Jumbotron v-bind="jumbotron">
      <template #breadcrumb>
        <Breadcrumb class="mb-6" />
      </template>
    </Jumbotron>
    <ProfileHighlight />
  </main>
</template>

<script>
export default {
  data () {
    return {
      jumbotron: {
        title: 'Selayang Pandang',
        subtitle: 'Ketahui segalanya tentang Jawa Barat mulai dari pemerintahan, program, hingga kondisi terkini.',
        backgroundImageUrl: '/images/jumbotron/default.webp'
      }
    }
  }
}
</script>
