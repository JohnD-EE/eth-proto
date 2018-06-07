pragma solidity ^0.4.21;

contract SmartCoupon {

  // static
  address public owner;
  string public promotionName;
  uint[] public couponQualifyingProductSKUs;
  uint public couponPercentDiscount;
  address public couponQualifyingCurrency; // address of the Currency
  uint public couponQualifyingSpend;
  string public couponDiscountType = 'percentDiscount';
  string public couponReusePolicy; // perhaps this should be enum 'single' / 'multi'
  bool public couponPromotersAllowed;
  uint public couponPromoterFee; // percentage for promoter
  uint public couponExpiryBlock;

  // states
  uint[] public matched;
  /* transactionRefs - store a list of addresses which have used this coupon.
    If the coupon is single use then only allow one transaction on this
  */

  /* promoter addresses - need a way of recognising that a coupon was supplied by
    a given promoter and this promoter needs to be paid.  I think that we would be best creating one
    coupon per promoter?  Need promoter in dropdown list. Otherwise we wouldn't know
    where it came from.
  */

  function SmartCoupon (
    address _owner,
    string _promotionName,
    uint[] _couponQualifyingProductSKUs,
    uint _couponPercentDiscount,
    address _couponQualifyingCurrency,
    uint _couponQualifyingSpend,
    string _couponReusePolicy,
    uint _couponPromoterFee,
    uint _couponExpiryBlock
    ) public {
      if (_owner == 0) revert();
      if (_couponExpiryBlock < block.number) revert();

      owner = _owner;
      promotionName = _promotionName;
      couponQualifyingProductSKUs = _couponQualifyingProductSKUs;
      couponPercentDiscount = _couponPercentDiscount;
      couponQualifyingCurrency = _couponQualifyingCurrency;
      couponQualifyingSpend = _couponQualifyingSpend;
      couponReusePolicy = _couponReusePolicy;
      couponPromotersAllowed = _couponPromoterFee > 0;
      couponPromoterFee = _couponPromoterFee;
      couponExpiryBlock = _couponExpiryBlock;
  }

  function getAllCouponQualifyingProductSKUs () public view returns (uint[]) {
    return couponQualifyingProductSKUs;
  }

  function checkQualifyingProducts (uint[] _productSKUs) public returns (uint[]) {
    // compare purchases against quilfying items and return a list of qualifiers
    // doing nested array iterations like this may be a very bad idea, in solidity
    // so this is purely for experimenting and learning. Maybe best to have this kind
    // of logic off contract

    delete matched; //reset matched
    for (uint i = 0; i < couponQualifyingProductSKUs.length; i ++) {
      for (uint n = 0; i < _productSKUs.length; n ++) {
        if (_productSKUs[n] == couponQualifyingProductSKUs[i]) {
          matched.push(_productSKUs[n]);
        }
      }
    }
    return matched;
  }

  function redeemCoupon (string _transactionRef) public onlyNotOwner onlyBeforeExpiry returns (bool) {
    // obviously this is a placeholder
    return true;
  }

  // modifiers
  modifier onlyOwner {
      if (msg.sender != owner) revert();
      _;
  }

  modifier onlyNotOwner {
      if (msg.sender == owner) revert();
      _;
  }

  modifier onlyBeforeExpiry {
      if (block.number > couponExpiryBlock) revert();
      _;
  }

}
