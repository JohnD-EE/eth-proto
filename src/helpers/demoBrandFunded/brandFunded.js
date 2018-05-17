import {store} from './../../store'
import BrandFundedJSON from '../../../build/contracts/BrandFunded.json'
import ContractsHelper from '../contracts'

export default {

  createEscrow (payload) {
    console.log('Creating Brand Funded: ', payload)
    const e = payload
    const BrandFundedFactory = store.state.contracts['BrandFundedFactory']
    BrandFundedFactory.methods.createEscrow(e.sellerAddress, e.buyerAddress, e.feePercent, e.saleItem)
    .send({from: e.escrowServiceAddress, gas: 3000000})
    .on('transactionHash', function (hash) {
      store.dispatch('newNotification', {
        title: 'Create Brand Funded Promo - New transaction to process',
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

  getAllEscrowContracts () {
    const BrandFundedFactory = store.state.contracts['BrandFundedFactory']
    BrandFundedFactory.methods.allEscrowContracts().call()
    .then(res => {
      return res
    })
  },

  updateEscrowData () {
    let brandFundedAbi = BrandFundedJSON.abi
    const BrandFundedFactory = store.state.contracts['BrandFundedFactory']
    if (BrandFundedFactory.length === 0) {
      return false
    }
    BrandFundedFactory.methods.allEscrowContracts().call()
    .then(res => {
      console.log('res', res)
      res.forEach(contractAddress => {
        // create an instance of the Auction based on the reference
        let contract = new window.web3.eth.Contract(brandFundedAbi, contractAddress)
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
                            contract.methods.balances(buyerAddress).call()
                            .then(balance => {
                              info.balance = window.web3.utils.fromWei(balance, 'ether')
                              console.log('BrandFunded complete: ', info)
                              // store states
                              store.dispatch('registerBrandFundedContract', {
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
            console.log('FAILED to get Brand Funded Promo Contract (E.g. could be voided)', contractAddress)
          }
        })
      })
    })
  },

  depositBuyerFunds (contractAddress, depositValue) {
    let contract = ContractsHelper.getContractFromAddress(store.state.brandFundedContracts, contractAddress)
    contract.methods.depositBuyerFunds().send({
      from: store.state.userDetails.ethAccount,
      value: window.web3.utils.toWei(depositValue.toString(), 'ether'),
      gas: 3000000
    })
    .on('transactionHash', function (hash) {
      store.dispatch('newNotification', {
        title: 'Deposit Funds - New transaction to process',
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
        title: 'Transaction Failed - Funds were not deposited',
        text: error,
        type: 'error'
      })
      console.log(error)
    })
  },

  approveContract (contractAddress) {
    let contract = ContractsHelper.getContractFromAddress(store.state.brandFundedContracts, contractAddress)
    contract.methods.approve().send({
      from: store.state.userDetails.ethAccount,
      gas: 3000000
    })
    .on('transactionHash', function (hash) {
      store.dispatch('newNotification', {
        title: 'Request to approve Brand Funded contract - New transaction to process',
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

  voidContract (contractAddress) {
    let contract = ContractsHelper.getContractFromAddress(store.state.brandFundedContracts, contractAddress)
    contract.methods.voidContract().send({
      from: store.state.userDetails.ethAccount,
      gas: 3000000
    })
    .on('transactionHash', function (hash) {
      store.dispatch('newNotification', {
        title: 'Request to void the Brand Funded contract - New transaction to process',
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
      // update Escrow state by removing this contract
      store.dispatch('removeEscrowContract', contractAddress)
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
}
