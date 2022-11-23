import { 
  getDatabase,
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
    }
  }
}