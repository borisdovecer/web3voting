import React, { useEffect, useState } from "react";
import { Loader } from ".";
import { getAllCandidates, getWinningCandidates, voteApi } from "../api/api";

const Vote = () => {
    const [candidates, setCandidates] = useState([]);
    const [leads, setLeads] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showLeads, setShowLeads] = useState(false);
    const [candidateId, setCandidateId] = useState();
    const [amount, setAmount] = useState();

    const handleSubmit = async (e) => {
        if (window.ethereum === undefined) {
            alert("You need metamask!");
            return;
        }
        e.preventDefault();

        try {
            setLoading(true);
            const resp = await voteApi(candidateId, amount);
            window.alert(resp.data.message);
            setLoading(false);
        } catch (e) {
            console.log(e);
        }
    };

    const handleLeads = () => {
        setShowLeads(prevState => !prevState.valueOf())
    }

    const setAllCandidates = () => {
        setTimeout(async () => {
            const allCandidates = await getAllCandidates();
            setCandidates(allCandidates.data);
        }, 0);
    }

    const setLeadingCandidates = () => {
        setTimeout(async () => {
            const leads = await getWinningCandidates();
            setLeads(leads.data);
        }, 0);
    }

    useEffect(() => {
        setAllCandidates();
        setLeadingCandidates();
    }, [])

    return (
        <div className="flex w-full justify-center items-center">
            <div className="flex mf:flex-row flex-col items-start justify-between md:p-20 py-12 px-4">
                <div className="flex flex-col flex-1 items-center justify-start w-full mf:mt-0 mt-10">
                    <div className="p-3 flex justify-center items-start flex-col w-9/12 my-5 text-white">
                        <h1 className="text-3xl sm:text-5xl text-white py-1">
                            Vote
                        </h1>
                        <p className="mt-14">
                            Only 3 candidates can be chosen as UN officials. This means that there are only 3
                            candidates who will win and represent Wakanda.
                        </p>
                        <h2 className="mt-6 mb-2 text-2xl">Candidates:</h2>
                        <table className="w-full justify-center text-center mt-2 p-2 border-[1px] border-[#3d4f7c] rounded-full">
                            <tr className="border-[1px] border-[#3d4f7c]">
                                <th>ID</th>
                                <th>Name</th>
                                <th>Age</th>
                                <th>Cult</th>
                                <th>Votes</th>
                            </tr>
                            {candidates.map(candidate =>
                                <tr className="border-[1px] border-[#3d4f7c]">
                                    <td>{candidates.indexOf(candidate)}</td>
                                    <td>{candidate[0]}</td>
                                    <td>{candidate[1]}</td>
                                    <td>{candidate[2]}</td>
                                    <td>{candidate[3]}</td>
                                </tr>
                            )}
                        </table>
                    </div>
                    <div className="p-5 mt-4 sm:w-96 w-full flex flex-col justify-start items-center blue-glassmorphism">
                        <select
                            name="candidateId"
                            onChange={(e) => setCandidateId(e.target.value)}
                            className="text-white w-full mt-2 border-[1px] p-2 border-[#3d4f7c] bg-[#1e2641] hover:bg-[#3d4f7c] cursor-pointer"
                        >
                            {candidates.map(candidate =>
                                <option name="candidateId" key = {candidates.indexOf(candidate)} value = {candidates.indexOf(candidate)}>{candidate[0]}</option>
                            )}
                        </select>
                        <input
                            placeholder="Amount (WKND)"
                            type="text"
                            step="1"
                            onChange={(e) => setAmount(e.target.value)}
                            className="my-2 w-full rounded-sm p-2 outline-none bg-transparent text-white border-none text-sm white-glassmorphism"
                        />
                        <div className="h-[1px] w-full bg-gray-400 my-2" />
                        {loading
                            ? <Loader />
                            : (
                                <button
                                    type="button"
                                    onClick={handleSubmit}
                                    className="text-white w-full mt-2 border-[1px] p-2 border-[#3d4f7c] hover:bg-[#3d4f7c] rounded-full cursor-pointer"
                                >
                                    Vote
                                </button>
                            )}
                    </div>
                    <div className="p-3 flex justify-center items-start flex-col w-9/12 my-5 text-white">
                        <h1 onClick={handleLeads} className="text-3xl sm:text-5xl text-white py-1 cursor-pointer hover:text-[#3d4f7c]">
                            Show Leads
                        </h1>
                        {showLeads ?
                            <table className="w-full justify-center text-center mt-2 p-2 border-[1px] border-[#3d4f7c] rounded-full">
                                <tr className="border-[1px] border-[#3d4f7c]">
                                    <th>ID</th>
                                    <th>Name</th>
                                    <th>Age</th>
                                    <th>Cult</th>
                                    <th>Votes</th>
                                </tr>
                                {leads.map(lead =>
                                    <tr className="border-[1px] border-[#3d4f7c]">
                                        <td>{leads.indexOf(lead)}</td>
                                        <td>{lead[0]}</td>
                                        <td>{lead[1]}</td>
                                        <td>{lead[2]}</td>
                                        <td>{lead[3]}</td>
                                    </tr>
                                )}
                            </table>
                            :
                            <span>: ^ )</span>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Vote;
