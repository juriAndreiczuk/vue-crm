import { 
  getDatabase,
  ref,
  child,
  push,
  update
} from 'firebase/database'

export default {
  actions: {
    async createCategory({commit, dispatch}, {title, limit}) {
      try {
        const uid = await dispatch('getUid')
        const db = getDatabase()
        const newCategorytKey = push(child(ref(db), `users/${uid}/categories`)).key;
        const updates = {}
        updates[`users/${uid}/categories/${newCategorytKey}`] = {title, limit}
        update(ref(db), updates)
        return {title, limit, newCategorytKey}
      } catch(e) {
        commit('setError', e)
        throw e
      }
    }
  }
}