import {store} from './../../store'
import EIP20JSON from '../../../build/contracts/EIP20.json'

export default {

  createCurrency (payload) {
    console.log('Creating Currency: ', payload)
    const e = payload
    const EIP20Factory = store.state.contracts['EIP20Factory']
    EIP20Factory.methods.createEIP20(e.initialSupply, e.currencyName, e.decimals, e.currencySymbol, e.exhangeRateToEth, e.isPointsOnly)
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
    EIP20Factory.methods.allEIP20Contracts().call()
    .then(res => {
      return res
    })
  },

  updateEIP20Data () {
    let eip20Abi = EIP20JSON.abi
    const EIP20Factory = store.state.contracts['EIP20Factory']
    EIP20Factory.methods.allEIP20Contracts().call()
    .then(res => {
      console.log('res', res)
      res.forEach(contractAddress => {
        // create an instance of the Auction based on the reference
        let contract = new window.web3.eth.Contract(eip20Abi, contractAddress)
        window.web3.eth.getCode(contractAddress)
        .then(code => {
          if (code.length > 3) {
            let info = {}
            contract.methods.name().call()
            .then(name => {
              info.name = name
              contract.methods.symbol().call()
              .then(symbol => {
                info.symbol = symbol
                contract.methods.decimals().call()
                .then(decimals => {
                  info.decimals = decimals
                  contract.methods.totalSupply().call()
                  .then(totalSupply => {
                    info.totalSupply = totalSupply
                    console.log('got contract: ', info)
                    // store states
                    store.dispatch('registerEIP20Contracts', {
                      contractAddress: contractAddress,
                      contract: contract,
                      info: info
                    })
                  })
                })
              })
            })
          } else {
            console.log('FAILED to get EIP20 Contract', contractAddress)
          }
        })
      })
    })
  }
}
