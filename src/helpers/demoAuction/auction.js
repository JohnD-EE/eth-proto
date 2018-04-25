import {store} from './../../store'

export default {
  createAuction (payload) {
    console.log('Creating Auction: ', payload)

    const AuctionFactory = store.state.contracts['AuctionFactory']
    AuctionFactory.methods.createAuction(payload.bidIncrement, payload.startBlock, payload.endBlock, payload.saleItem)
    .send({from: payload.hostAddress})
    .then(receipt => {
      console.log('Receipt: ', receipt)
      return receipt
    })
  }
}
