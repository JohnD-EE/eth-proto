const AuctionFactory = artifacts.require('./auction/AuctionFactory.sol')
const EscrowFactory = artifacts.require('./escrow/EscrowFactory.sol')
const BrandFundedFactory = artifacts.require('./escrow/BrandFundedFactory.sol')
const EIP20Factory = artifacts.require('./escrow/EIP20Factory.sol')

module.exports = function(deployer) {
  deployer.deploy(AuctionFactory)
  deployer.deploy(EscrowFactory)
  deployer.deploy(BrandFundedFactory)
  deployer.deploy(EIP20Factory)
}
