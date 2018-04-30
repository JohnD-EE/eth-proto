import helperUsers from '../helpers/userAccounts'

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
    return Number(window.web3.utils.fromWei(state.userDetails.ethBalance.toString(), 'ether'))
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
        fees = -window.web3.utils.fromWei((tx.gasUsed * Number(tx.gasPrice)).toString(), 'ether')
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
        amount: Number(amount),
        fees: Number(fees),
        block: tx.blockNumber,
        blockHash: tx.blockHash,
        txHash: tx.hash,
        balance: Number(window.web3.utils.fromWei(tx.balance, 'ether'))
      })
    })
    return userTxs.reverse()
  },

  allAuctionContracts: state => {
    let auctionItems = []
    let allUsersByEthAccount = helperUsers.getUsersByAddress()
    state.auctionContracts.forEach(res => {
      auctionItems.push({
        contractAddress: res.contractAddress,
        saleItem: res.info.item,
        ownerAddress: res.info.owner,
        host: res.info.owner === state.userDetails.ethAccount ? state.user.displayName : allUsersByEthAccount[res.info.owner].displayName || 'N/A',
        userIsHost: res.info.owner === state.userDetails.ethAccount,
        status: 'ACTIVE',
        startBlock: res.info.startBlock,
        endBlock: res.info.endBlock,
        bidIncrement: Number(res.info.bidIncrement),
        myBid: Number(res.info.myBid),
        highestBid: Number(res.info.highestBid),
        highestBidder: res.info.highestBidder,
        minQualifyingBid: Number(res.info.highestBid) + Number(res.info.bidIncrement),
        cancelled: res.info.cancelled,
        createdBlock: 1 // todo get this info
      })
    })
    return auctionItems.reverse()
  }
}
