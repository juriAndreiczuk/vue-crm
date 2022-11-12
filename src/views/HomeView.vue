<template>
  <div>
    <div class="page-title">
      <h3>Account</h3>
      <button 
        @click="loadInfo()"
        class="btn waves-effect waves-light btn-small"
      >
        <i class="material-icons">refresh</i>
      </button>
    </div>
    <Loader v-if="loading" />
    <div v-else class="row">
      <HomeBill 
        :bill-base="currency.base"
        :bill-rates="currency.rates"
      />
      <HomeCurrency
        :currency-rates="currency.rates"
        :currency-date="currency.date"
      />
    </div>
  </div>
</template>

<script>
import HomeBill from '@/components/home/HomeBill'
import HomeCurrency from '@/components/home/HomeCurrency'

export default {
  name: "HomeView",
  data() {
    return {
      loading: true,
      currency: null
    }
  },
  methods: {
    async loadInfo() {
      this.loading = true
      this.currency = await this.$store.dispatch('fetchCurrency')
      this.loading = false
    }
  },
  async mounted() {
    this.loadInfo()
  },
  components: {
    HomeBill,
    HomeCurrency
  }
};
</script>
