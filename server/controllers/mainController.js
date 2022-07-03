const ethers = require('ethers');
const axios = require('axios');
const VotingSystem = require('../abi/VotingSystemContract.json');

const getContract = async () => {
    const provider = new ethers.providers.AlchemyProvider('rinkeby', process.env.API_KEY);
    const signer = new ethers.Wallet(process.env.KEY, provider);

    return new ethers.Contract(process.env.VOTE_CONTRACT, VotingSystem.abi, signer);
}

const checkAddress = (address) => {
    return ethers.utils.isAddress(address);
}

const addCandidates = async (req, res) => {
    const votingContract = await getContract();
    let candidates = await axios.get("https://wakanda-task.3327.io/list");
    candidates = candidates.data['candidates'];
    candidates.forEach(c => {
        c.votes = 0;
    })
    console.log(candidates);
    try {
        await votingContract.addCandidates(candidates);
        res.json({message: "Candidates Added successful"});
    } catch (e) {
        console.log(e);
    }
}

const register = async (req, res) => {
    const { walletAddress } = req.body;
    const votingContract = await getContract();

    try {
        const isRegistered = await votingContract.isRegistered(walletAddress);
        const isValidAddress = await checkAddress(walletAddress);

        if(!isValidAddress){
            res.json({message: "Invalid Address"});
            return;
        }

        if(isRegistered){
            res.json({message: "You are already registered"});
            return;
        }

        await votingContract.registerVoter(walletAddress, {gasLimit: '0x17e04'}).then(() => {
            res.json({message: "Registration successful"})
            return;
        });
    } catch (e) {
        console.log(e);
        res.json({message: "Error"});
    }
}

const getAllCandidates = async (req, res) => {
    const votingContract = await getContract();

    try {
        const candidates = await votingContract.getCandidates();
        res.send({ data: candidates });
    } catch (e) {
        console.log(e);
    }
}

const vote = async (req, res) => {
    const { amount, candidateId, walletAddress, signature } = req.body;
    const votingContract = await getContract();

    try {
        const hasVoted = await votingContract.hasVoted(walletAddress);
        if(hasVoted){
            res.json({message: "You have already voted"});
            return;
        }
      
        votingContract.vote(candidateId, amount, walletAddress, {gasLimit: '0x17e04'}).then(() => {
            res.json({message: "You have successfully voted"});
            return;
        });

    } catch (e) {
        console.log(e);
        res.json({message: "Error"});
    }
}

const getWinningCandidates = async (req, res) => {
    const votingContract = await getContract();

    try {
        const candidates = await votingContract.winningCandidates();
        res.send({ data: candidates });
    } catch (e) {
        console.log(e);
    }
}

module.exports = {
    getAllCandidates,
    addCandidates,
    register,
    vote,
    getWinningCandidates
}
