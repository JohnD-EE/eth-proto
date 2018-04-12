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
  setAllUsers (state, payload) {
    state.allUsers = payload
  },
  setTxComposer (state, payload) {
    state.txComposer = payload
  }
}
