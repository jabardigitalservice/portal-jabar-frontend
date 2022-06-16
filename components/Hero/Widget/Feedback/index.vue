<template>
  <div class="w-full max-w-xl">
    <div
      class="flex flex-col mt-6 md:mt-0 md:absolute md:h-[740px] md:top-0 md:-left-11"
      @click="toggleFeedbackForm"
    >
      <div class="group cursor-pointer md:relative md:top-[225px] md:transform md:-rotate-90">
        <div
          class="bg-white bg-opacity-5 backdrop-filter backdrop-blur-sm flex justify-center items-center gap-4 pl-3 pr-4 py-3 rounded-lg border-l border-b border-transparent
          md:rounded-tr-none md:rounded-tl-none hover:bg-opacity-10 hover:border-white hover:border-opacity-10"
        >
          <Icon
            src="/icons/feedback.svg"
            alt="Umpan balik"
            size="20px"
            class="transform md:rotate-90"
          />
          <p class="whitespace-nowrap text-white text-opacity-80 tracking-wide">
            Isi Survey
          </p>
        </div>
      </div>
    </div>
    <Feedback :show="isFeedbackFormOpen" @close="toggleFeedbackForm" />
  </div>
</template>

<script>
export default {
  data () {
    return {
      isFeedbackFormOpen: false
    }
  },
  methods: {
    toggleFeedbackForm () {
      this.isFeedbackFormOpen = !this.isFeedbackFormOpen
    }
  }
}
</script>
