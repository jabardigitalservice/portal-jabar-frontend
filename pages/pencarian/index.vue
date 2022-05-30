<template>
  <main>
    <section>
      <Jumbotron v-bind="jumbotron">
        <template #breadcrumb>
          <Breadcrumb class="mb-6" />
        </template>
      </Jumbotron>
    </section>
    <Search />
  </main>
</template>

<script>
export default {
  name: 'SearchPage',
  data () {
    return {
      jumbotron: {
        title: 'Pencarian Portal Jabar',
        subtitle: 'Temukan berbagai jenis pelayanan publik di Jawa Barat sesuai dengan kebutuhan.',
        backgroundImageUrl: '/images/jumbotron/default.webp'
      }
    }
  }
}
</script>
