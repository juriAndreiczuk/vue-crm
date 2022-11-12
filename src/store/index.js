import { createStore } from 'vuex'
import auth from './auth'
import info from './info'

export default createStore({
  state: {
    error: null
  },
  getters: {
    error: state => state.error
  },
  mutations: {
    setError(state, error) {
      state.error = error
    },
    clearError(state) {
      state.error = null
    }
  },
  actions: {
    async fetchCurrency() {
      const key = process.env.VUE_APP_FIXER
      const myHeaders = new Headers()
      myHeaders.append('apikey', key)

      const requestOptions = {
        method: 'GET',
        redirect: 'follow',
        headers: myHeaders
      }

      const result = await fetch("https://api.apilayer.com/fixer/latest?symbols=USD,EUR,CHF&base=PLN", requestOptions)
      const resultJson = await result.json()
      return resultJson
    }
  },
  modules: {
    auth,
    info
  }
})
