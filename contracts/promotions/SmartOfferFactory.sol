pragma solidity ^0.4.21;

import { SmartOffer } from './SmartOffer.sol';

contract SmartOfferFactory {
  address[] public smartOfferContracts; // Stores all instances of the Smart Offer Contract

  event SmartOfferCreated(address smartOfferContract, address owner, uint numSmartOffer, address[] allSmartOfferContracts);

  function SmartOfferFactory() public {
    // Empty constructor
  }

  function createSmartOffer(string _promotionName) public {
      SmartOffer newSmartOffer = new SmartOffer(msg.sender, _promotionName);
      smartOfferContracts.push(newSmartOffer);

      emit SmartOfferCreated(newSmartOffer, msg.sender, smartOfferContracts.length, smartOfferContracts);
  }

  function allSmartOfferContracts() public constant returns (address[]) {
      return smartOfferContracts;
  }

}
