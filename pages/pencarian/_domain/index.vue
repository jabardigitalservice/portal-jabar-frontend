<template>
  <main>
    <section>
      <Jumbotron v-bind="jumbotron">
        <template #breadcrumb>
          <Breadcrumb class="mb-6" />
        </template>
      </Jumbotron>
    </section>
    <SearchByDomain :domain="domain" :keyword="searchKeyword" />
  </main>
</template>

<script>
const VALID_DOMAIN = ['layanan', 'berita', 'lainnya']

export default {
  name: 'SearchByDomainPage',
  asyncData ({ params, query, redirect }) {
    if (!VALID_DOMAIN.includes(params.domain)) {
      redirect('/pencarian')
    }

    const domain = params.domain
    const searchKeyword = query.q

    return { domain, searchKeyword }
  },
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
