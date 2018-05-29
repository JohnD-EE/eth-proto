pragma solidity ^0.4.21;

contract SmartCoupon {

  // static
  address public owner;
  string public promotionName;
  uint[] public couponQualifyingProducts;
  uint public couponFixedDiscount;
  uint public couponPercentDiscount;
  uint public couponQualifyingSpend;
  string public couponDiscountType; // perhaps this should be enum 'fixed' / 'percent'
  string public couponReusePolicy; // perhaps this should be enum 'single' / 'multi'
  bool public couponPromotersAllowed;
  uint public couponPromoterFee; // percentage for promoter
  uint public couponExpiryBlock;

  // states

  function SmartCoupon (
    address _owner,
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
      if (_owner == 0) revert();

      owner = _owner;
      promotionName = _promotionName;
      couponQualifyingProducts = _couponQualifyingProducts;
      couponFixedDiscount = _couponFixedDiscount;
      couponPercentDiscount = _couponPercentDiscount;
      couponQualifyingSpend = _couponQualifyingSpend;
      couponDiscountType = _couponDiscountType;
      couponReusePolicy = _couponReusePolicy;
      couponPromotersAllowed = _couponPromotersAllowed;
      couponPromoterFee = _couponPromoterFee;
      couponExpiryBlock = _couponExpiryBlock;

  }

}
