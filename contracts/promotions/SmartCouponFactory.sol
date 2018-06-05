pragma solidity ^0.4.21;

import { SmartCoupon } from './SmartCoupon.sol';

contract SmartCouponFactory {
  address[] public smartCouponContracts; // Stores all instances of the Smart Coupon Contract

  event SmartCouponCreated(address smartCouponContract, address owner, uint numSmartCoupon, address[] allSmartCouponContracts);

  function SmartCouponFactory() public {
    // Empty constructor
  }

  function createSmartCoupon(
    string _promotionName,
    uint[] _couponQualifyingProductSKUs,
    uint _couponPercentDiscount,
    address[] _couponQualifyingCurrencies,
    uint _couponQualifyingSpend,
    string _couponReusePolicy,
    uint _couponPromoterFee,
    uint _couponExpiryBlock
    ) public {
      SmartCoupon newSmartCoupon = new SmartCoupon(
        msg.sender,
        _promotionName,
        _couponQualifyingProductSKUs,
        _couponPercentDiscount,
        _couponQualifyingCurrencies,
        _couponQualifyingSpend,
        _couponReusePolicy,
        _couponPromoterFee,
        _couponExpiryBlock);

      smartCouponContracts.push(newSmartCoupon);

      emit SmartCouponCreated(newSmartCoupon, msg.sender, smartCouponContracts.length, smartCouponContracts);
  }

  function allSmartCouponContracts() public constant returns (address[]) {
      return smartCouponContracts;
  }

}
