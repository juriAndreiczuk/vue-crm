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
        <select ref="select" v-model="currentCategory">
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
            v-model="type"
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
            v-model="type"
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
          v-model.number="amount"
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
          v-model="description"
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

<script>
  import { useVuelidate } from '@vuelidate/core'
  import messages from '@/utils/messages'
  import { required, minValue } from '@vuelidate/validators'
  export default {
    name: 'record',
    mixins: [messages],
    data() {
      return {
        v$: useVuelidate(),
        loading: true,
        select: null,
        categories: [],
        currentCategory: null,
        type: 'consumption',
        amount: 1,
        description: ''
      }
    },
    validations() {
      return {
        description: { required },
        amount: { minValue: minValue(1), required }
      }
    },
    computed: {
      canCreateRecord() {
        if(this.type === 'income') {
          return true
        }
        return this.$store.getters.info.bill >= this.amount
      }
    },
    methods: {
      async onSubmit() {
        const isFormCorrect = await this.v$.$validate()
        if(!isFormCorrect) return false
        if(this.canCreateRecord) {
          try {
            await this.$store.dispatch('createRecord', {
              categoryId: this.currentCategory,
              type: this.type, 
              amount: this.amount,
              description: this.description,
              date: new Date().toJSON()
            })
            const bill = this.type === 'income'
              ? this.$store.getters.info.bill + this.amount
              : this.$store.getters.info.bill - this.amount
            
            await this.$store.dispatch('updateInfo', {bill})
            this.$message('created')
            this.v$.$reset()
            this.amount = 1
            this.description = ''
          } catch(e) {}
        } else {
          this.$message('not enought money')
        }
      }
    },
    async mounted() {
      this.categories = await this.$store.dispatch('fetchCategories')
      this.loading = false
      if(this.categories.length) {
        this.currentCategory = this.categories[0].key
      }
      setTimeout(() => {
        this.select = M.FormSelect.init(this.$refs.select)
        M.updateTextFields()
      }, 0)
    },
    unmounted() {
      if (this.select &&  this.select.destroy) {
        this.select.destroy()
      }
    }
  }
</script>