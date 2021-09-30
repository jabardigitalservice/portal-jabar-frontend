<template>
  <section
    class="relative w-full bg-blue-800"
    :style="jumbotronStyle"
  >
    <div class="overlay" />
    <div class="relative container mx-auto py-32 z-10">
      <slot name="breadcrumb">
        <div class="mb-6">
          <!--
            TODO: create Breadcrumb component
           -->
          <p>Breadcrumb > Breadcrumb</p>
        </div>
      </slot>
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
    },

    /**
     * Jumbotron background image url.
     * Refering to `static` folder.
     */
    backgroundImageUrl: {
      type: [String],
      required: false,
      default: '/images/banners/1.webp'
    }
  },

  computed: {
    jumbotronStyle () {
      return {
        backgroundImage: `url('${this.backgroundImageUrl}')`,
        backgroundPosition: 'center center'
      }
    }
  }
}
</script>

<style lang="scss" scoped>

.overlay {
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  background: radial-gradient(100% 2589.12% at 0% 0%, rgba(0, 40, 19, 0.98) 0%, rgba(0, 32, 39, 0.9) 100%);
}

</style>
