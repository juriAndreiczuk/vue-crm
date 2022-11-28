<template>
  <table>
    <thead>
      <tr>
        <th>#</th>
        <th>Summary</th>
        <th>Date</th>
        <th>Category</th>
        <th>Type</th>
        <th>Open</th>
      </tr>
    </thead>

    <tbody>
      <tr
        v-for="(record, index) of historyRecords"
        :key="record.categoryName + index"
      >
        <td>{{index}}</td>
        <td>{{record.amount}} PLN</td>
        <td>{{dateFilter(record.date, 'datetime')}}</td>
        <td>{{record.categoryName}}</td>
        <td>
          <span
            class="white-text badge"
            :class="record.typeClass"
          >{{record.type}}</span>
        </td>
        <td>
          <button v-tooltip="'open record'"
            class="btn-small btn"
            @click="$router.push(`/detail/${record.key}`)"
          >
            <i class="material-icons">open_in_new</i>
          </button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import dateFilter from '@/mixins/dateFilter'
export default {
  mixins: [dateFilter],
  props: {
    historyRecords: {
      required: true,
      type: Array
    }
  }
}
</script>

<style>
</style>