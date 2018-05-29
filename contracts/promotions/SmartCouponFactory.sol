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
    uint[] _couponQualifyingProducts,
    uint _couponFixedDiscount,
    uint _couponPercentDiscount,
    uint _couponQualifyingSpend,
    string _couponDiscountType,
    string _couponReusePolicy,
    bool _couponPromotersAllowed,
    uint _couponPromoterFee,
    uint _couponExpiryBlock
    ) public {
      SmartCoupon newSmartCoupon = new SmartCoupon(
        msg.sender,
        _promotionName,
        _couponQualifyingProducts,
        _couponFixedDiscount,
        _couponPercentDiscount,
        _couponQualifyingSpend,
        _couponDiscountType,
        _couponReusePolicy,
        _couponPromotersAllowed,
        _couponPromoterFee,
        _couponExpiryBlock);

      smartCouponContracts.push(newSmartCoupon);

      emit SmartCouponCreated(newSmartCoupon, msg.sender, smartCouponContracts.length, smartCouponContracts);
  }

  function allSmartCouponContracts() public constant returns (address[]) {
      return smartCouponContracts;
  }

}
