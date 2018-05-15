import {store} from './../../store'
import EIP20JSON from '../../../build/contracts/EIP20.json'

export default {

  createCurrency (payload) {
    console.log('Creating Currency: ', payload)
    const e = payload
    const EIP20Factory = store.state.contracts['EIP20Factory']
    EIP20Factory.methods.createEIP20(e.initialSupply, e.currencyName, e.decimals, e.currencySymbol)
    .send({from: e.owner, gas: 3000000})
    .on('transactionHash', function (hash) {
      store.dispatch('newNotification', {
        title: 'Create Currency - New transaction to process',
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

  getAllCurrencies () {
    const EIP20Factory = store.state.contracts['EIP20Factory']
    // EIP20Factory.methods.allEIP20Contracts().call({from: store.state.userDetails.ethAccount})
    // .then(res => {
    //  return res
  //  })
  // }

  EIP20Factory.methods.created(store.state.userDetails.ethAccount).call({from: store.state.userDetails.ethAccount})
    .then(res => {
      console.log(res)
    })
  }

}
