pragma solidity ^0.4.17;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/escrow/Escrow.sol";

contract TestEscrow {
  Escrow escrow = Auction(DeployedAddresses.Escrow());

  //

}
