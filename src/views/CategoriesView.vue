<script setup>
import CategoriesCreate from '@/components/categories/CategoriesCreate'
import CategoriesEdit from '@/components/categories/CategoriesEdit'

import { ref, onMounted } from 'vue'
import { useStore } from 'vuex'
  const categories = ref([])
  const loading = ref(true)
  const updateCount = ref(0)

  const store = useStore()

  const addNewCategory = category => {
    categories.value.push(category)
  }

  const updateCategories = val => {
    const index = categories.value.findIndex(cat => cat.id === val.id)
    categories.value[index] = val
    updateCount.value += 1;
  }

  onMounted(async ()  => {
    categories.value = await store.dispatch('fetchCategories')
    loading.value = false
  })
</script>

<template>
  <div>
    <div class="page-title">
      <h3>Categories</h3>
    </div>
    <section>
      <Loader v-if="loading" />
      <div class="row" v-else>
        <CategoriesCreate @created="addNewCategory" />
        <CategoriesEdit
          v-if="categories.length"
          :key="categories.length + updateCount"
          @updateCategories="updateCategories"
          :categories-list="categories"
        />
        <p 
          v-else
          class="center"
        >categories not found</p>
      </div>
    </section>
  </div>
</template>
