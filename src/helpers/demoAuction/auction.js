import {store} from './../../store'
import ContractsHelper from '../contracts'
import AuctionJSON from '../../../build/contracts/Auction.json'

export default {
  createAuction (payload) {
    const AuctionFactory = store.state.contracts['AuctionFactory']
    AuctionFactory.methods.createAuction(payload.bidIncrement, payload.startBlock, payload.endBlock, payload.saleItem)
    .send({
      from: payload.hostAddress,
      gas: 3000000})
    .on('transactionHash', function (hash) {
      store.dispatch('newNotification', {
        title: 'Create Auction - New transaction to process',
        text: hash,
        type: 'success'
      })
      console.log('TransactionHash: ', hash)
    })
    .on('receipt', function (receipt) {
      store.dispatch('newNotification', {
        title: 'Transaction completed',
        type: 'success'
      })
      console.log('Receipt: ', receipt)
    })
    .on('confirmation', function (confirmationNumber, receipt) {
      console.log('conf: ', confirmationNumber)
      console.log('Receipt: ', receipt)
    })
    .on('error', function (error) {
      store.dispatch('newNotification', {
        title: 'Transaction Failed',
        text: error,
        type: 'error'
      })
      console.log(error)
    })
  },

  getAllAuctions () {
    const AuctionFactory = store.state.contracts['AuctionFactory']
    AuctionFactory.methods.allAuctions().call()
    .then(res => {
      return res
    })
  },

  updateAuctionData () {
    let auctionAbi = AuctionJSON.abi
    const AuctionFactory = store.state.contracts['AuctionFactory']
    if (AuctionFactory.length === 0) {
      return false
    }
    AuctionFactory.methods.allAuctions().call()
    .then(res => {
      res.forEach(contractAddress => {
        // create an instance of the Auction based on the reference
        let contract = new window.web3.eth.Contract(auctionAbi, contractAddress)
        window.web3.eth.getCode(contractAddress)
        .then(code => {
          if (code.length > 3) {
            let info = {}
            contract.methods.bidIncrement().call()
            .then(bidIncrement => {
              info.bidIncrement = window.web3.utils.fromWei(bidIncrement, 'ether')
              contract.methods.startBlock().call()
              .then(startBlock => {
                info.startBlock = startBlock
                contract.methods.endBlock().call()
                .then(endBlock => {
                  info.endBlock = endBlock
                  contract.methods.saleItem().call()
                  .then(saleItem => {
                    info.item = saleItem
                    contract.methods.getHighestBid().call()
                    .then(highestBid => {
                      info.highestBid = window.web3.utils.fromWei(highestBid, 'ether')
                      contract.methods.owner().call()
                      .then(owner => {
                        info.owner = owner
                        contract.methods.fundsByBidder(store.state.userDetails.ethAccount).call()
                        .then(myBid => {
                          info.myBid = window.web3.utils.fromWei(myBid, 'ether')
                          contract.methods.highestBidder().call()
                          .then(highestBidder => {
                            info.highestBidder = highestBidder
                            contract.methods.highestBindingBid().call()
                            .then(highestBindingBid => {
                              info.highestBindingBid = window.web3.utils.fromWei(highestBindingBid, 'ether')
                              contract.methods.cancelled().call()
                              .then(cancelled => {
                                info.cancelled = cancelled
                                contract.methods.ownerHasWithdrawn().call()
                                .then(ownerHasWithdrawn => {
                                  info.ownerHasWithdrawn = ownerHasWithdrawn
                                  // store states
                                  store.dispatch('registerAuctionContract', {
                                    contractAddress: contractAddress,
                                    contract: contract,
                                    info: info
                                  })
                                })
                              })
                            })
                          })
                        })
                      })
                    })
                  })
                })
              })
            })
          } else {
            console.log('FAILED to get Auction Contract')
          }
        })
      })
    })
  },

  placeBid (contractAddress, bidValue) {
    let contract = ContractsHelper.getContractFromAddress(store.state.auctionContracts, contractAddress)
    // let contract = store.state.auctionContracts[contractAddress].contract
    contract.methods.placeBid().send({
      from: store.state.userDetails.ethAccount,
      value: window.web3.utils.toWei(bidValue.toString(), 'ether'),
      gas: 3000000
    })
    .on('transactionHash', function (hash) {
      store.dispatch('newNotification', {
        title: 'Place Bid - New transaction to process',
        text: hash,
        type: 'success'
      })
      console.log('TransactionHash: ', hash)
    })
    .on('receipt', function (receipt) {
      store.dispatch('newNotification', {
        title: 'Transaction completed',
        type: 'success'
      })
      console.log('Receipt: ', receipt)
    })
    .on('confirmation', function (confirmationNumber, receipt) {
      //
    })
    .on('error', function (error) {
      store.dispatch('newNotification', {
        title: 'Transaction Failed - Bid was not placed',
        text: error,
        type: 'error'
      })
      console.log(error)
    })
  },

  cancelAuction (contractAddress) {
    let contract = ContractsHelper.getContractFromAddress(store.state.auctionContracts, contractAddress)
    contract.methods.cancelAuction().send({
      from: store.state.userDetails.ethAccount,
      gas: 3000000
    })
    .on('transactionHash', function (hash) {
      store.dispatch('newNotification', {
        title: 'Request to cancel auction - New transaction to process',
        text: hash,
        type: 'success'
      })
      console.log('TransactionHash: ', hash)
    })
    .on('receipt', function (receipt) {
      store.dispatch('newNotification', {
        title: 'Transaction completed',
        type: 'success'
      })
      console.log('Receipt: ', receipt)
    })
    .on('confirmation', function (confirmationNumber, receipt) {
      //
    })
    .on('error', function (error) {
      store.dispatch('newNotification', {
        title: 'Transaction Failed',
        text: error,
        type: 'error'
      })
      console.log(error)
    })
  },

  withdrawFunds (contractAddress) {
    let contract = ContractsHelper.getContractFromAddress(store.state.auctionContracts, contractAddress)
    contract.methods.withdraw().send({
      from: store.state.userDetails.ethAccount,
      gas: 6000000
    })
    .on('transactionHash', function (hash) {
      store.dispatch('newNotification', {
        title: 'Fund Withdrawal - New transaction to process',
        text: hash,
        type: 'success'
      })
      console.log('TransactionHash: ', hash)
    })
    .on('receipt', function (receipt) {
      store.dispatch('newNotification', {
        title: 'Transaction completed',
        type: 'success'
      })
      console.log('Receipt: ', receipt)
    })
    .on('confirmation', function (confirmationNumber, receipt) {
      //
    })
    .on('error', function (error) {
      store.dispatch('newNotification', {
        title: 'Transaction Failed',
        text: error,
        type: 'error'
      })
      console.log(error)
    })
  }

  // getAllAuctionsPromise () {
  // const AuctionFactory = store.state.contracts['AuctionFactory']
  // return new Promise((resolve, reject) => {
    //  return AuctionFactory.methods.allAuctions().call().then(result => {
      //  return Promise.all(result.map(auctionAddr => this.getAuction(auctionAddr)))
    //  }).then(auctions => {
      //  console.log(auctions, resolve)
    //  })
  //  })
// }
}
