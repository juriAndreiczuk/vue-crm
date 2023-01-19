<script setup>
import HomeBill from '@/components/home/HomeBill'
import HomeCurrency from '@/components/home/HomeCurrency'
import { ref, onMounted } from 'vue'
import { useStore } from 'vuex'

const store = useStore()

const loading = ref(true)
const currency = ref(null)

const loadInfo = async () => {
  loading.value = true
  currency.value = await store.dispatch('fetchCurrency')
  loading.value = false
}

onMounted(async () => {
  loadInfo()
})
</script>

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
      <HomeBill :bill-base="currency.base" :bill-rates="currency.rates" />
      <HomeCurrency
        :currency-rates="currency.rates"
        :currency-date="currency.date"
      />
    </div>
  </div>
</template>
