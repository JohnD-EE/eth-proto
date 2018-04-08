export default {
  setUser (state, payload) {
    state.user = payload
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
  }
}
