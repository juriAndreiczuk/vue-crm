import { createApp, Vue } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import messagePlugin from './utils/message.plugin'
import 'materialize-css/dist/js/materialize.min.js'
import { initializeApp } from 'firebase/app'
import { getAuth, onAuthStateChanged } from 'firebase/auth'

let app
const options = {
  apiKey: 'AIzaSyCICU91hWUrr-5d3BwC5wIzMJVyy-4YXec',
  authDomain: 'crmvue-1f01e.firebaseapp.com',
  projectId: 'crmvue-1f01e',
  storageBucket: 'crmvue-1f01e.appspot.com',
  messagingSenderId: '610314952544',
  appId: '1:610314952544:web:68e6ff6215283afb774805',
  databaseURL: 'https://crmvue-1f01e-default-rtdb.europe-west1.firebasedatabase.app'
}
const fireApp = initializeApp(options)
const auth = getAuth();
onAuthStateChanged(auth, (user) => {
  if(!app) {
    app = createApp(App)
      .use(store)
      .use(router)
      .use(messagePlugin)
      .mount('#app')
  }
});

