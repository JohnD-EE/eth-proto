import {store} from './../../store'
import ContractsHelper from '../contracts'
import AuctionJSON from '../../../build/contracts/Auction.json'

export default {
  createAuction (payload) {
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
      return res
    })
  },

  getAuctionData () {
    let auctionAbi = AuctionJSON.abi
    const AuctionFactory = store.state.contracts['AuctionFactory']
    AuctionFactory.methods.allAuctions().call({from: store.state.userDetails.ethAccount})
    .then(res => {

      res.forEach(contractAddress => {
      // create an instance of the Auction based on the reference
      let contract = new window.web3.eth.Contract(auctionAbi, contractAddress)
      window.web3.eth.getCode(contractAddress)
      .then(code => {
        if (code.length > 3) {
          let info = {}
          contract.methods.bidIncrement().call({from: store.state.userDetails.ethAccount})
          .then(bidIncrement => {
            info.bidIncrement = bidIncrement
            contract.methods.startBlock().call({from: store.state.userDetails.ethAccount})
            .then(startBlock => {
              info.startBlock = startBlock
              contract.methods.endBlock().call({from: store.state.userDetails.ethAccount})
              .then(endBlock => {
                info.endBlock = endBlock
                contract.methods.saleItem().call({from: store.state.userDetails.ethAccount})
                .then(saleItem => {
                  info.item = saleItem
                  contract.methods.getHighestBid().call({from: store.state.userDetails.ethAccount})
                  .then(highestBid => {
                    info.highestBid = window.web3.utils.fromWei(highestBid, 'ether')
                    contract.methods.owner().call({from: store.state.userDetails.ethAccount})
                    .then(owner=> {
                      info.owner = owner

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
          })
          } else {
          console.log('FAILED to get Auction Contract')
        }
      })
    })
    })
  },

  placeBid (contractAddress, bidValue) {
    console.log('placeBid on:', contractAddress)
    console.log('bid contract:', store.state.auctionContracts)
    let contract = ContractsHelper.getContractFromAddress(store.state.auctionContracts, contractAddress)
    console.log('returned contract', contract)
      // let contract = store.state.auctionContracts[contractAddress].contract
      contract.methods.placeBid().send({
        from: store.state.userDetails.ethAccount,
        value: window.web3.utils.toWei(bidValue.toString(), 'ether') })
      .then(res => {
        console.log(res)
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
