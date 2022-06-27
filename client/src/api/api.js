import axios from 'axios';
import { ethers } from 'ethers';
import { contractAddress } from '../utils/constants'

export const getAllCandidates = async () => {
    try{
        const response = await axios.get('http://localhost:8080/candidates');
        return response.data;
    }catch(err){
        console.log(err);
    }
}

export const registerVoter = async (walletAddress) => {
    try{
        const response = await axios.post('http://localhost:8080/register', { walletAddress });
        return response.data;
    }catch(err){
        console.log(err);
    }
}

export const voteApi = async (candidateId, amount) => {
    try{
        const signer = new ethers.providers.Web3Provider(window.ethereum).getSigner();
        const signerAddress = await signer.getAddress();

        const domain = {
            name: 'Wakanda Vote',
            version: '1.3.1.2',
            chainId: 4,
            verifyingContract: contractAddress
        };

        const types = {
            Change: [
                { name: 'Account', type: 'string' },
                { name: 'candidateId', type: 'uint' },
                { name: 'amount', type: 'uint' },
            ],
        };

        const value = {
            Account:signerAddress,
            candidateId,
            amount
        };

        const signature = await signer._signTypedData(domain, types, value);

        try {
            const response = await axios.post(`http://localhost:8080/vote`, {
                walletAddress: signerAddress,
                candidateId,
                amount,
                signature,
            });
            return response;

        } catch (e) {
            console.log(e);
        }
    }catch(error){
        console.log(error);
    }
}

export const getWinningCandidates = async () => {
    try {
        const response = await axios.get('http://localhost:8080/winning-candidates');
        const candidates = await response;

        return candidates.data[0].candidates
    } catch (err) {
        return err.message
    }
}

export default {
    voteApi,
    getAllCandidates,
    getWinningCandidates,
    registerVoter
}
