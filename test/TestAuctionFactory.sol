pragma solidity ^0.4.17;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/auction/AuctionFactory.sol";

contract TestAuctionFactory {
  AuctionFactory auctionFactory = AuctionFactory(DeployedAddresses.AuctionFactory());

  //

}
