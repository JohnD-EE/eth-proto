import helperUsers from '../helpers/userAccounts'

export default {
  getNotification: state => {
    let notificationsQueue = state.notificationsQueue
    console.log('Queue: ', notificationsQueue)
    if (notificationsQueue.length > 0) {
      return notificationsQueue.shift()
    }
    return false
  },
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
  userOpportunities: state => {
    return state.userOpportunities
  },
  currencyConverter: (state) => (inputValue, conversionKey) => {
    return (Number(state.currencyConversionRates[conversionKey]) * Number(inputValue)).toString()
  },
  allAuctionContracts: state => {
    let auctionItems = []
    let allUsersByEthAccount = helperUsers.getUsersByAddress()
    state.auctionContracts.forEach(res => {
      let host = 'N/A'
      if (res.info.owner === state.userDetails.ethAccount) {
        host = state.user.displayName
      } else {
        host = res.info.owner in allUsersByEthAccount ? allUsersByEthAccount[res.info.owner].displayName : 'N/A'
      }
      auctionItems.push({
        contractAddress: res.contractAddress,
        saleItem: res.info.item,
        ownerAddress: res.info.owner,
        host: host,
        userIsHost: res.info.owner === state.userDetails.ethAccount,
        status: 'ACTIVE',
        startBlock: res.info.startBlock,
        endBlock: res.info.endBlock,
        bidIncrement: Number(res.info.bidIncrement),
        myBid: Number(res.info.myBid),
        highestBid: Number(res.info.highestBid),
        highestBidder: res.info.highestBidder,
        highestBindingBid: Number(res.info.highestBindingBid),
        cancelled: res.info.cancelled,
        ownerHasWithdrawn: res.info.ownerHasWithdrawn,
        createdBlock: 1 // todo get this info
      })
    })
    return auctionItems.reverse()
  },
  allEscrowContracts: state => {
    let escrowItems = []
    let allUsersByEthAccount = helperUsers.getUsersByAddress()
    state.escrowContracts.forEach(res => {
      let agent = 'N/A'
      let seller = 'N/A'
      let buyer = 'N/A'
      if (res.info.owner === state.userDetails.ethAccount) {
        agent = state.user.displayName
      } else {
        agent = res.info.owner in allUsersByEthAccount ? allUsersByEthAccount[res.info.owner].displayName : 'N/A'
      }
      if (res.info.sellerAddress === state.userDetails.ethAccount) {
        seller = state.user.displayName
      } else {
        seller = res.info.sellerAddress in allUsersByEthAccount ? allUsersByEthAccount[res.info.sellerAddress].displayName : 'N/A'
      }
      if (res.info.buyer === state.userDetails.ethAccount) {
        buyer = state.user.displayName
      } else {
        buyer = res.info.buyerAddress in allUsersByEthAccount ? allUsersByEthAccount[res.info.buyerAddress].displayName : 'N/A'
      }

      let status = {text: '', color: ''}
      if (res.info.buyerApprove && !res.info.sellerApprove) {
        status.text = 'Pending Seller Approval'
        status.color = 'info'
      } else if (!res.info.buyerApprove && res.info.sellerApprove) {
        status.text = 'Pending Buyer Approval'
        status.color = 'info'
      } else if (res.info.escrowComplete) {
        status.text = 'Escrow Complete'
        status.color = 'primary'
      } else if (Number(res.info.balance) === 0) {
        status.text = 'Pending Fund Deposit'
        status.color = 'info'
      } else if (Number(res.info.balance) > 0) {
        status.text = 'Buyer Deposited'
        status.color = 'green'
      } else if (res.info.owner === 0) {
        // contract has self destructed (not sure if we need this because we delete)
        status.text = 'Void'
        status.color = 'black'
      }

      let userIsAgent = res.info.owner === state.userDetails.ethAccount
      let userIsSeller = res.info.sellerAddress === state.userDetails.ethAccount
      let userIsBuyer = res.info.buyerAddress === state.userDetails.ethAccount

      if (userIsAgent || userIsSeller || userIsBuyer) {
        escrowItems.push({
          contractAddress: res.contractAddress,
          status: status,
          saleItem: res.info.saleItem,
          ownerAddress: res.info.owner,
          sellerAddress: res.info.sellerAddress,
          buyerAddress: res.info.buyerAddress,
          agent: agent,
          seller: seller,
          buyer: buyer,
          userIsAgent: userIsAgent,
          userIsSeller: userIsSeller,
          userIsBuyer: userIsBuyer,
          feePercent: Number(res.info.feePercent),
          sellerApprove: res.info.sellerApprove,
          buyerApprove: res.info.buyerApprove,
          escrowComplete: res.info.escrowComplete,
          balance: Number(res.info.balance)
        })
      }
    })
    return escrowItems.reverse()
  },
  allBrandFundedContracts: state => {
    let escrowItems = []
    let allUsersByEthAccount = helperUsers.getUsersByAddress()
    state.brandFundedContracts.forEach(res => {
      let agent = 'N/A'
      let seller = 'N/A'
      let buyer = 'N/A'
      if (res.info.owner === state.userDetails.ethAccount) {
        agent = state.user.displayName
      } else {
        agent = res.info.owner in allUsersByEthAccount ? allUsersByEthAccount[res.info.owner].displayName : 'N/A'
      }
      if (res.info.sellerAddress === state.userDetails.ethAccount) {
        seller = state.user.displayName
      } else {
        seller = res.info.sellerAddress in allUsersByEthAccount ? allUsersByEthAccount[res.info.sellerAddress].displayName : 'N/A'
      }
      if (res.info.buyer === state.userDetails.ethAccount) {
        buyer = state.user.displayName
      } else {
        buyer = res.info.buyerAddress in allUsersByEthAccount ? allUsersByEthAccount[res.info.buyerAddress].displayName : 'N/A'
      }

      let status = {text: '', color: ''}
      if (res.info.buyerApprove && !res.info.sellerApprove) {
        status.text = 'Pending Retailer Approval'
        status.color = 'info'
      } else if (!res.info.buyerApprove && res.info.sellerApprove) {
        status.text = 'Pending Brand Approval'
        status.color = 'info'
      } else if (res.info.escrowComplete) {
        status.text = 'Promotion Complete'
        status.color = 'primary'
      } else if (Number(res.info.balance) === 0) {
        status.text = 'Pending Brand Funds'
        status.color = 'info'
      } else if (Number(res.info.balance) > 0) {
        status.text = 'Brand Funded'
        status.color = 'green'
      } else if (res.info.owner === 0) {
        // contract has self destructed (not sure if we need this because we delete)
        status.text = 'Void'
        status.color = 'black'
      }

      let userIsAgent = res.info.owner === state.userDetails.ethAccount
      let userIsSeller = res.info.sellerAddress === state.userDetails.ethAccount
      let userIsBuyer = res.info.buyerAddress === state.userDetails.ethAccount

      if (userIsAgent || userIsSeller || userIsBuyer) {
        escrowItems.push({
          contractAddress: res.contractAddress,
          status: status,
          saleItem: res.info.saleItem,
          ownerAddress: res.info.owner,
          sellerAddress: res.info.sellerAddress,
          buyerAddress: res.info.buyerAddress,
          agent: agent,
          seller: seller,
          buyer: buyer,
          userIsAgent: userIsAgent,
          userIsSeller: userIsSeller,
          userIsBuyer: userIsBuyer,
          feePercent: Number(res.info.feePercent),
          sellerApprove: res.info.sellerApprove,
          buyerApprove: res.info.buyerApprove,
          escrowComplete: res.info.escrowComplete,
          balance: Number(res.info.balance)
        })
      }
    })
    return escrowItems.reverse()
  },

  allEIP20Contracts: state => {
    let eip20Items = []
    let allUsersByEthAccount = helperUsers.getUsersByAddress()

    state.eip20Contracts.forEach(res => {
      let status = {text: '', color: ''}
      status.text = 'Active'
      status.color = 'green'

      let exchangeRateMode = null
      let exchangeRateToEth = null
      if (!res.info.isPointsOnly) {
        if (res.info.exchangeRateToEth) {
          exchangeRateToEth = res.info.exchangeRateToEth
          exchangeRateMode = 'fixed'
        } else {
          exchangeRateToEth = ((1000000 / res.info.totalSupply) + (Math.random() / (res.info.totalSupply / 10000))).toFixed(8)
          exchangeRateMode = 'floating'
        }
      }
      let issuer = 'N/A'
      let userIsIssuer = res.info.issuer === state.userDetails.ethAccount
      if (userIsIssuer) {
        issuer = state.user.displayName
      } else {
        issuer = res.info.issuer in allUsersByEthAccount ? allUsersByEthAccount[res.info.issuer].displayName : 'N/A'
      }

      eip20Items.push({
        contractAddress: res.contractAddress,
        status: status,
        name: res.info.name,
        symbol: res.info.symbol,
        decimals: res.info.decimals,
        isPointsOnly: res.info.isPointsOnly,
        isToken: true, // EIP20 Contracts will always be tokens compared with ETH which is non-token
        exchangeRateToEth: exchangeRateToEth,
        exchangeRateMode: exchangeRateMode,
        totalSupply: res.info.totalSupply,
        userBalance: res.info.balance, // User's Balance
        userIsIssuer: userIsIssuer,
        issuer: issuer,
        isTransferable: res.info.isTransferable
      })
    })
    return eip20Items
  },

  allSmartCouponContracts: state => {
    let smartCouponItems = []
    let allUsersByEthAccount = helperUsers.getUsersByAddress()

    state.smartCouponContracts.forEach(res => {
      let status = {text: '', color: ''}
      status.text = 'Active'
      status.color = 'green'

    smartCouponItems.push({
      contractAddress: res.contractAddress,
      status: status,
      promotionName: res.info.promotionName,
      couponQualifyingProductSKUs: res.info.couponQualifyingProductSKUs,
      couponFixedDiscount: res.info.couponFixedDiscount,
      couponPercentDiscount: res.info.couponPercentDiscount,
      couponQualifyingSpend: res.info.couponQualifyingSpend,
      couponDiscountType: res.info.couponDiscountType,
      couponReusePolicy: res.info.couponReusePolicy,
      couponPromotersAllowed: res.info.couponPromotersAllowed,
      couponPromoterFee: res.info.couponPromoterFee,
      couponExpiryBlock: res.info.couponExpiryBlock
      })
    })
    return smartCouponItems
  }
}
