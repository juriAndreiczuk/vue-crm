<script setup>
import { useVuelidate } from '@vuelidate/core'
import { required, email, minLength} from '@vuelidate/validators'
import messages from '@/utils/messages'
import { useMessage } from '@/use/message'
import { reactive, onMounted } from 'vue'
import { useStore } from 'vuex'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const store = useStore()

const state = reactive({
  email: '',
  password: ''
})

const rules = {
  email: { required, email },
  password: { required, minLength: minLength(5) }
}

const v$ = useVuelidate(rules, state)

const onSubmit = async () =>  {
  const isFormCorrect = await v$.value.$validate()
  if (!isFormCorrect) return false
  const formData = { 
    email: state.email,
    password: state.password
  }
  try {
    const login = await store.dispatch('login', formData)
    store.dispatch('getUid')
    router.push('/')
  } catch (e) { }
}

onMounted(() => {
  if(messages[route.query.message]) {
    useMessage(messages[route.query.message])
  }
})
</script>

<template>
  <form class="card auth-card" @submit.prevent="onSubmit">
    <div class="card-content">
      <span class="card-title">Home crm</span>
      <div class="input-field">
        <input
          id="email"
          type="text"
          v-model.trim="state.email"
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
          v-model="state.password"
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
