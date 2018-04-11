export default {
  isAuthenticated (state) {
    return state.user.loggedIn !== null &&
    state.user.loggedIn !== undefined &&
    state.user.loggedIn !== false
  },
  balanceToEther (state) {
    return state.userDetails.ethBalance === null ? '' : window.web3.utils.fromWei(state.userDetails.ethBalance.toString(), 'ether')
  }
}
