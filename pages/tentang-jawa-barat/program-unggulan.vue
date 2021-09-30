<template>
  <main>
    <Jumbotron v-bind="jumbotron" />
  </main>
</template>

<script>
export default {
  data () {
    return {
      jumbotron: {
        title: 'Program Unggulan',
        subtitle: 'Dapatkan informasi mengenai program-program unggulan dari Pemerintah Daerah Provinsi Jawa Barat.',
        backgroundImage: '/image/banner/1.webp'
      }
    }
  }

}
</script>
