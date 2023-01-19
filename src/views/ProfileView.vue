<script setup>
import { onMounted, reactive } from 'vue'
import { useStore } from 'vuex'
import { useVuelidate } from '@vuelidate/core'
import { required } from '@vuelidate/validators'
import { useMessage } from '@/use/message'

const store = useStore()

const state = reactive({
  name: '',
  isEnLocale: true
})
const rules = {
  name: { required }
}
const v$ = useVuelidate(rules, state)

const onSubmit = async () => {
  const isFormCorrect = await v$.value.$validate()
  if (!isFormCorrect) return false
  try {
    await store.dispatch('updateInfo', {
      name: state.name,
      locale: state.isEnLocale ? 'en-EN' : 'pl-PL'
    })
  } catch (e) {
    useMessage('error')
  }
}

onMounted(() => {
  state.name = store.getters.info.name
  state.isEnLocale = store.getters.info.locale === 'en-EN'
  setTimeout(() => {
    M.updateTextFields()
  }, 0)
})
</script>

<template>
  <div>
    <div class="page-title">
      <h3></h3>
    </div>
    <form class="form" @submit.prevent="onSubmit">
      <div class="input-field">
        <input
          type="text"
          v-model="state.name"
          :class="{
            invalid: v$.name.$dirty && v$.name.required.$invalid
          }"
        />
        <label for="name">Name</label>
        <span
          v-if="v$.name.$dirty && v$.name.$invalid"
          class="helper-text invalid"
        >
          EnterName 
        </span>
      </div>
      <div class="switch">
        <label>
          Polish
          <input type="checkbox" v-model="state.isEnLocale" />
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
