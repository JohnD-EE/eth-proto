import firebase from 'firebase'
import router from '@/router'
import { db } from '../main'

export default {
  userSignUp ({commit}, payload) {
    commit('setLoading', true)
    firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
    .then(firebaseUser => {
      firebaseUser.updateProfile({
        displayName: payload.name
      }).then(res => {
        commit('setUser', {email: firebaseUser.email, displayName: firebaseUser.displayName})
        commit('setUserDetails', {
          displayName: firebaseUser.displayName
        })
        let ethCreate = window.web3.eth.accounts.create()
        // todo check ethCreate is valid object
        let ethAddress = ethCreate.address
        let docData = {
          ethAccount: ethAddress
        }
        db.collection('users').doc(firebaseUser.uid).set(docData)
        .then(res => {
          db.collection('users').doc(firebaseUser.uid).get()
          .then(doc => {
            commit('setUserDetails', {ethAccount: doc.data().ethAccount})
          })
          .catch(error => console.log('Error retrieving document: ', error))
        })
      })
      commit('setLoading', false)
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
        commit('setUser', {email: firebaseUser.email, displayName: firebaseUser.displayName})
        commit('setUserDetails', {
          displayName: firebaseUser.displayName
        })
        db.collection('users').doc(firebaseUser.uid).get()
        .then(doc => {
          commit('setUserDetails', {ethAccount: doc.data().ethAccount})
        })
        .catch(error => console.log('Error retrieving document: ', error))
        commit('setLoading', false)
        commit('setError', null)
        router.push('/home')
      })
      .catch(error => {
        commit('setError', error.message)
        commit('setLoading', false)
      })
  },
  autoSignIn ({commit}, firebaseUser) {
    commit('setUser', {email: firebaseUser.email, displayName: firebaseUser.displayName})
    commit('setUserDetails', {displayName: firebaseUser.displayName})
    db.collection('users').doc(firebaseUser.uid).get()
    .then(doc => {
      commit('setUserDetails', {ethAccount: doc.data().ethAccount})
    })
    .catch(error => console.log('Error retrieving document: ', error))
  },
  userSignOut ({commit}) {
    firebase.auth().signOut()
    commit('setUser', null)
    commit('setUserDetails', null)
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
