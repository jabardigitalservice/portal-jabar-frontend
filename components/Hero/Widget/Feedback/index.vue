<template>
  <div>
    <div class="absolute h-[700px] top-0 -left-11 flex flex-col justify-center" @click="toggleFeedbackForm">
      <div class="transform -rotate-90 group cursor-pointer">
        <div class="bg-white bg-opacity-5 backdrop-filter backdrop-blur-sm flex justify-center items-center gap-4 pl-3 pr-4 py-3 rounded-br-lg rounded-bl-lg border-l border-b border-transparent hover:bg-opacity-10 hover:border-white hover:border-opacity-10">
          <Icon src="/icons/feedback.svg" alt="Umpan balik" size="20px" class="transform rotate-90" />
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
