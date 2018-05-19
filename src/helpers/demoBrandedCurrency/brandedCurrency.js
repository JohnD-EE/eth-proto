import {store} from './../../store'
import EIP20JSON from '../../../build/contracts/EIP20.json'
import ContractsHelper from '../contracts'

export default {

  createCurrency (payload) {
    console.log('Creating Currency: ', payload)
    const e = payload
    const EIP20Factory = store.state.contracts['EIP20Factory']
    EIP20Factory.methods.createEIP20(e.initialSupply, e.currencyName, e.decimals, e.currencySymbol, e.exchangeRateToEth, e.isPointsOnly, e.owner)
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
    let userAddress = store.state.userDetails.ethAccount
    const EIP20Factory = store.state.contracts['EIP20Factory']
    if (EIP20Factory.length === 0) {
      return false
    }
    EIP20Factory.methods.allEIP20Contracts().call()
    .then(res => {
      console.log('All EIP20 Contracts: ', res)
      res.forEach(contractAddress => {
        // create an instance of the EIP contract based on the reference
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
                  contract.methods.isPointsOnly().call()
                  .then(isPointsOnly => {
                    info.isPointsOnly = isPointsOnly
                    contract.methods.exchangeRateToEth().call()
                    .then(exchangeRateToEth => {
                      info.exchangeRateToEth = exchangeRateToEth
                      contract.methods.totalSupply().call()
                      .then(totalSupply => {
                        info.totalSupply = totalSupply
                        contract.methods.issuer().call()
                        .then(issuer => {
                          info.issuer = issuer
                          contract.methods.balances(userAddress).call()
                          .then(balance => {
                            info.balance = balance
                            console.log('Got EIP20 Contract: ', info)
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
  },

  buyOrder (payload) {
    console.log('buyOrder', payload)
    let contractAddress = payload.contractAddress
    let amount = Number(payload.amount)
    let exchangeRateToEth = payload.exchangeRateToEth
    let cost = Number(exchangeRateToEth * amount).toString()
    console.log('cost', cost)
    console.log('amount', amount)
    let from = payload.from
    let contract = ContractsHelper.getContractFromAddress(store.state.eip20Contracts, contractAddress)
    contract.methods.buyOrder(amount).send({
      from: from,
      value: window.web3.utils.toWei(cost, 'ether'),
      gas: 3000000
    })
    .on('transactionHash', function (hash) {
      store.dispatch('newNotification', {
        title: 'Buying Currency - New transaction to process',
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
        title: 'Transaction Failed - Buy Order did not complete',
        text: error,
        type: 'error'
      })
      console.log(error)
    })
  },

  sellOrder (payload) {
    console.log('sellOrder', payload)
    let contractAddress = payload.contractAddress
    let amount = Number(payload.amount)
    let exchangeRateToEth = payload.exchangeRateToEth
    let value = Number(exchangeRateToEth * amount).toString()
    console.log('value', value)
    console.log('amount', amount)
    let from = payload.from
    let contract = ContractsHelper.getContractFromAddress(store.state.eip20Contracts, contractAddress)
    contract.methods.sellOrder(amount, window.web3.utils.toWei(value, 'ether')).send({
      from: from,
      gas: 3000000
    })
    .on('transactionHash', function (hash) {
      store.dispatch('newNotification', {
        title: 'Selling Currency - New transaction to process',
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
        title: 'Transaction Failed - Sell Order did not complete',
        text: error,
        type: 'error'
      })
      console.log(error)
    })
  }
}
