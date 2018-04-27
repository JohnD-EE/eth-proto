import {store} from './../../store'

export default {

  createEscrow (payload) {
    console.log('Creating Escrow: ', payload)
    const e = payload
    const EscrowFactory = store.state.contracts['EscrowFactory']
    EscrowFactory.methods.createEscrow(e.sellerAddress, e.buyerAddress, e.feePercent, e.saleItem)
    .send({from: e.escrowServiceAddress})
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

  getAllEscrowContracts () {
    const EscrowFactory = store.state.contracts['EscrowFactory']
    EscrowFactory.methods.allEscrowContracts().call({from: store.state.userDetails.ethAccount})
    .then(res => {
      console.log('All Escrow Contracts: ', res)
    })
  },

  depositBuyerFunds () {

    //

  },

  approve () {

    //

  },

  voidContract () {

    //

  }

}
