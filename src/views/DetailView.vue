<template>
  <div>
    <Loader v-if="loading" />
    <div v-else-if="record">
      <div class="breadcrumb-wrap">
        <router-link to="/history" class="breadcrumb">History</router-link>
        <a @click.prevent class="breadcrumb"> {{record.type}} </a>
      </div>
      <div class="row">
        <div class="col s12 m6">
          <div 
            class="card"
            :class="record.type == 'consumption' ? 'red' : 'green'"
          >
            <div class="card-content white-text">
              <p>Description: {{record.description}}</p>
              <p>Amount: {{record.amount}}</p>
              <p>Category: {{record.categoryName}}</p>

              <small>{{dateFilter(record.date)}}</small>
            </div>
          </div>
        </div>
      </div>
    </div>
    <p  v-else class="center">Record not found</p>
  </div>
</template>

<script>
  import dateFilter from '@/mixins/dateFilter'
  export default {
    mixins: [dateFilter],
    name: 'detail',
    data() {
      return {
        record: null,
        loading: true,
        
      }
    },
    async mounted() {
      const id = this.$route.params.id
      const record = await this.$store.dispatch('fetchRecordById', id)
      const category = await this.$store.dispatch('fetchCategoryById', record.categoryId)
      this.record = {
        ...record,
        categoryName: category.title
      }
      this.loading = false
    }
  }
</script>