import pl from '../locales/pl.json'
import en from '../locales/en.json'

export default {
  data() {
    return {
      locales: {
        'pl-PL' : pl,
        'en-EN' : en
      }
    }
  },
  methods: {
    localizeFilter(key) {
      return this.locales[this.$store.getters.info.locale][key] || `[Lokalize error: key: ${key} not founded]`
    }
  }
}