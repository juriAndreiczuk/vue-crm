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

<script>
import CategoriesCreate from '@/components/categories/CategoriesCreate'
import CategoriesEdit from '@/components/categories/CategoriesEdit'

export default {
  data() {
    return {
      categories: [],
      loading: true,
      updateCount: 0
    }
  },
  methods: {
    addNewCategory(category) {
      this.categories.push(category)
    },
    updateCategories(val) {
      const index = this.categories.findIndex(cat => cat.id === val.id)
      this.categories[index] = val
      this.updateCount += 1;
    }
  },
  async mounted() {
    this.categories = await this.$store.dispatch('fetchCategories')
    this.loading = false
  },
  components: {
    CategoriesCreate,
    CategoriesEdit
  }
}
</script>