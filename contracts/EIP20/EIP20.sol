/*
Implements EIP20 token standard: https://github.com/ethereum/EIPs/blob/master/EIPS/eip-20.md
.*/


pragma solidity ^0.4.21;

import "./EIP20Interface.sol";


contract EIP20 is EIP20Interface {

    address public issuer;
    uint256 constant private MAX_UINT256 = 2**256 - 1;
    mapping (address => uint256) public balances;
    mapping (address => mapping (address => uint256)) public allowed;
    /*
    NOTE:
    The following variables are OPTIONAL vanities. One does not have to include them.
    They allow one to customise the token contract & in no way influences the core functionality.
    Some wallets/interfaces might not even bother to look at this information.
    */
    string public name;                   //fancy name: eg TRUMP COIN
    uint8 public decimals;                //How many decimals to show.
    string public symbol;                 //An identifier: eg TMP
    string public exchangeRateToEth;      //Token to Eth exchange rate (0.5 means 2 Tokens = 1 Eth)
    bool public isPointsOnly;             //Used as tokens, not a currency and non-exchangeable
    bool public isTransferable;           //Trasnferability between users
    
    event LogSell(address to, uint value);

    function EIP20(
        uint256 _initialAmount,
        string _tokenName,
        uint8 _decimalUnits,
        string _tokenSymbol,
        string _exchangeRateToEth,
        bool _isPointsOnly,
        address _issuer,
        bool _isTransferable
    ) public {
        balances[msg.sender] = _initialAmount;               // Give the creator all initial tokens
        totalSupply = _initialAmount;                        // Update total supply
        name = _tokenName;                                   // Set the name for display purposes
        decimals = _decimalUnits;                            // Amount of decimals for display purposes
        symbol = _tokenSymbol;                               // Set the symbol for display purposes
        exchangeRateToEth = _exchangeRateToEth;              // Set a fixed exchange exhange rate (otherwise assume floating or pointsOnly)
        isPointsOnly = _isPointsOnly;                        // Points only, not an exchangeable currency
        issuer = _issuer;
        isTransferable = _isTransferable;
    }

    function transfer(address _to, uint256 _value) public returns (bool success) {
        require(balances[msg.sender] >= _value);
        balances[msg.sender] -= _value;
        balances[_to] += _value;
        emit Transfer(msg.sender, _to, _value); //solhint-disable-line indent, no-unused-vars
        return true;
    }

    function transferFrom(address _from, address _to, uint256 _value) public returns (bool success) {
        uint256 allowance = allowed[_from][msg.sender];
        require(balances[_from] >= _value && allowance >= _value);
        balances[_to] += _value;
        balances[_from] -= _value;
        if (allowance < MAX_UINT256) {
            allowed[_from][msg.sender] -= _value;
        }
        emit Transfer(_from, _to, _value); //solhint-disable-line indent, no-unused-vars
        return true;
    }

    function balanceOf(address _owner) public view returns (uint256 balance) {
        return balances[_owner];
    }

    function approve(address _spender, uint256 _value) public returns (bool success) {
        allowed[msg.sender][_spender] = _value;
        emit Approval(msg.sender, _spender, _value); //solhint-disable-line indent, no-unused-vars
        return true;
    }

    function allowance(address _owner, address _spender) public view returns (uint256 remaining) {
        return allowed[_owner][_spender];
    }

    //buy tokens - send them from contract owner to buyer
    function buyOrder(uint256 _amount) public payable returns (bool success) {
        // reject payments of 0 ETH
        if (msg.value == 0) {
          revert();
        }
        processBuyOrder(issuer, msg.sender, _amount);
        return true;
    }

    // A relaxed version of the TransferFrom Method for demo purposes - need to understand properly how allowances work...
    function processBuyOrder(address _from, address _to, uint256 _amount) public returns (bool success) {
        require(balances[_from] >= _amount);
        balances[_to] += _amount;
        balances[_from] -= _amount;
        emit Transfer(_from, _to, _amount); //solhint-disable-line indent, no-unused-vars
        return true;
    }

    //sell tokens - (very insecure!!) send eth from contract to buyer - obviously this is insecure. needs a separate exchange contract
    function sellOrder(uint256 _amount, uint256 _value) public payable returns (bool success) {
        processSellOrder(msg.sender, issuer, _amount, _value);
        return true;
    }

    // A relaxed version of the TransferFrom Method for demo purposes - need to understand properly how allowances work...
    function processSellOrder(address _seller, address _issuer, uint256 _amountToken, uint256 _valueEth) public returns (bool success) {
        require(balances[_seller] >= _amountToken);
        balances[_issuer] += _amountToken;
        balances[_seller] -= _amountToken;

        emit Transfer(_seller, _issuer, _amountToken); //solhint-disable-line indent, no-unused-vars

        // Send eth to _to address
        _seller.transfer(_valueEth);
        emit LogSell(_seller, _valueEth);

        return true;
    }

}
