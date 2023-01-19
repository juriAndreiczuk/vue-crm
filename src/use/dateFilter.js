import { useStore } from 'vuex'


export const useDateFilter = (value, format = 'date') => {
  const store = useStore()
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
    return new Intl.DateTimeFormat( store.getters.info.locale || 'en-EN', options).format(new Date(value))
}