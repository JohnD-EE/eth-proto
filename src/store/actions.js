import firebase from 'firebase'
import router from '@/router'
import { db } from '../main'
import userAccountsHelper from '../helpers/userAccounts'
import auctionHelper from '../helpers/demoAuction/auction'
import AuctionFactoryJSON from '../../build/contracts/AuctionFactory.json'
import EscrowFactoryJSON from '../../build/contracts/EscrowFactory.json'

export default {
  // Sign up and user account creation
  userSignUp ({commit}, payload) {
    commit('setLoading', true)
    commit('setUserTxs', [])
    firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
    .then(firebaseUser => {
      firebaseUser.updateProfile({
        displayName: payload.name
      }).then(res => {
        commit('setUser', {loggedIn: true, email: firebaseUser.email, displayName: firebaseUser.displayName})
        commit('setAllUsers')
        commit('setUserDetails', {
          displayName: firebaseUser.displayName
        })
        let ethAddress = userAccountsHelper.getUnusedEthAddress()
        let docData = {
          ethAccount: ethAddress,
          displayName: firebaseUser.displayName,
          type: 'user',
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
    commit('setUserTxs', [])
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
        commit('setAllUsers')
        router.push('/home')
      })
      .catch(error => {
        commit('setError', error.message)
        commit('setLoading', false)
      })
  },

  // sign in upon browser refresh
  autoSignIn ({commit}, firebaseUser) {
    commit('setUserTxs', [])
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
    commit('setAllUsers')
  },

  // reset user stores upon signout
  userSignOut ({commit}) {
    firebase.auth().signOut()
    commit('setUser', {loggedIn: false, displayName: null, email: null})
    commit('setUserDetails', {displayName: null, ethAccount: null, ethBalance: null})
    commit('setUserTxs', [])
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

  updateAllUsers ({commit}) {
    commit('resetAllUsers')
    commit('setAllUsers')
  },

  // Compose Transactions
  composeTransaction ({commit}, payload) {
    commit('setTxComposer', payload)
  },

  // Update Eth Account e.g. after a transaction
  updateAccount ({commit}) {
    let ethAccount = this.state.userDetails.ethAccount
    if (!window.web3.utils.isAddress(ethAccount)) {
      return false
    }
    window.web3.eth.getBalance(ethAccount).then(
      res => commit('setUserDetails', {ethBalance: res})
    )
  },

  accountSeeding ({commit}, payload) {
    commit('setAccountSeedingLoading', payload)
  },

  userTxs ({commit}) {
    // @todo - Iiterating through the blockchain is OK for a prototype but in real
    // dApps we would require transaction history to be stored more efficiently
    // perhaps as a separate service
    let ethAccount = this.state.userDetails.ethAccount
    window.web3.eth.getBlockNumber()
    .then(n => {
      let txs = []
      for (let bl = 0; bl <= n; bl++) {
        window.web3.eth.getBlock(bl, true)
        .then(block => {
          for (let tx = 0; tx < block.transactions.length; tx++) {
            let blockTx = block.transactions[tx]
            if (blockTx.to === ethAccount || blockTx.from === ethAccount) {
              window.web3.eth.getBalance(ethAccount, blockTx.blockNumber)
              .then(balance => {
                blockTx.balance = balance
                window.web3.eth.getTransactionReceipt(blockTx.hash)
                .then(receipt => {
                  blockTx.gasUsed = receipt.gasUsed
                  txs.push(blockTx)
                  if (txs.length > this.state.userTxs.length) {
                    commit('setUserTxs', txs)
                  }
                })

              })
            }
          }
        })
      }
    })
  },

  // create an array of all the ethereum accounts created by ganache initiaion
  registerContracts ({commit}) {
    commit('setContracts', [])
    let abi = []
    abi['AuctionFactory'] = AuctionFactoryJSON.abi
    abi['EscrowFactory'] = EscrowFactoryJSON.abi
    let defaultContractAddresses = this.state.defaultContractAddresses
    defaultContractAddresses.forEach(res => {
      let contract = new window.web3.eth.Contract(abi[res.instance], res.address)
      window.web3.eth.getCode(res.address)
      .then(code => {
        if (code.length > 3) {
          let contracts = this.state.contracts
          contracts[res.instance] = contract
          console.log('Contract Registration: ' + res.name, contract)
          commit('setContracts', contracts)
        } else {
          console.log('FAILED Contract Registration: ' + res.name)
        }
      })
    })
  },

  resetAuctionContracts({commit}) {
    commit('resetAuctionContracts')
  },

  registerAuctionContract({commit}, payload) {
    let auctionContracts = this.state.auctionContracts
    auctionContracts.push(payload)
    commit('setAuctionContracts', auctionContracts)
  }
}
