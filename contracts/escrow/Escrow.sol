pragma solidity ^0.4.8;

contract Escrow {

  // Store balances
  mapping (address => uint) public balances;

  // Static
  address public owner;
  address public sellerAddress;
  address public buyerAddress;
  uint public feePercent;
  address public escrowProviderAddress;
  string public saleItem;

  // State
  bool public sellerApprove;
  bool public buyerApprove;
  bool public escrowComplete = false;

  // Constructor
  function Escrow(address _owner, address _sellerAddress, address _buyerAddress, uint _feePercent, string _saleItem) public {
        if (_feePercent < 0 || _feePercent > 25) {
          revert();
        }
        escrowProviderAddress = msg.sender;
        sellerAddress = _sellerAddress;
        buyerAddress = _buyerAddress;
        feePercent = _feePercent;
        saleItem = _saleItem;
        owner = _owner;
  }

  // buyer must place a deposit
  function depositBuyerFunds() public payable {
        if(msg.sender == buyerAddress) {
          balances[buyerAddress] += msg.value;
        }
        else {
          revert();
        }
    }

  // Both buyer and seller must approve the deal, which sets up a chain reaction to complete
  function approve() public {
    if (balances[buyerAddress] == 0) {
      revert();
    }
    if (msg.sender == buyerAddress) {
      buyerApprove = true;
    }
    else if (msg.sender == sellerAddress) {
      sellerApprove = true;
    }
    if (sellerApprove && buyerApprove) {
      payFee();
      paySeller();
      escrowComplete = true;
    }
  }

  // About the contract if buyer and seller agree
  function voidContract() public {
      if (msg.sender == buyerAddress) {
        buyerApprove = false;
      }
      else if (msg.sender == sellerAddress) {
        sellerApprove = false;
      }
      if (!sellerApprove && !buyerApprove) {
        refundBuyer();
      }
  }

  function paySeller() internal {
    if (sellerAddress.send(address(this).balance)) {
      balances[buyerAddress] = 0;
    }
  }

  // Return funds to buyer if both parties agree contract is void
  function refundBuyer() internal {
    if (buyerApprove == false && sellerApprove == false) {
      selfdestruct(buyerAddress);
    }
  }

  // Pay fee to escrow service
  function payFee() internal {
      escrowProviderAddress.transfer(address(this).balance * feePercent / 100 ); //% fee
  }

}
