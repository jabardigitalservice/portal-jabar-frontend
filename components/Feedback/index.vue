<template>
  <div>
    <!-- Feedback Form -->
    <BaseModal :show="show">
      <!-- Form Header -->
      <template #header>
        <h1 class="font-roboto font-medium text-[21px] leading-[34px] text-green-700 px-6 py-2">
          Seberapa Puas Anda dengan Portal Jabar
        </h1>
      </template>
      <!-- Form Body -->
      <div class="p-6 overflow-y-auto">
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
            v-model="form.compliments"
            name="compliments"
            cols="30"
            rows="3"
            class="bg-gray-50 rounded-lg p-2 text-sm mb-1"
            placeholder="Masukkan jawaban Anda di sini"
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
            v-model="form.criticism"
            name="criticism"
            cols="30"
            rows="3"
            class="bg-gray-50 rounded-lg p-2 text-sm mb-1"
            placeholder="Masukkan jawaban Anda di sini"
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
            v-model="form.suggestions"
            name="suggestions"
            cols="30"
            rows="3"
            class="bg-gray-50 rounded-lg p-2 text-sm mb-1"
            placeholder="Masukkan jawaban Anda di sini"
            maxlength="1500"
          />
          <small class="text-gray-600">
            {{ getRemainingCharacters('suggestions') }} karakter tersisa
          </small>
        </div>
      </div>
      <!-- Form Footer -->
      <template #footer>
        <div class="bg-gray-50 py-4 px-6 flex justify-end items-center gap-4">
          <Button
            variant="secondary"
            @click="closeFeedbackForm"
          >
            Tutup
          </Button>
          <Button
            :disabled="!isValid"
            :style="[ !isValid && { backgroundColor: '#E0E0E0', color: '#FFFFFF' } ]"
            :loading="isLoading"
            @click="submitHandler"
          >
            Kirim Survey
          </Button>
        </div>
      </template>
    </BaseModal>

    <!-- Dialog -->
    <BaseModal
      :show="dialog.open"
      :button-label="dialog.buttonLabel"
      @close="closeModal"
    >
      <template #header>
        <h1 class="font-roboto font-medium text-[21px] leading-[34px] text-green-700 px-6 py-2">
          {{ dialog.title }}
        </h1>
      </template>
      <div class="max-w-[500px] py-4 px-6">
        <p class="text-sm text-gray-800">
          {{ dialog.body }}
        </p>
      </div>
    </BaseModal>
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
      dialog: {
        open: false,
        title: '',
        body: '',
        buttonLabel: ''
      }
    }
  },
  computed: {
    hasValue () {
      const rating = !!this.form.rating
      const compliments = !!this.form.compliments.trim()
      const criticism = !!this.form.criticism.trim()
      const suggestions = !!this.form.suggestions.trim()

      return rating && compliments && criticism && suggestions
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
      this.resetDialog()
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
    resetDialog () {
      this.dialog = {
        open: false,
        title: '',
        body: '',
        buttonLabel: ''
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
        this.dialog = {
          open: true,
          title: 'Mohon Maaf',
          body: 'Kami melihat bahwa Anda telah mengirimkan feedback baru-baru ini. Silakan kembali untuk mecoba mengirimkan feedback dalam kurun waktu 1 Jam (60 menit).',
          buttonLabel: 'OK, saya mengerti'
        }
      } else {
        const form = {
          rating: this.form.rating,
          compliments: this.form.compliments.trim(),
          criticism: this.form.criticism.trim(),
          suggestions: this.form.suggestions.trim()
        }
        try {
          this.isLoading = true
          await this.$axios.$post('/v1/feedback', form)
          this.isLoading = false
          this.dialog = {
            open: true,
            title: 'Terima kasih',
            body: 'Feedback Anda telah kami terima. Masukan Anda akan menjadi acuan kami untuk pengembangan Portal Jabar ke arah yang lebih baik.',
            buttonLabel: 'OK'
          }
          this.setLocalStorage('feedback', new Date())
        } catch (error) {
          this.isLoading = false
          this.dialog = {
            open: true,
            title: 'Mohon Maaf',
            body: 'Terjadi kesalahan pada sistem kami. Silakan coba kembali beberapa saat lagi.',
            buttonLabel: 'OK, saya mengerti'
          }
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
