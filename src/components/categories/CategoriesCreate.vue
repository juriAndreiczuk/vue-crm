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
          Create
          <i class="material-icons right">send</i>
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import { useVuelidate } from '@vuelidate/core'
import { required, minValue} from '@vuelidate/validators'
import messages from '@/utils/messages'
export default {
  emits: ['created'],
  mixins: [messages],
  data() {
    return {
      v$: useVuelidate(),
      title: '',
      limit: 1
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
        const category = await this.$store.dispatch('createCategory', {
          title: this.title,
          limit: this.limit
        })
        this.title = ''
        this.limit = 1
        this.v$.$reset()
        this.$emit('created', category)
        this.$message('category has been created')
      } catch(e) {}
    }
  },
  mounted() {
    M.updateTextFields()
  }
}
</script>
