<script setup>
import { ref, reactive, onMounted } from 'vue'
import { useStore } from 'vuex'
import HistoryTable from '@/components/history/HistoryTable'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Pie } from 'vue-chartjs'

ChartJS.register(ArcElement, Tooltip, Legend)

const store = useStore()

const loading =  ref(true)
const records =  ref([])
const categories =  ref([])
const chartData = reactive({
  datasets: [ {
    label: 'Data One',
    data: null,
    backgroundColor: '#f87979',

  } ]
})
const chartOptions = reactive({
  responsive: true
})

onMounted(async () => {
  try {
    const allRecords = await store.dispatch('fetchRecords')
    categories.value = await store.dispatch('fetchCategories')
    records.value = allRecords.map(record => ({
      ...record,
      categoryName: categories.value.find(category => category.key === record.categoryId).title,
      typeClass: record.type === 'income' ? 'green' : 'red'
    }))
    chartData.labels = categories.value.map(category => category.title)
    const data = categories.value.map(category => {
      return records.value.reduce((total, record) => {
        if (record.categoryId === category.key && record.type === 'consumption') {
          total += record.amount
        }
        return total
      }, 0)
    })
    chartData.datasets.push({data})
    loading.value = false
  } catch(e) {}
})
</script>

<template>
  <div>
    <div class="page-title">
      <h3>History</h3>
    </div>
    <Loader v-if="loading" />
    <p 
      v-else-if="!records.length"
      class="center"
    >
      Records not found. <router-link to="/record">Add new</router-link>
  </p>
    <section v-else>
      <div class="history-chart">
        <Pie
          :data="chartData"
        />
      </div>
      <HistoryTable
        :history-records="records"
      />
    </section>
  </div>
</template>
