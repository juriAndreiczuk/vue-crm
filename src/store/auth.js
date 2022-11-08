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
    async login({}, {email, password}) {
      try {
        const auth = getAuth()
        await signInWithEmailAndPassword(auth, email, password)
      } catch(e) {
        throw e
      }
    },
    async logout() {
      const auth = getAuth()
      await signOut(auth)
    },
    async register({dispatch}, {email, password, name }) {
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
        throw e
      }
    },
    getUid() {
      const auth = getAuth()
      const user = auth.currentUser
      return user ? user.uid : null
    },
  }
}