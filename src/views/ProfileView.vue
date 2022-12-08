<template>
  <div>
    <div class="page-title">
      <h3>Account</h3>
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
        <label for="name">Name</label>
        <span
          v-if="v$.name.$dirty && v$.name.$invalid"
          class="helper-text invalid"
        >
          Enter Name
        </span>
      </div>
      <div class="switch">
        <label>
          Polish
          <input type="checkbox" />
          <span class="lever"></span>
          English
        </label>
      </div>
      <br />
      <button class="btn waves-effect waves-light" type="submit">
        Refresh
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
export default {
  mixins: [messages],
  data() {
    return {
      v$: useVuelidate(),
      name: ''
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
        await this.updateInfo({ name: this.name })
      } catch (e) {
        this.$message('error')
      }
    }
  },
  mounted() {
    this.name = this.info.name
    setTimeout(() => {
      M.updateTextFields()
    }, 0)
  }
}
</script>