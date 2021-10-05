<template>
  <main class="overflow-hidden relative">
    <Jumbotron v-bind="jumbotron">
      <template #breadcrumb>
        <Breadcrumb class="mb-6" />
      </template>
    </Jumbotron>
    <Agenda />
  </main>
</template>

<script>
export default {
  data () {
    return {
      jumbotron: {
        title: 'Agenda Jawa Barat',
        subtitle: 'Cari tahu tentang agenda dan kegiatan terkini dari pemerintah provinsi maupun organisasi pemerintah daerah di Jawa Barat.',
        backgroundImageUrl: '/images/jumbotron/default.webp'
      }
    }
  }
}
</script>
