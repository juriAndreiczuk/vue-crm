<template>
  <div>
    <div class="page-title">
      <h3>Categories</h3>
    </div>
    <section>
      <div class="row">
        <CategoriesCreate @created="addNewCategory" />
        <CategoriesEdit />
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
      categories: []
    }
  },
  methods: {
    addNewCategory(category) {
      this.categories.push(category)
    }
  },
  components: {
    CategoriesCreate,
    CategoriesEdit
  }
}
</script>