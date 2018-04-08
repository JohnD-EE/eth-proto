import firebase from 'firebase'
import router from '@/router'

export default {
  userSignUp ({commit}, payload) {
    commit('setLoading', true)
    firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
    .then(firebaseUser => {
      commit('setUser', {email: firebaseUser.email})
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
