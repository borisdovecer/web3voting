import React, { useState, useEffect } from "react";

export const TransactionContext = React.createContext();

const { ethereum } = window;

export const TransactionProvider = ({ children }) => {
    const [currentAccount, setCurrentAccount] = useState("");

    const checkIfWalletIsConnect = async () => {
        try {
            if (!ethereum) return alert("Please install MetaMask.");

            const accounts = await ethereum.request({ method: "eth_accounts" });

            if (accounts.length) {
                setCurrentAccount(accounts[0]);
            } else {
                console.log("No accounts found");
            }
        } catch (error) {
            console.log(error);
        }
    };

    const connectWallet = async () => {
        try {
            if (!ethereum) return alert("Please install MetaMask.");

            const accounts = await ethereum.request({ method: "eth_requestAccounts", });

            setCurrentAccount(accounts[0]);
        } catch (error) {
            console.log(error);

            throw new Error("No ethereum object");
        }
    };

    useEffect(async () => {
        await checkIfWalletIsConnect();
    }, []);

    return (
        <TransactionContext.Provider
            value={{
                connectWallet,
                currentAccount
            }}
        >
            {children}
        </TransactionContext.Provider>
    );
}
