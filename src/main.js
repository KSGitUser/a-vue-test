import Vue from 'vue'
import './plugins/vuetify'
import store from './store'
import App from './App.vue'
import firebase from 'firebase/app'

Vue.config.productionTip = false



new Vue({
  render: h => h(App),
  store,
  created() {
    const firebaseConfig = {
      apiKey: "AIzaSyCcTAQgoYv3szHgKVEUJ0zcBn1aqViE9jA",
      authDomain: "a-test-vue-9779a.firebaseapp.com",
      databaseURL: "https://a-test-vue-9779a.firebaseio.com",
      projectId: "a-test-vue-9779a",
      storageBucket: "a-test-vue-9779a.appspot.com",
      messagingSenderId: "51824104625",
      appId: "1:51824104625:web:1d52729deaec21f1"
    }

    firebase.initializeApp(firebaseConfig)
  }
}).$mount('#app')