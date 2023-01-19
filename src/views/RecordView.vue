
<script setup>
import { useVuelidate } from '@vuelidate/core'
import { required, minValue } from '@vuelidate/validators'
import { useMessage } from '@/use/message'
import { reactive, ref, computed, onMounted, onUnmounted } from 'vue'
import { useStore } from 'vuex'

const store = useStore()

const selectTag = ref(null)
const loading = ref(true) 
const categories = ref([])
const select = ref(null)
const currentCategory = ref(null)
const recordType = ref('consumption')

const state = reactive({
  amount: 1,
  description: ''
})

const rules = {
  amount: { minValue: minValue(1), required },
  description: { required }
}

const v$ = useVuelidate(rules, state)

const canCreateRecord = computed(()=> {
  if(recordType.value === 'income') {
    return true
  }
  return store.getters.info.bill >= state.amount
})

const onSubmit = async () => {
  const isFormCorrect = await v$.value.$validate()
  if(!isFormCorrect) return false
  if(canCreateRecord) {
    try {
      await store.dispatch('createRecord', {
        categoryId: currentCategory.value,
        type: recordType.value, 
        amount: state.amount,
        description: state.description,
        date: new Date().toJSON()
      })
      const bill = recordType.value === 'income'
        ? store.getters.info.bill + state.amount
        : store.getters.info.bill - state.amount
      
      await store.dispatch('updateInfo', {bill})
      useMessage('created')
      v$.value.$reset()
      state.amount = 1
      state.description = ''
    } catch(e) {}
  } else {
    useMessage('not enought money')
  }
}

onMounted(async () => {
  categories.value = await store.dispatch('fetchCategories')
  loading.value = false
  if(categories.value.length) {
    currentCategory.value = categories.value[0].key
  }
  setTimeout(() => {
    select.value = M.FormSelect.init(selectTag.value)
    M.updateTextFields()
  }, 0)
})

onUnmounted(() => {
  if (select.value &&  select.value.destroy) {
    select.value.destroy()
  }
})
</script>

<template>
  <div>
    <div class="page-title">
      <h3>New record</h3>
    </div>
    <Loader v-if="loading" />
    <p class="center" v-else-if="!categories.length">
      <span>No categories.</span>
      <router-link to="/categories"> Add new category</router-link>
    </p>
    <form 
      v-else 
      class="form"
      @submit.prevent="onSubmit"
    >
      <div class="input-field">
        <select ref="selectTag" v-model="currentCategory">
          <option
            v-for="category of categories"
            :key="category.key"
            :value="category.key"
          >
            {{category.title}}
          </option>
        </select>
        <label>Select the category</label>
      </div>

      <p>
        <label>
          <input 
            v-model="recordType"
            class="with-gap"
            name="type"
            type="radio"
            value="income" 
          />
          <span>Income</span>
        </label>
      </p>

      <p>
        <label>
          <input 
            v-model="recordType"
            class="with-gap"
            name="type"
            type="radio"
            value="consumption" 
          />
          <span>Consumption</span>
        </label>
      </p>

      <div class="input-field">
        <input 
          id="amount"
          type="number"
          v-model.number="state.amount"
          :class="{
            'invalid' : (v$.amount.$dirty && v$.amount.required.$invalid) || (v$.amount.$dirty && v$.amount.$invalid)
          }"
        />
        <label for="amount">Summary</label>
        <span
            v-if="(v$.amount.$dirty && v$.amount.required.$invalid) || (v$.amount.$dirty && v$.amount.$invalid)"
            class="helper-text invalid"
          >
            Enter a value (above zero)
          </span>
      </div>

      <div class="input-field">
        <input 
          id="description"
          type="text"
          v-model="state.description"
          :class="{
            'invalid' : v$.description.$dirty && v$.description.required.$invalid
          }"
        />
        <label for="description">Description</label>
        <span
            v-if="v$.description.$dirty && v$.description.$invalid"
            class="helper-text invalid"
          >
            Enter description
          </span>
      </div>

      <button class="btn waves-effect waves-light" type="submit">
        Create
        <i class="material-icons right">send</i>
      </button>
    </form>
  </div>
</template>
