import { 
  getDatabase,
  ref,
  set
} from 'firebase/database'
import { 
  getAuth,
  signInWithEmailAndPassword,
  signOut,
  createUserWithEmailAndPassword
} from 'firebase/auth'

export default {
  actions: {
    async login({commit}, {email, password}) {
      try {
        const auth = getAuth()
        return await signInWithEmailAndPassword(auth, email, password)
      } catch(e) {
        commit('setError', e)
        throw e
      }
    },
    async logout({commit}) {
      const auth = getAuth()
      await signOut(auth)
      commit('clearInfo')
    },
    async register({dispatch, commit}, {email, password, name }) {
      try {
        const auth = getAuth()
        await createUserWithEmailAndPassword(auth, email, password)
        const uid = await dispatch('getUid')
        const db = getDatabase()
        set(ref(db, `users/${uid}/info`), {
          name,
          bill: 1000
        });
      } catch(e) {
        commit('setError', e)
        throw e
      }
    },
    getUid() {
      const auth = getAuth()
      const user = auth.currentUser
      return user ? user.uid : null
    }
  }
}