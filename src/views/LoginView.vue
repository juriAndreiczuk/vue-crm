<template>
  <form class="card auth-card" @submit.prevent="onSubmit">
    <div class="card-content">
      <span class="card-title">Home crm</span>
      <div class="input-field">
        <input
          id="email"
          type="text"
          v-model.trim="email"
          :class="{
            'invalid' : (v$.email.$dirty && v$.email.$invalid) || (v$.email.$dirty && v$.email.required.$invalid)
          }
          "
        />
        <label for="email">Email</label>
        <small 
          v-if="v$.email.$dirty && v$.email.required.$invalid"
          class="helper-text invalid"
        >
          Required field
      </small>
        <small 
          v-else-if="v$.email.$dirty && v$.email.$invalid"
          class="helper-text invalid"
        >
          Invalid email
      </small>
      </div>
      <div class="input-field">
        <input 
          id="password"
          type="password" 
          v-model="password"
          :class="{'invalid' : (v$.password.$dirty && v$.password.$invalid) || (v$.password.$dirty && v$.password.required.$invalid) }"
        />
        <label for="password">Password</label>
        <small 
          v-if="v$.password.$dirty && v$.password.required.$invalid"
          class="helper-text invalid"
        >
          Required field
        </small>
        <small 
          v-else-if="v$.password.$dirty && v$.password.$invalid"
          class="helper-text invalid"
        >
          Invalid password
      </small>
      </div>
    </div>
    <div class="card-action">
      <div>
        <button class="btn waves-effect waves-light auth-submit" type="submit">
          Enter
          <i class="material-icons right">send</i>
        </button>
      </div>

      <p class="center">
        Don't have an account?
        <router-link to="/register">Registration</router-link>
      </p>
    </div>
  </form>
</template>

<script>
  import { useVuelidate } from '@vuelidate/core'
  import { required, email, minLength} from '@vuelidate/validators'
  import messages from '@/utils/messages'

  export default {
    name: 'login',
    data() {
      return {
        v$: useVuelidate(),
        email: '',
        password: ''
      }
    },
    validations() {
      return {
        email: { required, email },
        password: { required, minLength: minLength(5) }
      }
    },
    methods: {
      async onSubmit () {
        const isFormCorrect = await this.v$.$validate()
        if (!isFormCorrect) return
        const formData = { 
          email: this.email,
          password: this.password
        }
        try {
          await this.$store.dispatch('login', formData)
          this.$router.push('/')
          this.$store.dispatch('getUid')
        } catch (e) { }
      }
    },
    mounted() {
      if(messages[this.$route.query.message]) {
        this.$message(messages[this.$route.query.message])
      }
    }
  }
</script>