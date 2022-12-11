export default {
  methods: {
    dateFilter(value, format = 'date') {
      const options = {}
      if (format.includes('date')) {
        options.day = '2-digit'
        options.month = 'long'
        options.year = 'numeric'
      }

      if (format.includes('time')) {
        options.hour = '2-digit'
        options.minute = '2-digit'
        options.second = '2-digit'
      }
      return new Intl.DateTimeFormat( this.$store.getters.info.locale || 'en-EN', options).format(new Date(value))
    }
  }
}