<script setup>
import { defineProps } from 'vue'
import { useStore } from 'vuex'

const store = useStore()

const props = defineProps({
  billRates: Object,
  billBase: String,
})

const getCurrency = currency => Math.floor(
  store.getters.info.bill * props.billRates[currency]
)
</script>

<template>
  <div class="col s12 m6 l4">
    <div class="card light-blue bill-card">
      <div class="card-content white-text">
        <span class="card-title">Currency Acount</span>
        <p class="currency-line"><span>{{`${$store.getters.info.bill} ${billBase}`}}</span></p>
        <p 
          class="currency-line"
          v-for="currency of Object.keys(this.billRates)"
          :key="currency"
        >
          <span>{{getCurrency(currency)}} {{currency}}</span>
        </p>
      </div>
    </div>
  </div>
</template>

