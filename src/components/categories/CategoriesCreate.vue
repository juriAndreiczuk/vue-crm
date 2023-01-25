
<script setup>
import { reactive, defineEmits, onMounted} from 'vue'
import { useVuelidate } from '@vuelidate/core'
import { required, minValue } from '@vuelidate/validators'
import { useStore } from 'vuex'
import { useMessage } from '@/use/message'

const store = useStore()
const emit = defineEmits(['created'])

const state = reactive({
  title: '',
  limit: 1
})

const rules = {
  title: { required },
  limit: { minValue: minValue(1), required }
}
const v$ = useVuelidate(rules, state)

const onSubmit = async () =>  {
  const isFormCorrect = await v$.value.$validate()
  if (!isFormCorrect) return false
  try {
    const category = await store.dispatch('createCategory', {
      title: state.title,
      limit: state.limit
    })
    state.title = ''
    state.limit = 1
    this.v$.value.$reset()
    emit('created', category)
    useMessage('category has been created')
  } catch (e) {}
}

onMounted(() => {
  M.updateTextFields()
})
</script>

<template>
  <div class="col s12 m6">
    <div>
      <div class="page-subtitle">
        <h4>Create</h4>
      </div>

      <form @submit.prevent="onSubmit">
        <div class="input-field">
          <input
            id="name"
            type="text"
            v-model="state.title"
            :class="{
              invalid: v$.title.$dirty && v$.title.required.$invalid
            }"
          />
          <label for="name">Title</label>
          <span
            v-if="v$.title.$dirty && v$.title.required.$invalid"
            class="helper-text invalid"
            >Enter the title</span
          >
        </div>

        <div class="input-field">
          <input
            id="limit"
            type="number"
            :class="{
              invalid:
                (v$.limit.$dirty && v$.limit.required.$invalid) ||
                (v$.limit.$dirty && v$.limit.$invalid)
            }"
            v-model.number="state.limit"
          />
          <label for="limit">Limit</label>
          <span
            v-if="v$.limit.$dirty && v$.limit.$invalid"
            class="helper-text invalid"
          >
            Enter a value (above zero)
          </span>
        </div>

        <button class="btn waves-effect waves-light" type="submit">
          Create
          <i class="material-icons right">send</i>
        </button>
      </form>
    </div>
  </div>
</template>
