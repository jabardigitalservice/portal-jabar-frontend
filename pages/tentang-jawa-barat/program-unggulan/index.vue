<template>
  <main class="overflow-hidden">
    <Jumbotron v-bind="jumbotron">
      <template #breadcrumb>
        <Breadcrumb class="mb-6" />
      </template>
    </Jumbotron>
  </main>
</template>

<script>
export default {
  data () {
    return {
      jumbotron: {
        title: 'Program Unggulan',
        subtitle: 'Dapatkan informasi mengenai program-program unggulan dari Pemerintah Daerah Provinsi Jawa Barat.',
        backgroundImageUrl: '/images/jumbotron/default.webp'
      }
    }
  }

}
</script>
