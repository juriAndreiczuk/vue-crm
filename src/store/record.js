import { 
  getDatabase,
  get,
  ref,
  child,
  push,
  update
} from 'firebase/database'
export default {
  actions: {
    async createRecord({dispatch, commit}, record) {
      try {
        const uid = await dispatch('getUid')
        const db = getDatabase()
        const newCategorytKey = push(child(ref(db), `users/${uid}/records`)).key
        const updates = {}
        updates[`users/${uid}/records/${newCategorytKey}`] = record
        update(ref(db), updates)
        return record
      } catch(e) {
        commit('setError', e)
        throw error
      }
    },
    async fetchRecords({dispatch, commit}) {
      try {
        const uid = await dispatch('getUid')
        const db = ref(getDatabase())
        const records = await get(child(db, `users/${uid}/records`))
        if(records.val()) {
          const val = records.val()
          return Object.keys(val).map(key => ({...val[key], key}))
        } else {
          return []
        }
      } catch(e) {
        commit('setError', e)
        throw error
      }
    },
    async fetchRecordById({dispatch, commit}, id) {
      try {
        const uid = await dispatch('getUid')
        const db = ref(getDatabase())
        const record = await get(child(db, `users/${uid}/records/${id}`))
        if(record.val()) {
          return { ...record.val(), id }
        } else {
          return []
        }
      } catch(e) {
        commit('setError', e)
        throw error
      }
    }
  }
}