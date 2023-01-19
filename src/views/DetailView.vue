<script setup>
import { ref, onMounted } from 'vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import { useDateFilter } from '@/use/dateFilter'

const store = useStore()
const route = useRoute()

const record = ref(null)
const loading = ref(true)

onMounted(async () => {
  const id = route.params.id
  const currentRecord = await store.dispatch('fetchRecordById', id)
  const category = await store.dispatch('fetchCategoryById', currentRecord.categoryId)
  record.value = {
    ...currentRecord,
    categoryName: category.title
  }
  loading.value = false
})
</script>

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

              <small>{{useDateFilter(record.date)}}</small>
            </div>
          </div>
        </div>
      </div>
    </div>
    <p  v-else class="center">Record not found</p>
  </div>
</template>
