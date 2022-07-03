// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract WKND is ERC20 {

    address public owner;

    constructor() ERC20("WakandaToken", "WKND") {
        owner = msg.sender;
    }

    function decimals() override public view returns(uint8){
        return 0;
    }

    function mint(address _address) public {
        _mint(_address, 1);
    }

    function burn(uint256 amount) public {
        _burn(msg.sender, amount);
    }

    function burnFrom(address _address, uint256 amount) public {
        _burn(_address, amount);
    }
}
