pragma solidity ^0.4.21;

import { SmartVoucher } from './SmartVoucher.sol';

contract SmartVoucherFactory {
  address[] public smartVoucherContracts; // Stores all instances of the Smart Coupon Contract

  event SmartVoucherCreated(address smartVoucherContract, address owner, uint numSmartVoucher, address[] allSmartVoucherContracts);

  function SmartVoucherFactory() public {
    // Empty constructor
  }

  function createSmartVoucher(string _promotionName) public {
      SmartVoucher newSmartVoucher = new SmartVoucher(msg.sender, _promotionName);
      smartVoucherContracts.push(newSmartVoucher);

      emit SmartVoucherCreated(newSmartVoucher, msg.sender, smartVoucherContracts.length, smartVoucherContracts);
  }

  function allSmartVoucherContracts() public constant returns (address[]) {
      return smartVoucherContracts;
  }

}
