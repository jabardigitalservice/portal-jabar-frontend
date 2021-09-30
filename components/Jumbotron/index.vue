<template>
  <section class="w-full bg-blue-800">
    <div class="container mx-auto py-32">
      <v-slot name="breadcrumb">
        <div class="mb-6">
          <p>Breadcrumb > Breadcrumb</p>
        </div>
      </v-slot>
      <h1 class="font-lora font-bold text-3xl leading-relaxed text-green-500 mb-2">
        {{ title }}
      </h1>
      <h2 class="font-lato font-normal text-md text-black leading-2 text-white">
        {{ subtitle }}
      </h2>
    </div>
  </section>
</template>

<script>
export default {
  name: 'Jumbotron',
  props: {
    /**
     * Jumbotron title
     */
    title: {
      type: [String, Number],
      required: false,
      default: ''
    },
    /**
     * Jumbotron subtitle
     */
    subtitle: {
      type: [String, Number],
      required: false,
      default: ''
    }
  },
  data () {
    return {}
  }
}
</script>

<style>

</style>
