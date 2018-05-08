var AuctionFactory = artifacts.require('./auction/AuctionFactory.sol')
var EscrowFactory = artifacts.require('./escrow/EscrowFactory.sol')
var BrandFundedFactory = artifacts.require('./escrow/BrandFundedFactory.sol')

module.exports = function(deployer) {
  deployer.deploy(AuctionFactory)
  deployer.deploy(EscrowFactory)
  deployer.deploy(BrandFundedFactory)
}
