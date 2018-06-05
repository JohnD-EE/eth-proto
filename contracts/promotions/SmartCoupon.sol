pragma solidity ^0.4.21;

contract SmartCoupon {

  // static
  address public owner;
  string public promotionName;
  uint[] public couponQualifyingProductSKUs;
  uint public couponPercentDiscount;
  address[] public couponQualifyingCurrencies; // addresses of the Currencies
  uint public couponQualifyingSpend;
  string public couponDiscountType = 'percentDiscount';
  string public couponReusePolicy; // perhaps this should be enum 'single' / 'multi'
  bool public couponPromotersAllowed;
  uint public couponPromoterFee; // percentage for promoter
  uint public couponExpiryBlock;

  // states
  function SmartCoupon (
    address _owner,
    string _promotionName,
    uint[] _couponQualifyingProductSKUs,
    uint _couponPercentDiscount,
    address[] _couponQualifyingCurrencies,
    uint _couponQualifyingSpend,
    string _couponReusePolicy,
    uint _couponPromoterFee,
    uint _couponExpiryBlock
    ) public {
      if (_owner == 0) revert();

      owner = _owner;
      promotionName = _promotionName;
      couponQualifyingProductSKUs = _couponQualifyingProductSKUs;
      couponPercentDiscount = _couponPercentDiscount;
      couponQualifyingCurrencies = _couponQualifyingCurrencies;
      couponQualifyingSpend = _couponQualifyingSpend;
      couponReusePolicy = _couponReusePolicy;
      couponPromotersAllowed = _couponPromoterFee > 0;
      couponPromoterFee = _couponPromoterFee;
      couponExpiryBlock = _couponExpiryBlock;
  }

  function getAllCouponQualifyingProductSKUs() public view returns (uint[]) {
    return couponQualifyingProductSKUs;
  }

  function getAllCouponQualifyingCurrencies() public view returns (address[]) {
    return couponQualifyingCurrencies;
  }

}
