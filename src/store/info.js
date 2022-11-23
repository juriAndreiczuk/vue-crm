import { 
  getDatabase,
  ref,
  get,
  child,
  update
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
        commit('setErro', e)
        throw e
      }
    },
    async updateInfo({dispatch, commit, getters}, toUpdate) {
      try {
        const uid = await dispatch('getUid')
        const db = getDatabase()
        const updates = {}  
        const updateData = {
          ...getters.info, 
          ...toUpdate
        }
        updates[`users/${uid}/info`] = updateData
        update(ref(db), updates)
        commit('setInfo', updateData)
      } catch (e) {
        commit('setError', e)
        throw e
      }
    }
  },
  getters: {
    info: state => state.info 
  }
}