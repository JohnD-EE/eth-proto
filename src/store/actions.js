import firebase from 'firebase'
import router from '@/router'
import { db } from '../main'

var getUserMetaData = function (firebaseUser) {
    let docRef = db.collection('users').doc(firebaseUser)
    docRef.get().then(function(doc) {
      if (doc.exists) {
        console.log("Document data:", doc.data())
        return doc.data()
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
      }
    }).catch(function(error) {
    console.log("Error getting document:", error);
  })
}

export default {
  userSignUp ({commit}, payload) {
    commit('setLoading', true)
    firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
    .then(firebaseUser => {
      commit('setUser', {email: firebaseUser.email})
      commit('setLoading', false)
      firebaseUser.updateProfile({
        displayName: payload.name
      }).then(res => {
    commit('setUserDetails', {
      displayName: firebaseUser.displayName
    })
    let ethCreate = window.web3.eth.accounts.create()
    // todo check ethCreate is valid object
    let ethAddress = ethCreate.address
    let docData = {
      ethAccount: ethAddress
    }
    db.collection('users').doc(firebaseUser.uid).set(docData).then(res => {
      let docRef = db.collection('users').doc(firebaseUser.uid)
      docRef.get().then(function(doc) {
        if (doc.exists) {
          commit('setUserDetails', {ethAccount: doc.data().ethAccount})
        } else {
          console.log("No such document!");
        }
      }).catch(function(error) {
        console.log("Error getting document:", error);
      })
    })
  })
      router.push('/home')
    })
    .catch(error => {
      commit('setError', error.message)
      commit('setLoading', false)
    })
  },
  userSignIn ({commit}, payload) {
    commit('setLoading', true)
    firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
      .then(firebaseUser => {
        commit('setUser', {email: firebaseUser.email})
        commit('setLoading', false)
        commit('setError', null)
        router.push('/home')
      })
      .catch(error => {
        commit('setError', error.message)
        commit('setLoading', false)
      })
  },
  autoSignIn ({commit}, payload) {
    commit('setUser', {email: payload.email})
  },
  userSignOut ({commit}) {
    firebase.auth().signOut()
    commit('setUser', null)
    router.push('/')
  },
  registerWeb3 ({commit}, payload) {
    // register the current provider
    commit('setWeb3', {currentProvider: payload.eth.currentProvider.constructor.name})

    // register the host address
    commit('setWeb3', {host: window.web3._provider.host})

    // register the coinbase
    payload.eth.getCoinbase()
    .then(res => {
      commit('setWeb3', {coinbase: res})
    })

    // register the latest block details
    payload.eth.getBlock('latest')
    .then(res => {
      commit('setWeb3', {latestBlock: res})
    })

    // register network ID
    payload.eth.net.getId()
    .then(res => {
      commit('setWeb3', {networkId: res})
    })

    // register network type
    payload.eth.net.getNetworkType()
    .then(res => {
      commit('setWeb3', {networkType: res})
    })
  }
}
