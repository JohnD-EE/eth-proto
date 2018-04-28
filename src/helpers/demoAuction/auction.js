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
    let auctionAbi = AuctionJSON.abi
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
          let info = {}
          contract.methods.bidIncrement().call({from: store.state.userDetails.ethAccount})
          .then(bidIncrement => {
            console.log('BidIncrement: ', bidIncrement)
            info.bidIncrement = bidIncrement
            contract.methods.startBlock().call({from: store.state.userDetails.ethAccount})
            .then(startBlock => {
              console.log('startBlock: ', startBlock)
              info.startBlock = startBlock
              contract.methods.endBlock().call({from: store.state.userDetails.ethAccount})
              .then(endBlock => {
                console.log('endBlock: ', endBlock)
                info.endBlock = endBlock
                contract.methods.saleItem().call({from: store.state.userDetails.ethAccount})
                .then(saleItem => {
                  console.log('Item: ', saleItem)
                  info.item = saleItem
                  contract.methods.getHighestBid().call({from: store.state.userDetails.ethAccount})
                  .then(highestBid => {
                    console.log('HighestBid: ', highestBid)
                    info.highestBid = highestBid

                  //store states
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
          } else {
          console.log('FAILED to get Auction Contract')
        }
      })
    })
    })
  },

  getAuctionInformation(auctionContract) {
    // call the contract and get info
    //get bidIncrement

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
