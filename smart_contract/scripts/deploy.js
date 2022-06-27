const axios = require("axios");

const main = async () => {
    const WKND = await hre.ethers.getContractFactory("WKND")
    const WKNDContract = await WKND.deploy();

    await WKNDContract.deployed();
    console.log("WKND contract deployed to: ", WKNDContract.address);

    let candidates = await axios.get("https://wakanda-task.3327.io/list");
    candidates = candidates.data['candidates'];

    const allNames = [];
    const allAges = [];
    const allCults = [];

    for(let i = 0; i < 10; i++){
        allNames.push(candidates[i].name);
        allAges.push(candidates[i].age);
        allCults.push(candidates[i].cult);
    }

    const VotingSystem = await hre.ethers.getContractFactory("VotingSystemContract")
    const VotingSystemContract = await VotingSystem.deploy(WKNDContract.address, allNames, allAges, allCults);

    await VotingSystemContract.deployed();
    console.log("Voting System Contract deployed to: ", VotingSystemContract.address);
}

const runMain = async () => {
    try {
        await main();
        process.exit(0);
    } catch (e) {
        console.log(e);
        process.exit(1);
    }
}

runMain();
