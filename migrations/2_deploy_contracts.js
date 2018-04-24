var AuctionFactory = artifacts.require('./auction/AuctionFactory.sol')

module.exports = function(deployer) {
  deployer.deploy(AuctionFactory)
}
