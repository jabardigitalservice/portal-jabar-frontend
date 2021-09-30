<template>
  <div>
    <Modal
      :show="show"
      header="Seberapa Puas Anda dengan Portal Jabar"
      @close="closeFeedbackForm"
    >
      <form @submit.prevent="submitHandler">
        <div class="p-6">
          <div class="flex flex-col mb-5">
            <label class="text-sm leading-6 text-gray-800 mb-2">
              Seberapa Puas Anda dengan Portal Jabar
            </label>
            <div class="flex gap-7">
              <JdsRadioButtonGroup
                :items="ratingOptions"
                placeholder-key="label"
                name="radio-button-group"
                orientation="horizontal"
                @change="setFormRating"
              />
            </div>
          </div>
          <div class="flex flex-col mb-5">
            <label id="compliments" class="text-sm leading-6 text-gray-800 mb-2">
              Apa yang menurut Anda paling bermanfaat dari Portal Jabar?
            </label>
            <textarea
              id="compliments"
              v-model.trim="form.compliments"
              name="compliments"
              cols="30"
              rows="3"
              class="bg-gray-50 rounded-lg p-2 text-sm mb-1"
              placeholder="Masukkan jawaban Anda disini"
              maxlength="1500"
            />
            <small class="text-gray-600">
              {{ getRemainingCharacters('compliments') }} karakter tersisa
            </small>
          </div>
          <div class="flex flex-col mb-5">
            <label id="criticism" class="text-sm leading-6 text-gray-800 mb-2">
              Apa yang perlu diperbaiki dari Portal Jabar?
            </label>
            <textarea
              id="criticism"
              v-model.trim="form.criticism"
              name="criticism"
              cols="30"
              rows="3"
              class="bg-gray-50 rounded-lg p-2 text-sm mb-1"
              placeholder="Masukkan jawaban Anda disini"
              maxlength="1500"
            />
            <small class="text-gray-600">
              {{ getRemainingCharacters('criticism') }} karakter tersisa
            </small>
          </div>
          <div class="flex flex-col mb-5">
            <label id="suggestions" class="text-sm leading-6 text-gray-800 mb-2">
              Apakah yang perlu Portal Jabar sediakan untuk kebutuhan pengguna?
            </label>
            <textarea
              id="suggestions"
              v-model.trim="form.suggestions"
              name="suggestions"
              cols="30"
              rows="3"
              class="bg-gray-50 rounded-lg p-2 text-sm mb-1"
              placeholder="Masukkan jawaban Anda disini"
              maxlength="1500"
            />
            <small class="text-gray-600">
              {{ getRemainingCharacters('suggestions') }} karakter tersisa
            </small>
          </div>
        </div>
        <div class="bg-gray-50 py-4 flex justify-center items-center">
          <Button
            type="submit"
            :disabled="!isValid"
            :style="[ !isValid && { backgroundColor: '#E0E0E0', color: '#FFFFFF' } ]"
            :loading="isLoading"
          >
            Kirim Survey
          </Button>
        </div>
      </form>
    </Modal>
    <Modal
      :show="openedModal === 'success'"
      header="Terima kasih"
      body="Feedback Anda telah kami terima. Masukan Anda akan menjadi acuan kami untuk pengembangan Portal Jabar ke arah yang lebih baik."
      label="OK"
      @close="closeModal"
    />
    <Modal
      :show="openedModal === 'not-allowed'"
      header="Mohon Maaf"
      body="Kami melihat bahwa Anda telah mengirimkan feedback baru-baru ini. Silakan kembali untuk mecoba mengirimkan feedback dalam kurun waktu 1 Jam (60 menit)."
      label="OK, saya mengerti"
      @close="closeModal"
    />
    <Modal
      :show="openedModal === 'error'"
      header="Mohon Maaf"
      body="Terjadi kesalahan pada sistem kami. Silakan coba kembali beberapa saat lagi."
      label="OK, saya mengerti"
      @close="closeModal"
    />
  </div>
</template>

<script>
import { hoursDifference } from '~/utils/date'

export default {
  props: {
    show: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  data () {
    return {
      form: {
        rating: null,
        compliments: '',
        criticism: '',
        suggestions: ''
      },
      isLoading: false,
      ratingOptions: [
        { label: '1', value: 1 },
        { label: '2', value: 2 },
        { label: '3', value: 3 },
        { label: '4', value: 4 },
        { label: '5', value: 5 }
      ],
      openedModal: ''
    }
  },
  computed: {
    hasValue () {
      return !!this.form.rating && !!this.form.compliments && !!this.form.criticism && !!this.form.suggestions
    },
    isValid () {
      return this.hasValue
    }
  },
  methods: {
    getRemainingCharacters (label) {
      return 1500 - this.form[label].length
    },
    setFormRating (value) {
      this.form.rating = value
    },
    closeFeedbackForm () {
      this.$emit('close')
      this.resetFormInput()
    },
    closeModal () {
      this.closeFeedbackForm()
      this.resetFormInput()
      this.openedModal = ''
    },
    resetFormInput () {
      this.form = {
        rating: null,
        compliments: '',
        criticism: '',
        suggestions: ''
      }
    },
    isAllowed () {
      const lastSubmitted = this.getLocalStorage('feedback')

      if (lastSubmitted) {
        return hoursDifference(lastSubmitted) > 0
      }

      return true
    },
    getLocalStorage (key) {
      return localStorage.getItem(key)
    },
    setLocalStorage (key, value) {
      localStorage.setItem(key, value)
    },
    async submitHandler () {
      if (!this.isAllowed()) {
        this.openedModal = 'not-allowed'
      } else {
        try {
          this.isLoading = true
          await this.$axios.$post('/v1/feedback', this.form)
          this.isLoading = false
          this.openedModal = 'success'
          this.setLocalStorage('feedback', new Date())
        } catch (error) {
          this.isLoading = false
          this.openedModal = 'error'
        }
      }
    }
  }
}
</script>

<style scoped>
textarea:focus {
  outline: none;
  box-shadow: inset 0px 0px 0px 1px #069550, inset 0px 0px 0px 2px #FFC800;
}
</style>
