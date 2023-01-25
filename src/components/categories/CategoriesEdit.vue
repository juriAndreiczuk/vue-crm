<script setup>
import { useVuelidate } from '@vuelidate/core'
import { required, minValue } from '@vuelidate/validators'
import { useMessage } from '@/use/message'
import { defineProps, defineEmits, reactive, onMounted, ref, onUnmounted, watch } from 'vue'
import { useStore } from 'vuex'

const store = useStore()
const emit = defineEmits('updateCategories')
const props = defineProps({
  categoriesList: Array
})

const selectTag = ref(null)
const {title, key, limit} = props.categoriesList[0]

const state = reactive({
  title: title,
  limit: limit,
  select: null,
  current: key
})


const rules = {
  title: { required },
  limit: { minValue: minValue(1), required }
}

const v$ = useVuelidate(rules, state)

const onSubmit = async () => {
  const isFormCorrect = await v$.value.$validate()
  if(!isFormCorrect) return false  
  try {
    const categoryData = {
      key: state.current,
      title: state.title,
      limit: state.limit,
    }
    await store.dispatch('updateCategory', categoryData)
    useMessage('category has been changed')
    emit('updateCategories', categoryData)
  } catch(e) {}
}


onMounted(() => {
  state.select = M.FormSelect.init(selectTag.value)
  M.updateTextFields()
})

onUnmounted(() => {
  if (state.select &&  state.select.destroy) {
    state.select.destroy()
  }
})

watch(state.current, val => {
  const {title, limit } = props.categoriesList.find(cat => cat.key === val)
  title.value = title
  limit.value = limit
}) 
</script>

<template>
  <div class="col s12 m6">
    <div>
      <div class="page-subtitle">
        <h4>Edit</h4>
      </div>
      <form @submit.prevent="onSubmit">
        <div class="input-field">
          <select ref="selectTag" v-model="state.current">
            <option 
              v-for="category of categoriesList"
              :key="category.key"
              :value="category.key"
            >{{category.title}}</option>
          </select>
          <label>Select the category</label>
        </div>

        <div class="input-field">
          <input 
            id="name" type="text"
            v-model="state.title"
            :class="{
              'invalid' : v$.title.$dirty && v$.title.required.$invalid
            }"
          />
          <label for="name">Title</label>
          <span
            v-if="v$.title.$dirty && v$.title.required.$invalid"
            class="helper-text invalid"
          >Enter the title</span>
        </div>

        <div class="input-field">
          <input
            id="limit"
            type="number" 
            :class="{
              'invalid' : (v$.limit.$dirty && v$.limit.required.$invalid) || (v$.limit.$dirty && v$.limit.$invalid)
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
          Refresh
          <i class="material-icons right">send</i>
        </button>
      </form>
    </div>
  </div>
</template>
