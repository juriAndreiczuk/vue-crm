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

<script>
  import HistoryTable from '@/components/history/HistoryTable'
  import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
  import { Pie } from 'vue-chartjs'
  ChartJS.register(ArcElement, Tooltip, Legend)

  export default {
    name: 'History',
    data() {
      return {
        loading: true,
        records: [],
        categories: [],
        chartData: {
          datasets: [ {
            label: 'Data One',
            data: null,
            backgroundColor: '#f87979',

          } ]
        },
        chartOptions: {
          responsive: true
        }
      }
    },  
    async mounted() {
      try {
        const records = await this.$store.dispatch('fetchRecords')
        this.categories = await this.$store.dispatch('fetchCategories')
        this.records = records.map(record => ({
          ...record,
          categoryName: this.categories.find(category => category.key === record.categoryId).title,
          typeClass: record.type === 'income' ? 'green' : 'red'
        }))
        this.chartData.labels = this.categories.map(category => category.title)
        const data = this.categories.map(category => {
          return this.records.reduce((total, record) => {
            if (record.categoryId === category.key && record.type === 'consumption') {
              total += record.amount
            }
            return total
          }, 0)
        })
        this.chartData.datasets.push({data})
        this.loading = false
      } catch(e) {}
    },
    components: {
      HistoryTable, 
      Pie
    }
  }
</script>