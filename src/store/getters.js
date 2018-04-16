export default {
  isAuthenticated: state => {
    return state.user.loggedIn !== null &&
    state.user.loggedIn !== undefined &&
    state.user.loggedIn !== false
  },
  balanceToEther: state => {
    return parseFloat(state.userDetails.ethBalance === null ? '' : window.web3.utils.fromWei(state.userDetails.ethBalance.toString(), 'ether'))
  },
  allUsers: (state) => (excludeLoggedinUser = false) => {
    let allUsers = state.allUsers
    if (excludeLoggedinUser) {
      allUsers = allUsers.filter(x => x.ethAccount !== state.userDetails.ethAccount)
    }
    return allUsers
  },
  userTxs: state => {
    // arrange allUsers by addresses
    let usersByAccount = []
    state.allUsers.forEach(res => {
      usersByAccount[res.ethAccount] = res
    })

    let userTxs = []
    let ethAccount = state.userDetails.ethAccount
    state.userTxs.forEach(tx => {
      let amount = window.web3.utils.fromWei(tx.value, 'ether')
      if (tx.from === ethAccount) {
        amount = -amount
      }
      let fees = 0
      if (tx.from === ethAccount) {
        fees = -window.web3.utils.fromWei((tx.gas * Number(tx.gasPrice)).toString(), 'ether')
      }

      userTxs.push({
        value: false,
        name: usersByAccount[tx.from === ethAccount ? tx.to : tx.from].displayName,
        address: (tx.from === ethAccount ? tx.to : tx.from),
        amount: amount,
        fees: fees,
        block: tx.blockNumber,
        blockHash: tx.blockHash,
        txHash: tx.hash,
        confirmations: '#conf',
        balance: window.web3.utils.fromWei(tx.balance, 'ether')
      })
    })
    return userTxs.reverse()
  }
}
