// SPDX-License-Identifier: MIT

pragma solidity ^0.8.4;

import "@openzeppelin/contracts/utils/cryptography/draft-EIP712.sol";
import "./WKND.sol";

contract VotingSystemContract is EIP712{
    struct Voter {
        bool voted;
        address voterAddress;
        uint256 candidateId;
    }

    struct Candidate {
        string name;
        uint8 age;
        string cult;
        uint8 votes;
    }

    address public owner;
    WKND public token;

    mapping(address => bool) votes;
    mapping(address => bool) registeredVoters;

    Voter[] public voters;
    Candidate[] public candidates;
    Candidate[] public leadingCandidates;

    event NewChallenger(Candidate challenger);

    constructor (WKND _token, string[] memory _candidateNames, uint8[] memory _candidateAges, string[] memory _candidateCults) EIP712("Wakanda Voting", "1.0.0"){
        owner = msg.sender;
        token = _token;
        addCandidates(_candidateNames, _candidateAges, _candidateCults);
    }

    function addCandidates(string[] memory _candidateNames, uint8[] memory _candidateAges, string[] memory _candidateCults) public {
        for(uint256 i = 0; i < _candidateNames.length; ++i) {
            candidates.push(Candidate({name: _candidateNames[i], age: _candidateAges[i], cult: _candidateCults[i], votes: 0}));
        }
    }

    function getCandidates() public view returns (Candidate[] memory) {
        return candidates;
    }

    function getLeadingCandidates() public view returns (Candidate[] memory) {
        return leadingCandidates;
    }

    function isRegistered(address voterAddress) public view returns (bool){
        return registeredVoters[voterAddress];
    }

    function hasVoted(address voterAddress) public view returns (bool){
        return votes[voterAddress];
    }

    function registerVoter(address voterAddress) external {
        require(!isRegistered(voterAddress), "Voter already registered");

        registeredVoters[voterAddress] = true;
        token.mint(voterAddress);
    }

    function vote(uint8 _candidateId, uint8 _amount, address _address) public payable {
        token.burnFrom(_address, _amount);
        votes[_address] = true;
        voters.push(Voter({voted: true, voterAddress: _address, candidateId: _candidateId }));
        candidates[_candidateId].votes += 1;

        sort();
    }

    function sort() internal {
        leadingCandidates = candidates;
        for(uint i=0; i<leadingCandidates.length; i++){
            for(uint j=1; j<leadingCandidates.length; j++){
                if(leadingCandidates[i].votes < leadingCandidates[j].votes) {
                    Candidate memory temp = leadingCandidates[i];
                    leadingCandidates[i] = leadingCandidates[j];
                    leadingCandidates[j] = temp;
                }
            }
        }
    }

    function winningCandidates() external view returns(Candidate[3] memory){
        Candidate[3] memory leading;

        for(uint i = 0; i < 3; i++){
            leading[i] = leadingCandidates[i];
        }

        return leading;
    }
}
