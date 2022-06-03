<template>
  <!-- TODO: Remove this element with actual page component -->
  <main class="min-h-screen" />
</template>

<script>
export default {
  async asyncData ({ params }) {
    const tag = await params.tag
    return { tag }
  }
}
</script>
