<template>
  <div>
    <div class="page-title">
      <h3>{{ localizeFilter('profileTitle') }}</h3>
    </div>
    <form class="form" @submit.prevent="onSubmit">
      <div class="input-field">
        <input
          type="text"
          v-model="name"
          :class="{
            invalid: v$.name.$dirty && v$.name.required.$invalid
          }"
        />
        <label for="name">{{ localizeFilter('Name') }}</label>
        <span
          v-if="v$.name.$dirty && v$.name.$invalid"
          class="helper-text invalid"
        >
          {{ localizeFilter('EnterName') }}
        </span>
      </div>
      <div class="switch">
        <label>
          Polish
          <input type="checkbox" v-model="isEnLocale" />
          <span class="lever"></span>
          English
        </label>
      </div>
      <br />
      <button class="btn waves-effect waves-light" type="submit">
        {{ localizeFilter('Refresh') }}
        <i class="material-icons right">send</i>
      </button>
    </form>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { useVuelidate } from '@vuelidate/core'
import { required } from '@vuelidate/validators'
import messages from '@/utils/messages'
import localize from '@/mixins/localize'
export default {
  mixins: [messages, localize],
  data() {
    return {
      v$: useVuelidate(),
      name: '',
      isEnLocale: true
    }
  },
  computed: {
    ...mapGetters(['info'])
  },
  validations() {
    return {
      name: { required }
    }
  },
  methods: {
    ...mapActions(['updateInfo']),
    async onSubmit() {
      const isFormCorrect = await this.v$.$validate()
      if (!isFormCorrect) return false
      try {
        await this.updateInfo({
          name: this.name,
          locale: this.isEnLocale ? 'en-EN' : 'pl-PL'
        })
      } catch (e) {
        this.$message('error')
      }
    }
  },
  mounted() {
    this.name = this.info.name
    this.isEnLocale = this.info.locale === 'en-EN'
    setTimeout(() => {
      M.updateTextFields()
    }, 0)
  }
}
</script>