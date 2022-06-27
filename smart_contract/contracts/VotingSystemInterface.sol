pragma solidity ^0.8.0;

interface VotingSystem {

    struct Candidate{
        string name;
        uint8 age;
        string cult;
        uint8 votes;
    }

    event NewChallenger(Candidate newChallenger);

    function getCandidates() external view returns(Candidate[] memory);

    function registerVoter(address voterAddress) external;
    function isRegistered(address voterAddress) external view returns (bool);

    function delegatedVote(bytes calldata signature, address voterAddress, uint256 candidateId, uint8 amount) external;
    function vote(uint256 candidateId, uint8 voteAmount, address voterAddress) external;
    function checkBalance(address voterAddress, uint256 voteAmount) external view returns (bool);
    function hasVoted(address voterAddress) external view returns (bool);

    function winningCandidates() external view returns (Candidate[3] memory);
}
