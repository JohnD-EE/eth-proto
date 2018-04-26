pragma solidity ^0.4.8;

import { Escrow } from './Escrow.sol';

contract EscrowFactory {
    address[] public escrowContracts;

    event EscrowCreated(address escrowContract, address owner, uint numEscrowContracts, address[] allEscrowContracts);

    function EscrowFactory () public {
    }

    function createEscrow(address _sellerAddress, address _buyerAddress, uint _feePercent, string _saleItem) public {
        Escrow newEscrow = new Escrow(msg.sender, _sellerAddress, _buyerAddress, _feePercent, _saleItem);
        escrowContracts.push(newEscrow);

        EscrowCreated(newEscrow, msg.sender, escrowContracts.length, escrowContracts);
    }

    function allEscrowContracts() public constant returns (address[]) {
        return escrowContracts;
    }
}
