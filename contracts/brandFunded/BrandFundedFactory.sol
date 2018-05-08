pragma solidity ^0.4.8;

import { BrandFunded } from './BrandFunded.sol';

contract BrandFundedFactory {
    address[] public escrowContracts;

    event BrandFundedCreated(address escrowContract, address owner, uint numEscrowContracts, address[] allEscrowContracts);

    function BrandFundedFactory () public {
    }

    function createEscrow(address _sellerAddress, address _buyerAddress, uint _feePercent, string _saleItem) public {
        BrandFunded newEscrow = new BrandFunded(msg.sender, _sellerAddress, _buyerAddress, _feePercent, _saleItem);
        escrowContracts.push(newEscrow);

        BrandFundedCreated(newEscrow, msg.sender, escrowContracts.length, escrowContracts);
    }

    function allEscrowContracts() public constant returns (address[]) {
        return escrowContracts;
    }
}
