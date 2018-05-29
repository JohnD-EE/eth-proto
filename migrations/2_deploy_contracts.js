const AuctionFactory = artifacts.require('./auction/AuctionFactory.sol')
const EscrowFactory = artifacts.require('./escrow/EscrowFactory.sol')
const BrandFundedFactory = artifacts.require('./escrow/BrandFundedFactory.sol')
const EIP20Factory = artifacts.require('./escrow/EIP20Factory.sol')
const SmartCouponFactory = artifacts.require('./promotions/SmartCouponFactory.sol')
const SmartVoucherFactory = artifacts.require('./promotions/SmartVoucherFactory.sol')
const SmartOfferFactory = artifacts.require('./promotions/SmartOfferFactory.sol')

module.exports = function(deployer) {
  deployer.deploy(AuctionFactory)
  deployer.deploy(EscrowFactory)
  deployer.deploy(BrandFundedFactory)
  deployer.deploy(EIP20Factory)
  deployer.deploy(SmartCouponFactory)
  deployer.deploy(SmartVoucherFactory)
  deployer.deploy(SmartOfferFactory)
}
