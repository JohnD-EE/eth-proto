import {store} from './../../store'
import AuctionJSON from '../../../build/contracts/Auction.json'

export default {
  createAuction (payload) {
    console.log('Creating Auction: ', payload)

    const AuctionFactory = store.state.contracts['AuctionFactory']
    AuctionFactory.methods.createAuction(payload.bidIncrement, payload.startBlock, payload.endBlock, payload.saleItem)
    .send({from: payload.hostAddress, gas: 3000000})
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
      console.log(error)
    })
  },

  getAllAuctions () {
    const AuctionFactory = store.state.contracts['AuctionFactory']
    AuctionFactory.methods.allAuctions().call({from: store.state.userDetails.ethAccount})
    .then(res => {
      console.log('All Auctions: ', res)
      return res
    })
  },

  getAuctionData () {
    // let allAuctions = this.getAllAuctions()
    // console.log(allAuctions)
    let auctionAbi = AuctionJSON.abi
    //allAuctions.forEach(contractAddress => {
    const AuctionFactory = store.state.contracts['AuctionFactory']
    AuctionFactory.methods.allAuctions().call({from: store.state.userDetails.ethAccount})
    .then(res => {
      console.log(res)
      res.forEach(contractAddress => {
        console.log('processing address:', contractAddress )
      // create an instance of the Auction based on the reference
      let contract = new window.web3.eth.Contract(auctionAbi, contractAddress)
      window.web3.eth.getCode(contractAddress)
      .then(code => {
        if (code.length > 3) {
          console.log('Auction Contract: ', contract)
        } else {
          console.log('FAILED to get Auction Contract')
        }
      })
    })
    })
  },

  getAllAuctionsPromise () {
    const AuctionFactory = store.state.contracts['AuctionFactory']
    return new Promise((resolve, reject) => {
      return AuctionFactory.methods.allAuctions().call().then(result => {
        return Promise.all(result.map(auctionAddr => this.getAuction(auctionAddr)))
      }).then(auctions => {
        console.log(auctions, resolve)
      })
    })
  }
}
