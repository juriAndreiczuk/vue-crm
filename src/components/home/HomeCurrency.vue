<template>
  <div class="col s12 m6 l8">
    <div class="card orange darken-3 bill-card">
      <div class="card-content white-text">
        <div class="card-header">
          <span class="card-title">Course</span>
        </div>
        <table>
          <thead>
            <tr>
              <th>Currency</th>
              <th>course</th>
              <th>Date</th>
            </tr>
          </thead>

          <tbody>
            <tr 
              v-for="currency of Object.keys(currencyRates)"
              :key="currency"
            >
              <td>{{currency}}</td>
              <td>{{currencyRates[currency].toFixed(3)}}</td>
              <td>{{dateFilter(currencyDate)}}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import dateFilter from '@/mixins/dateFilter'

export default {
  mixins: [dateFilter],
  props: {
    currencyRates: Object,
    currencyDate: String,
  }
}
</script>

<style>
</style>