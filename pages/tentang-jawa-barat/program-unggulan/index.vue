<template>
  <main class="overflow-hidden">
    <Jumbotron v-bind="jumbotron">
      <template #breadcrumb>
        <Breadcrumb class="mb-6" />
      </template>
    </Jumbotron>
    <FeaturedProgram />
  </main>
</template>

<script>
import FeaturedProgram from '~/components/AboutJabar/FeaturedProgram'

export default {
  components: {
    FeaturedProgram
  },
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
