pragma solidity ^0.4.17;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/auction/Auction.sol";

contract TestAuction {
  Auction auction = Auction(DeployedAddresses.Auction());

  //

}
