<template>
  <div class="col s12 m6">
    <div>
      <div class="page-subtitle">
        <h4>Edit</h4>
      </div>
      <form @submit.prevent="onSubmit">
        <div class="input-field">
          <select ref="select" v-model="current">
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
            v-model="title"
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
            v-model.number="limit"
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

<script>
import { useVuelidate } from '@vuelidate/core'
import { required, minValue } from '@vuelidate/validators'
import messages from '@/utils/messages'

export default {
  mixins: [messages],
  props: {
    categoriesList: Array
  },
  data() {
    return {
      v$: useVuelidate(),
      title: '',
      limit: 1,
      select: null,
      current: null
    }
  },
  validations() {
    return {
      title: { required },
      limit: { minValue: minValue(1), required }
    }
  },
  methods: {
    async onSubmit() {
      const isFormCorrect = await this.v$.$validate()
      if(!isFormCorrect) return false  
      try {
        const categoryData = {
          key: this.current,
          title: this.title,
          limit: this.limit,
        }
        await this.$store.dispatch('updateCategory', categoryData)
        this.$message('category has been changed')
        this.$emit('updateCategories', categoryData)
      } catch(e) {}
    }
  },
  watch: {
    current(val) {
      const {title, limit } = this.categoriesList.find(cat => cat.key === val)
      this.title = title
      this.limit = limit
    }
  },
  created() {
    const {title, key, limit} = this.categoriesList[0]
    this.current = key 
    this.title = title
    this.limit = limit
  },
  mounted() {
    M.updateTextFields()
    this.select = M.FormSelect.init(this.$refs.select)
  },
  unmounted() {
    if (this.select &&  this.select.destroy) {
      this.select.destroy()
    }
  }
}
</script>