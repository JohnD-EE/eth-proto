export default {
  isAuthenticated: state => {
    return state.user.loggedIn !== null &&
    state.user.loggedIn !== undefined &&
    state.user.loggedIn !== false
  },
  balanceToEther: state => {
    if (state.userDetails.ethBalance === null) {
      return null
    }
    return parseFloat(window.web3.utils.fromWei(state.userDetails.ethBalance.toString(), 'ether'))
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

      // If the transaction is with a contract, it won't relate to a user name
      let name = 'N/A'
      let otherParty = (tx.from === ethAccount ? tx.to : tx.from)
      if (otherParty in usersByAccount) {
        name = usersByAccount[otherParty].displayName
      }

      userTxs.push({
        value: false,
        name: name,
        address: otherParty,
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
