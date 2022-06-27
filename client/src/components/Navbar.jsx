import React, { useContext } from "react";
import { AiFillPlayCircle } from 'react-icons/ai';
import logo from '../../images/logo.png';
import { shortenAddress } from "../utils/shortenAddress";
import { TransactionContext } from "../context/TransactionContext";

const NavBarItem = ({ title, link, classprops }) => (
    <a href={link}><li className={`mx-4 cursor-pointer ${classprops}`}>{title}</li></a>
);

const Navigation = [
    { title: "Home", link: '/' },
    { title: "Register", link: "/register"},
    { title: "Vote", link: "/vote" }
];

const Navbar = () => {
    const { currentAccount, connectWallet } = useContext(TransactionContext);

    return (
        <nav className="w-full flex md:justify-center justify-between items-center p-4">
            <div className="md:flex-[0.5] flex-initial justify-center items-center">
                <img src={logo} alt="logo" className="w-32 cursor-pointer" />
            </div>
            <ul className="text-white md:flex hidden list-none flex-row justify-between items-center flex-initial">
                {Navigation.map((item, index) => (
                    <NavBarItem key={index} title={item.title} link={item.link} />
                ))}
                <li>
                    { !currentAccount ?
                        <button
                            type="button"
                            onClick={connectWallet}
                            className="flex flex-row justify-center items-center my-5 bg-[#2952e3] p-3 rounded-full cursor-pointer hover:bg-[#2546bd]"
                        >
                            <AiFillPlayCircle className="text-white mr-2" />
                            <p className="text-white text-base font-semibold">
                                Connect Wallet
                            </p>
                        </button>
                        :
                        <p>{shortenAddress(currentAccount)}</p>
                    }
                </li>
            </ul>
        </nav>
    );
}

export default Navbar;
