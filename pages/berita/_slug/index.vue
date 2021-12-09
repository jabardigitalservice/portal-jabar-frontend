<template>
  <NewsDetail :slug="slug" />
</template>

<script>
export default {
  async asyncData ({ params }) {
    const slug = await params.slug
    return { slug }
  }
}
</script>
