import { 
  getDatabase,
  ref,
  child,
  push,
  get,
  update
} from 'firebase/database'

export default {
  actions: {
    async createCategory({commit, dispatch}, {title, limit}) {
      try {
        const uid = await dispatch('getUid')
        const db = getDatabase()
        const newCategorytKey = push(child(ref(db), `users/${uid}/categories`)).key
        const updates = {}
        updates[`users/${uid}/categories/${newCategorytKey}`] = {title, limit}
        update(ref(db), updates)
        return {title, limit, newCategorytKey}
      } catch(e) {
        commit('setError', e)
        throw e
      }
    },
    async fetchCategories({commit, dispatch}) {
      const uid = await dispatch('getUid')
      const db = ref(getDatabase())
      const categories = await get(child(db, `users/${uid}/categories`))
      if(categories.val()) {
        const val = categories.val()
        return Object.keys(val).map(key => ({...val[key], key}))
      } else {
        return []
      }
    },
    async updateCategory({commit, dispatch}, {title, limit, key}) {
      try {
        const uid = await dispatch('getUid')
        const db = getDatabase()
        const updates = {}        
        updates[`users/${uid}/categories/${key}`] = {title, limit}
        update(ref(db), updates)
      } catch(e) {
        commit('setError', e)
        throw e
      }
    }
  }
}