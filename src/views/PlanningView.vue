<script setup>
import { ref, onMounted } from 'vue'
import { useStore } from 'vuex'

const store = useStore()

const loading = ref(true)
const categories = ref([])

onMounted(async () => {
  try {
    const records = await store.dispatch('fetchRecords')
    const allCategories = await store.dispatch('fetchCategories')
    
    categories.value = allCategories.map(category => {
      const spend = records
        .filter(record => record.categoryId  === category.key)
        .filter(record => record.type === 'consumption')
        .reduce((total, record) => {
          return total += +record.amount
        }, 0)

      const percent = (100 * spend) / category.limit
      const progressPercent = percent > 100 ? 100 : percent 
      const progressColor = percent < 60 ? 'green' : percent < 100 ? 'yellow' : 'red'
      const tooltipValue = category.limit - spend
      const tooltip = `${tooltipValue < 0 ? 'Excess:' : 'You have:'} ${Math.abs(tooltipValue)}PLN`

      return {
        ...category,
        progressPercent,
        progressColor,
        spend,
        tooltip
      }
    })

    loading.value = false
  } catch (e) {}
})
</script>

<template>
  <div>
    <div class="page-title">
      <h3>Plan</h3>
      <h4>{{$store.getters.info.bill}} PLN</h4>
    </div>
    <Loader v-if="loading" />
    <p class="center" v-else-if="!categories.length">
      <span>No categories.</span>
      <router-link to="/categories"> Add new category</router-link>
    </p>
    <section v-else>
      <div
        v-for="category of categories"
        :key="category.key"
      >
        <p>
          <strong>{{category.title}}</strong>
          {{category.spend}}PLN from {{category.limit}}PLN
        </p>
        <div class="progress" v-tooltip="category.tooltip">
          <div 
            class="determinate"
            :class="category.progressColor"
            :style="{'width': `${category.progressPercent}%`}"
          ></div>
        </div>
      </div>
    </section>
  </div>
</template>
