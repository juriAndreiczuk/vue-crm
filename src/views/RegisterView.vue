<script setup>
import useVuelidate from '@vuelidate/core'
import {required, email, minLength} from '@vuelidate/validators'
import { reactive } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
const store = useStore()
const router = useRouter()

const state = reactive({
  email: '',
  name: '',
  password: '',
  agreements: false
})

const rules = {
  email: {email, required},
  password: {required, minLength: minLength(5)},
  name: {required, minLength: minLength(3)},
  agreements: { checked: v => v }
}

const v$ = useVuelidate(rules, state)

const onSubmit = async () => {
  const isFormCorrect = v$.value.$validate()
  if (!isFormCorrect) return
  const formData = { 
    email: state.email,
    password: state.password,
    name: state.name
  }
  try {
    await store.dispatch('register', formData)
    router.push('/login')
  } catch(e) {
    console.log(e)
  }
}
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
      <div class="input-field">
        <input 
          id="name"
          type="text"
          class="validate"
          v-model="state.name" 
          :class="{'invalid' : (v$.name.$dirty && v$.name.$invalid) || (v$.name.$dirty && v$.name.required.$invalid) }"
        />
        <label for="name">Name</label>
        <small 
          v-if="v$.name.$dirty && v$.name.required.$invalid"
          class="helper-text invalid"
        >
          Required field
        </small>
        <small 
          v-else-if="v$.name.$dirty && v$.name.$invalid"
          class="helper-text invalid"
        >
          Invalid name
      </small>
      </div>
      <p>
        <label>
          <input 
            v-model="state.agreements"
            type="checkbox" 
          />
          <span 
            :class="{'red-text' : v$.$dirty && v$.agreements.checked.$invalid}"
          >
            I agree with the rules
          </span>
        </label>
      </p>
    </div>
    <div class="card-action">
      <div>
        <button class="btn waves-effect waves-light auth-submit" type="submit">
          Registration
          <i class="material-icons right">send</i>
        </button>
      </div>

      <p class="center">
        Already have an account?
        <router-link to="/login">Enter</router-link>
      </p>
    </div>
  </form>
</template>
