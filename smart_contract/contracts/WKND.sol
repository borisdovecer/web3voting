//SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract WKND is ERC20 {
    address public owner;

    constructor() public ERC20("Wakanda Voting Token", "WKND"){
        owner = msg.sender;
    }

    function decimals() override public view returns(uint8){
        return 0;
    }

    function mint(address to) external{
        _mint(to, 1);
    }

    function burn(uint256 amount) public {
        _burn(msg.sender, amount);
    }
}
