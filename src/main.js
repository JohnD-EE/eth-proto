// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import { store } from './store'
import firebase from 'firebase'

Vue.use(Vuetify)

firebase.initializeApp({
  apiKey: 'AIzaSyC8AkQkt2QNt7OaJhBtsb1udrrVD7Fj0nU',
  authDomain: 'fir-app-a3ad6.firebaseapp.com',
  databaseURL: 'https://fir-app-a3ad6.firebaseio.com',
  projectId: 'fir-app-a3ad6'
})

Vue.config.productionTip = false

/* eslint-disable no-new */
const unsubscribe = firebase.auth()
.onAuthStateChanged((firebaseUser) => {
  new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App),
    created () {
      if (firebaseUser) {
        store.dispatch('autoSignIn', firebaseUser)
      }
    }
  })
  unsubscribe()
})
