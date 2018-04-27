var AuctionFactory = artifacts.require('./auction/AuctionFactory.sol')
var EscrowFactory = artifacts.require('./escrow/EscrowFactory.sol')

module.exports = function(deployer) {
  deployer.deploy(AuctionFactory)
  deployer.deploy(EscrowFactory)
}
