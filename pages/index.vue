<template>
  <main class="overflow-hidden">
    <Hero />
    <MostPopularServices />
    <FeaturedProgramPreview />
    <section class="pb-10">
      <BaseContainer>
        <div class="w-full grid gap-6 lg:grid-cols-7 lg:gap-8">
          <LatestNews />
          <AgendaWidget />
        </div>
      </BaseContainer>
    </section>
    <QuickLink />
  </main>
</template>

<script>
export default {
  name: 'HomePage'
}
</script>
