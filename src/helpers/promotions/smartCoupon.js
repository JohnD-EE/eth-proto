import {store} from './../../store'
import SmartCouponJSON from '../../../build/contracts/SmartCoupon.json'

export default {

  createSmartCoupon (payload) {
    console.log('Creating Smart Contract: ', payload)
    const e = payload
    const SmartCouponFactory = store.state.contracts['SmartCouponFactory']
    console.log('Smart Coupon Factory', SmartCouponFactory)
    SmartCouponFactory.methods.createSmartCoupon(
      e.promotionName,
      e.couponQualifyingProductSKUs,
      e.couponPercentDiscount,
      e.couponQualifyingCurrency,
      e.couponQualifyingSpend,
      e.couponReusePolicy,
      e.couponPromoterFee,
      e.couponExpiryBlock
      )
    .send({from: e.owner, gas: 3000000})
    .on('transactionHash', function (hash) {
      store.dispatch('newNotification', {
        title: 'Create Smart Coupon - New transaction to process',
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

  getAllSmartCoupons () {
    const SmartCouponFactory = store.state.contracts['SmartCouponFactory']
    SmartCouponFactory.methods.allSmartCouponContracts().call()
    .then(res => {
      return res
    })
  },

  updateSmartCouponsData () {
    let smartCouponAbi = SmartCouponJSON.abi
    const SmartCouponFactory = store.state.contracts['SmartCouponFactory']
    if (SmartCouponFactory.length === 0) {
      return false
    }
    SmartCouponFactory.methods.allSmartCouponContracts().call()
    .then(res => {
      console.log('All Smart Coupon Contracts: ', res)
      res.forEach(contractAddress => {
        // create an instance of the EIP contract based on the reference
        let contract = new window.web3.eth.Contract(smartCouponAbi, contractAddress)
        window.web3.eth.getCode(contractAddress)
        .then(code => {
          if (code.length > 3) {
            let info = {}
            contract.methods.promotionName().call()
            .then(promotionName => {
              info.promotionName = promotionName
              contract.methods.getAllCouponQualifyingProductSKUs().call()
              .then(couponQualifyingProductSKUs => {
                info.couponQualifyingProductSKUs = couponQualifyingProductSKUs
                contract.methods.couponQualifyingCurrency().call()
                .then(couponQualifyingCurrency => {
                  info.couponQualifyingCurrency = couponQualifyingCurrency
                  contract.methods.couponPercentDiscount().call()
                  .then(couponPercentDiscount => {
                    info.couponPercentDiscount = couponPercentDiscount
                    contract.methods.couponQualifyingSpend().call()
                    .then(couponQualifyingSpend => {
                      info.couponQualifyingSpend = couponQualifyingSpend
                      contract.methods.couponDiscountType().call()
                      .then(couponDiscountType => {
                        info.couponDiscountType = couponDiscountType
                        contract.methods.couponReusePolicy().call()
                        .then(couponReusePolicy => {
                          info.couponReusePolicy = couponReusePolicy
                          contract.methods.couponPromotersAllowed().call()
                          .then(couponPromotersAllowed => {
                            info.couponPromotersAllowed = couponPromotersAllowed
                            contract.methods.couponPromoterFee().call()
                            .then(couponPromoterFee => {
                              info.couponPromoterFee = couponPromoterFee
                              contract.methods.couponExpiryBlock().call()
                              .then(couponExpiryBlock => {
                                info.couponExpiryBlock = couponExpiryBlock
                                console.log('Got Smart Coupon Contract: ', info)
                                // store states
                                store.dispatch('registerSmartCouponContracts', {
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
            })
          } else {
            console.log('FAILED to get Smart Coupon Contract', contractAddress)
          }
        })
      })
    })
  }

}
