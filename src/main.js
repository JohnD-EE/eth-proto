// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import {
  store
} from './store'
import firebase from 'firebase'
import Web3 from 'web3'

Vue.use(Vuetify)

// create a firebase account  (including Auth )at https://firebase.google.com/
// and set config details below
// configs are set in config folder
firebase.initializeApp({
  apiKey: process.env.firebase.apiKey,
  authDomain: process.env.firebase.authDomain,
  databaseURL: process.env.firebase.databaseURL,
  projectId: process.env.firebase.projectId
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
        // Create a web3 instance.
        if (process.env.web3.injectedProvider === true && typeof web3 !== 'undefined') {
          window.web3 = new Web3(window.web3.currentProvider)
          console.log('Web3: Injected (e.g. from Metamask)')
        } else {
          window.web3 = new Web3(new Web3.providers.HttpProvider(process.env.web3.localProviderUrl))
          console.log('Web3: Local (Not using injected web3 such as Metamask)')
        }
        if (firebaseUser) {
          store.dispatch('autoSignIn', firebaseUser)
        }
      }
    })
    unsubscribe()
  })
