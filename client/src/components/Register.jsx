import React, { useState } from "react";
import { Loader } from ".";
import { registerVoter } from "../api/api";

const Register = () => {
    const  [ address, setAddress ] = useState('');
    const  [ loading, setLoading ] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const register = await registerVoter(address);
            setLoading(false);
            window.alert(register.message);
        } catch (e) {
            console.log(e)
        }
    };

    return (
        <div className="flex w-full justify-center items-center">
            <div className="flex mf:flex-row flex-col items-start justify-between md:p-20 py-12 px-4">
                <div className="flex flex-col flex-1 items-center justify-start w-full mf:mt-0 mt-10">
                    <div className="p-3 flex justify-center items-start flex-col w-6/12 my-5 text-white">
                        <h1 className="text-3xl sm:text-5xl text-white py-1">
                            Register your address
                        </h1>
                        <p className="mt-14">
                            Each Wakandan has a unique Ethereum address that they use to vote.
                            In order for them to vote in the election, they must have a balance of at least 1 WKND
                            (ERC20 token). To get this token, they must register to vote on a this page.
                        </p>
                    </div>
                    <div className="p-5 mt-4 sm:w-96 w-full flex flex-col justify-start items-center blue-glassmorphism">
                        <input
                            placeholder="Address"
                            type="text"
                            onChange={(e) => setAddress(e.target.value)}
                            className="my-2 w-full rounded-sm p-2 outline-none bg-transparent text-white border-none text-sm white-glassmorphism"
                        />
                        <div className="h-[1px] w-full bg-gray-400 my-2" />
                        {loading
                            ? <Loader/>
                            : <button
                                type="button"
                                onClick={handleSubmit}
                                className="text-white w-full mt-2 border-[1px] p-2 border-[#3d4f7c] hover:bg-[#3d4f7c] rounded-full cursor-pointer"
                            >
                                Register
                            </button>
                        }
                        </div>
                    </div>
                </div>
            </div>
    );
};

export default Register;
