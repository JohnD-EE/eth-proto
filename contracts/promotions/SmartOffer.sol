pragma solidity ^0.4.21;

contract SmartOffer {

  // static
  address public owner;
  string public promotionName;

  // states

  function SmartOffer (address _owner, string _promotionName) public {
      if (_owner == 0) revert();

      owner = _owner;
      promotionName = _promotionName;
  }

}
