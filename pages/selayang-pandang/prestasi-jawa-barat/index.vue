<template>
  <main class="min-h-screen">
    <section>
      <Jumbotron v-bind="jumbotron">
        <template #breadcrumb>
          <Breadcrumb class="mb-6" />
        </template>
      </Jumbotron>
    </section>
    <ProfileJabarAchievements />
  </main>
</template>

<script>
export default {
  name: 'JabarAchievements',
  data () {
    return {
      jumbotron: {
        title: 'Prestasi Jawa Barat',
        subtitle: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sem mattis massa bibendum lacus dui egestas.'
      }
    }
  }
}
</script>
