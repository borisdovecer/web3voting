pragma solidity ^0.8.0;

import "@openzeppelin/contracts/utils/cryptography/draft-EIP712.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";

import './WKND.sol';
import "./VotingSystemInterface.sol";

contract VotingSystemContract is EIP712, VotingSystem {

    using SafeMath for uint256;

    address public owner;
    WKND public token;

    mapping(address => bool) registeredVoters;
    mapping(address => bool) voted;
    mapping (address => uint256) nonces;

    Candidate[] public candidates;
    uint256[] public leadingCandidates;

    constructor (WKND _token, string[] memory allNames, uint8[] memory allAges, string[] memory allCults) EIP712("Wakanda Voting", "1.0.0"){
        owner = msg.sender;
        token = _token;

        addCandidates(allNames, allAges, allCults);
    }

    function addCandidates(string[] memory allNames, uint8[] memory allAges, string[] memory allCults) internal {
        require(msg.sender == owner, "Only owner can add candidates");
        for(uint i = 0; i < allNames.length; i++){
            Candidate memory candidate = Candidate(allNames[i], allAges[i], allCults[i], 0);
            candidates.push(candidate);
        }
    }

    function getCandidates() override external view returns(Candidate[] memory){
        return candidates;
    }

    function isRegistered(address voterAddress) override public view returns (bool){
        return registeredVoters[voterAddress];
    }

    function registerVoter(address voterAddress) override external {
        require(!isRegistered(voterAddress), "Voter already registered");

        registeredVoters[voterAddress] = true;
        token.mint(voterAddress);
    }

    function checkBalance(address voterAddress, uint256 amount) override public view returns(bool){
        return amount > 0 && token.balanceOf(voterAddress) >= amount;
    }

    //check if the candidate is already in a leading position
    function isLeading(uint256 candidateId) internal view returns(bool){
        for(uint i = 0; i < leadingCandidates.length; i++){
            if(leadingCandidates[i] == candidateId)
                return true;
        }

        return false;
    }

    function sortLeading() internal {
        for(uint i = 0; i < leadingCandidates.length-1; i++){
            for(uint j = 0; j < leadingCandidates.length-i-1; j++){
                if(candidates[leadingCandidates[j]].votes < candidates[leadingCandidates[j+1]].votes){
                    uint256 tmp = leadingCandidates[j];
                    leadingCandidates[j] = leadingCandidates[j+1];
                    leadingCandidates[j+1] = tmp;
                }
            }
        }
    }

    function pushToLeading(uint256 candidateId) internal {
        if(leadingCandidates.length < 3){
            leadingCandidates.push(candidateId);
        }else{
            leadingCandidates[2] = candidateId;
            sortLeading();
        }

        emit NewChallenger(candidates[candidateId]);
    }

    function getNonce(address voterAddress) public view returns (uint256){
        return nonces[voterAddress];
    }

    function getDigest(address voterAddress, uint256 candidateId, uint256 amount) public view returns (bytes32){

        return _hashTypedDataV4(
            keccak256(
                abi.encode(
                    keccak256("vote(address voterAddress,uint256 candidateId,uint8 amount)"),
                    voterAddress,
                    candidateId,
                    amount
                )
            )
        );
    }

    function getSigner(bytes32 digest, bytes calldata signature) public pure returns (address){
        return ECDSA.recover(digest, signature);
    }

    function delegatedVote(bytes calldata signature, address voterAddress, uint256 candidateId, uint8 amount) override public {

        bytes32 digest = getDigest(voterAddress, candidateId, amount);
        address signer = getSigner(digest, signature);

        vote(candidateId, amount, voterAddress);
    }

    function hasVoted(address voterAddress) override public view returns(bool){
        return voted[voterAddress];
    }

    function vote(uint256 candidateId, uint8 voteAmount, address voterAddress) override public {
        candidates[candidateId].votes += voteAmount;
        voted[voterAddress] = true;
        token.burn(voteAmount);
    }

    function winningCandidates() override external view returns(Candidate[3] memory){
        Candidate[3] memory leading;

        for(uint i = 0; i < leadingCandidates.length; i++){
            leading[i] = candidates[leadingCandidates[i]];
        }

        return leading;
    }
}
