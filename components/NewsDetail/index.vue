<template>
  <main>
    <article>
      <NewsDetailHeader :news="news" />
    </article>
  </main>
</template>

<script>
export default {
  data () {
    return {
      news: {}
    }
  },
  head () {
    return {
      title: this.news.title,
      meta: [
        {
          hid: 'title',
          name: 'title',
          content: this.news.title
        },
        {
          hid: 'description',
          name: 'description',
          content: this.news.excerpt
        }
      ]
    }
  }
}
</script>
