<template>
  <BaseContainer class="relative -top-24 z-20">
    <div class="py-8 px-10 rounded-xl bg-white min-h-screen shadow">
      <div class="w-full min-h-screen grid grid-cols-search-container gap-6">
        <!-- TODO: Remove this dummy sidebar -->
        <section class="w-full h-full bg-gray-200" />
        <section>
          <SearchList :list-view="listView" :loading="loading" />
        </section>
      </div>
    </div>
  </BaseContainer>
</template>

<script>
export default {
  data () {
    return {
      listView: 'list',
      loading: false
    }
  }
}
</script>
