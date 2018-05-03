import {store} from './../../store'
import EscrowJSON from '../../../build/contracts/Escrow.json'

export default {

  createEscrow (payload) {
    console.log('Creating Escrow: ', payload)
    const e = payload
    const EscrowFactory = store.state.contracts['EscrowFactory']
    EscrowFactory.methods.createEscrow(e.sellerAddress, e.buyerAddress, e.feePercent, e.saleItem)
    .send({from: e.escrowServiceAddress, gas: 3000000})
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
      return res
    })
  },

  updateEscrowData () {
    let escrowAbi = EscrowJSON.abi
    const EscrowFactory = store.state.contracts['EscrowFactory']
    EscrowFactory.methods.allEscrowContracts().call()
    .then(res => {
      console.log('res', res)
      res.forEach(contractAddress => {
        // create an instance of the Auction based on the reference
        let contract = new window.web3.eth.Contract(escrowAbi, contractAddress)
        window.web3.eth.getCode(contractAddress)
        .then(code => {
          if (code.length > 3) {
            let info = {}
            contract.methods.owner().call()
            .then(owner => {
              info.owner = owner
              contract.methods.sellerAddress().call()
              .then(sellerAddress => {
                info.sellerAddress = sellerAddress
                contract.methods.buyerAddress().call()
                .then(buyerAddress => {
                  info.buyerAddress = buyerAddress
                  contract.methods.feePercent().call()
                  .then(feePercent => {
                    info.feePercent = feePercent
                    contract.methods.escrowProviderAddress().call()
                    .then(escrowProviderAddress => {
                      info.escrowProviderAddress = escrowProviderAddress
                      contract.methods.saleItem().call()
                      .then(saleItem => {
                        info.saleItem = saleItem
                        contract.methods.sellerApprove().call()
                        .then(sellerApprove => {
                          info.sellerApprove = sellerApprove
                          contract.methods.buyerApprove().call()
                          .then(buyerApprove => {
                            info.buyerApprove = buyerApprove
                            contract.methods.escrowComplete().call()
                            .then(escrowComplete => {
                              info.escrowComplete = escrowComplete
                              console.log('escrow complete: ', info)
                              // store states
                              store.dispatch('registerEscrowContract', {
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
          } else {
            console.log('FAILED to get Escrow Contract')
          }
        })
      })
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
