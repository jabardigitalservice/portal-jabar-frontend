<template>
  <main class="overflow-hidden">
    <Jumbotron v-bind="jumbotron">
      <template #breadcrumb>
        <Breadcrumb class="mb-6" />
      </template>
    </Jumbotron>
    <section class="w-full bg-gray-200">
      <BaseContainer class="relative -top-24 z-20">
        <div class="p-3 md:p-4 lg:py-8 lg:px-10 rounded-xl bg-white min-h-screen grid grid-cols-1 gap-8 md:gap-10 xl:gap-12">
          <ProfileHighlightBanner />
          <ProfileHighlightAchievement />
          <ProfileHighlightElevenPriority />
          <ProfileHighlightContribution />
        </div>
      </BaseContainer>
    </section>
  </main>
</template>

<script>
export default {
  data () {
    return {
      jumbotron: {
        title: 'Selayang Pandang',
        subtitle: 'Ketahui segalanya tentang Jawa Barat mulai dari pemerintahan, program, hingga kondisi terkini.',
        backgroundImageUrl: '/images/jumbotron/default.webp'
      }
    }
  }
}
</script>
