import firebase from 'firebase'
import router from '@/router'
import { db } from '../main'
import userAccountsHelper from '../helpers/userAccounts'

export default {

  // Sign up and user account creation
  userSignUp ({commit}, payload) {
    commit('setLoading', true)
    firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
    .then(firebaseUser => {
      firebaseUser.updateProfile({
        displayName: payload.name
      }).then(res => {
        commit('setUser', {loggedIn: true, email: firebaseUser.email, displayName: firebaseUser.displayName})
        commit('setUserDetails', {
          displayName: firebaseUser.displayName
        })
        let ethAddress = userAccountsHelper.getUnusedEthAddress()
        let docData = {
          ethAccount: ethAddress,
          displayName: firebaseUser.displayName,
          createdAt: Date.now()
        }
        db.collection('users').doc(firebaseUser.uid).set(docData)
        .then(res => {
          db.collection('users').doc(firebaseUser.uid).get()
          .then(doc => {
            let ethAccount = doc.data().ethAccount
            commit('setUserDetails', {ethAccount: ethAccount})
            window.web3.eth.getBalance(ethAccount).then(
              res => commit('setUserDetails', {ethBalance: res})
            )
          })
          .catch(error => console.log('Error retrieving document: ', error))
        })
      })
      commit('setAllUsers')
      commit('setLoading', false)
      router.push('/home')
    })
    .catch(error => {
      commit('setError', error.message)
      commit('setLoading', false)
    })
  },

  // Sign in
  userSignIn ({commit}, payload) {
    commit('setLoading', true)
    firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
      .then(firebaseUser => {
        commit('setUser', {loggedIn: true, email: firebaseUser.email, displayName: firebaseUser.displayName})
        commit('setUserDetails', {
          displayName: firebaseUser.displayName
        })
        db.collection('users').doc(firebaseUser.uid).get()
        .then(doc => {
          let ethAccount = doc.data().ethAccount
          commit('setUserDetails', {ethAccount: ethAccount})
          window.web3.eth.getBalance(ethAccount).then(
            res => commit('setUserDetails', {ethBalance: res})
          )
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

  // sign in upon browser refresh
  autoSignIn ({commit}, firebaseUser) {
    commit('setUser', {loggedIn: true, email: firebaseUser.email, displayName: firebaseUser.displayName})
    db.collection('users').doc(firebaseUser.uid).get()
    .then(doc => {
      let ethAccount = doc.data().ethAccount
      commit('setUserDetails', {ethAccount: ethAccount})
      window.web3.eth.getBalance(ethAccount).then(
        res => commit('setUserDetails', {ethBalance: res})
      )
    })
    .catch(error => console.log('Error retrieving document: ', error))
  },

  // reset user stores upon signout
  userSignOut ({commit}) {
    firebase.auth().signOut()
    commit('setUser', {loggedIn: false, displayName: null, email: null})
    commit('setUserDetails', {displayName: null, ethAddress: null, ethBalance: null})
    router.push('/')
  },

  // register all details relating to the web3 API
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
  },

  // create an array of all the ethereum accounts created by ganache initiaion
  registerGanacheAccounts ({commit}) {
    window.web3.eth.getAccounts().then(res => {
      commit('setGanacheAccounts', res)
    })
  },

  // get documents for all users from firbase and store in an array
  registerAllUsers ({commit}) {
    commit('setAllUsers')
  },

  // Compose Transactions
  composeTransaction ({commit}, payload) {
    commit('setTxComposer', payload)
  },

  // Update Eth Account e.g. after a transaction
  updateAccount ({commit}) {
    let ethAccount = this.state.userDetails.ethAccount
    window.web3.eth.getBalance(ethAccount).then(
      res => commit('setUserDetails', {ethBalance: res})
    )
  },
  userTxs ({commit}) {
    // @todo - Iiterating through the blockchain is OK for a prototype but in real
    // dApps we would require transaction history to be stored more efficiently
    // perhaps as a separate service
    let ethAccount = this.state.userDetails.ethAccount
    window.web3.eth.getBlockNumber()
    .then(n => {
      let txs = []
      for (let bl = 0; bl < n; bl++) {
        window.web3.eth.getBlock(bl, true)
        .then(block => {
          for (let tx = 0; tx < block.transactions.length; tx++) {
            let blockTx = block.transactions[tx]
            if (blockTx.to === ethAccount || blockTx.from === ethAccount) {
              window.web3.eth.getBalance(ethAccount, blockTx.blockNumber)
              .then(balance => {
                blockTx.balance = balance
                txs.push(blockTx)
              })
            }
          }
        })
        if (bl === (n - 1)) {
          commit('setUserTxs', txs)
        }
      }
    })
  }
}
