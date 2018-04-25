import {store} from './../../store'

export default {
  createAuction (payload) {
    console.log('Creating Auction: ', payload)

    const AuctionFactory = store.state.contracts['AuctionFactory']
    AuctionFactory.methods.createAuction(payload.bidIncrement, payload.startBlock, payload.endBlock, payload.saleItem)
    .send({from: payload.hostAddress})
    .on('transactionHash', function (hash) {
    console.log('TransactionHash: ', hash)
    })
    .on('receipt', function (receipt) {
    console.log('Receipt: ', receipt)
    })
    .on('confirmation', function (confirmationNumber, receipt) {
    console.log('conf: ', confirmationNumber)
    console.log('Receipt: ', receipt)
    })
    .on('error', function (error) {
      console.log(error);
    })
    //.on('error', console.error);
    //.then(receipt => {
    //  console.log('Receipt: ', receipt)
    //  return receipt
    // })
  },

  getAllAuctionsOLD () {
    const AuctionFactory = store.state.contracts['AuctionFactory']
    AuctionFactory.methods.allAuctions().call({from: store.state.userDetails.ethAccount})
    .then(res => {
      console.log('All Auctions: ', res)
    })
  },

  getAllAuctions () {
const AuctionFactory = store.state.contracts['AuctionFactory']
    return new Promise((resolve, reject) => {
                return AuctionFactory.methods.allAuctions().call().then(result => {
                    return Promise.all( result.map(auctionAddr => this.getAuction(auctionAddr)) )
                }).then(auctions => {
                    console.log( auctions, resolve)
                })
            })

  }

}
