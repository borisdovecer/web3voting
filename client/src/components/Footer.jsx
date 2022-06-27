import React from "react";
import logo from '../../images/footer-logo1.png';

const Footer = () => {
    return (
        <nav className="w-full flex md:justify-center justify-between items-center p-4">
            <div className="md:flex-[0.5] flex-initial justify-right items-center">
                <img src={logo} alt="logo" className="w-32 cursor-pointer" />
            </div>
            <div className="text-white">
                <p>Boris Dovečer</p>
            </div>
        </nav>
    );
}

export default Footer;
