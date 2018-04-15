import { db } from '../main'

export default {
  setUser (state, payload) {
    state.user = payload
  },
  setUserDetails (state, payload) {
    // state.user = payload
    for (var key in payload) {
      state.userDetails[key] = payload[key]
    }
  },
  setError (state, payload) {
    state.error = payload
  },
  setLoading (state, payload) {
    state.loading = payload
  },
  setWeb3 (state, payload) {
    for (var key in payload) {
      state.web3[key] = payload[key]
    }
  },
  setGanacheAccounts (state, payload) {
    state.ganacheAccounts = payload
  },
  setAllUsers (state) {
    state.allUsers = []
    db.collection('users').get().then(res => {
      let allUsers = []
      res.docs.forEach(doc => {
        let ethAccount = doc.data().ethAccount
        let displayName = doc.data().displayName
        allUsers.push({ethAccount: ethAccount, displayName: displayName})
        if (allUsers.length === res.docs.length) {
          state.allUsers = allUsers
        }
      })
    })
  },
  setTxComposer (state, payload) {
    state.txComposer = payload
  },
  setUserTxs (state, payload) {
    state.userTxs = payload
  }
}
