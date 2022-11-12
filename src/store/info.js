import { 
  getDatabase,
  ref,
  get,
  child
} from 'firebase/database'

export default {
  state: {
    info: {}
  },
  mutations: {
    setInfo(state, payload) {
      state.info = payload
    },
    clearInfo(state) {
      state.info = {}
    }
  },
  actions: {
    async fetchInfo({ dispatch, commit }) {
      try {
        const uid = await dispatch('getUid')
        const dbRef = ref(getDatabase())
        const info = await get(child(dbRef, `users/${uid}/info`))
        commit('setInfo', info.val()) 
      } catch (e) {

      }
    }
  },
  getters: {
    info: state => state.info 
  }
}