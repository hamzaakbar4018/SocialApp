import React from 'react';
import { Link } from 'react-router-dom';
import logof from '../assets/Images/logof.svg'
import logo from '../assets/Images/logo.svg'
import { FaSquareFacebook } from "react-icons/fa6";
import { FaSquareInstagram } from "react-icons/fa6";
import { FaTwitterSquare } from "react-icons/fa";
import { FiYoutube } from "react-icons/fi";
import '../CSS/Navbar.css'
const Footer = () => {
    return (
        <div className="main w-full  bg-[#1C1C1C]  p-8" >
            <div className=' w-full flex justify-between text-white'>
                <div className="logo px-3 items-center flex">
                    <div className=' flex gap-3 justify-center items-center'>
                        <img src={logof} className='w-40' alt="" />
                    </div>
                </div>
                <div className="pages  items-center hidden md:flex">
                    <ul className='flex gap-8 underline-offset-4 p-3'>
                        <li>
                            <Link to="/home" className="hover:border-b-2  hover:border-[#C02C2C] transition-all">Home</Link>
                        </li>
                        <li>
                            <Link to="/features" className='hover:border-b-2  hover:border-[#C02C2C] transition-all'>Features</Link>
                        </li>
                        <li>
                            <Link to="/howitworks" className='hover:border-b-2  hover:border-[#C02C2C] transition-all'>How it Works</Link>
                        </li>
                        <li>
                            <Link to="/contactus" className='hover:border-b-2  hover:border-[#C02C2C] transition-all'>Contact Us</Link>
                        </li>
                    </ul>
                </div>
                <div className="signup flex items-center px-3">
                    <button className='p-3 border rounded-3xl border-gray-600'>Sign Up</button>
                </div>
            </div>
            <div className='border-t mt-3 w-full border-gray-600'></div>
            <div className='flex text-gray-400 mt-3 w-full md:gap-0 gap-5 justify-between'>
                <div className="copy">
                    <h1 className='md:text-base text-sm'>&copy;YouTooArt - All Rights Reserved</h1>
                </div>
                <div className="term">
                    <h1 className='md:text-base text-sm'>Privacy  .  Terms & Conditions</h1>
                </div>
                <div className="icon text-white">
                    <ul className='flex md:text-2xl gap-3  md:gap-5'>
                        <li><FaSquareFacebook/></li>
                        <li><FaSquareInstagram/></li>
                        <li><FiYoutube/></li>
                        <li><FaTwitterSquare/></li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default Footer;
