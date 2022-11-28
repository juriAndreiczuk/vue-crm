<template>
  <div>
    <div class="page-title">
      <h3>History</h3>
    </div>

    <div class="history-chart">
      <canvas></canvas>
    </div>
    <Loader v-if="loading" />
    <p 
      v-else-if="!records.length"
      class="center"
    >
      Records not found. <router-link to="/record">Add new</router-link>
  </p>
    <section v-else>
      <HistoryTable
        :history-records="records"
      />
    </section>
  </div>
</template>

<script>
  import HistoryTable from '@/components/history/HistoryTable'
  export default {
    name: 'History',
    data() {
      return {
        loading: true,
        records: [],
        categories: []
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
        this.loading = false
      } catch(e) {}
    },
    components: {
      HistoryTable
    }
  }
</script>