import React from 'react';
import { Link } from 'react-router-dom';
import logof from '../assets/Icons SVG/clogow.png'
import { FaSquareFacebook } from "react-icons/fa6";
import { FaSquareInstagram } from "react-icons/fa6";
import { FaTwitterSquare } from "react-icons/fa";
import { FiYoutube } from "react-icons/fi";
import '../CSS/Navbar.css'
import { useAuth } from '../Context/AuthContext';
const Footer = () => {
    const { currentUser } = useAuth();
    const contactEmail = "support@cinetroop.com";
    const subject = encodeURIComponent("Inquiry from YouTooArt Website");
    const body = encodeURIComponent("Hello CineTroop Team,\n\nI would like to inquire about...");
    return (
        <div className="main w-full  bg-[#1C1C1C]  p-8" >
            <div className=' w-full flex justify-between text-white'>
                <div className="logo px-3 items-center flex">
                    <div className=' flex gap-3 justify-center items-center'>
                        <img src={logof} className='md:w-52 w-40' alt="" />
                    </div>
                </div>
                <div className="pages  items-center hidden md:flex">
                    <ul className='flex gap-8 underline-offset-4 p-3'>
                        <li>
                            <Link to="/home" className="hover:border-b-2  hover:border-[#C02C2C] transition-all">Home</Link>
                        </li>
                        {/* <li>
                            <Link to="/features" className='hover:border-b-2  hover:border-[#C02C2C] transition-all'>Features</Link>
                        </li> */}
                        <li>
                            <a href='#how-it-works' className='hover:border-b-2  hover:border-[#C02C2C] transition-all'>How it Works</a>
                        </li>
                        {/* <li>
                            <Link href={`mailto:${contactEmail}?subject=${subject}&body=${body}`} to="/contactus" className='hover:border-b-2  hover:border-[#C02C2C] transition-all'>Contact Us</Link>
                        </li> */}
                        <li>
                            <a
                                href={`mailto:${contactEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`}
                                className='hover:border-b-2 hover:border-[#C02C2C] transition-all'
                            >
                                Contact Us
                            </a>
                        </li>

                    </ul>
                </div>
                <div className="signup flex items-center px-3">
                    <Link to="/signup">
                        <button className={`p-3 md:text-base text-xl border rounded-3xl border-gray-600 ${currentUser && 'hidden'}`}>Sign Up</button>
                    </Link>

                    {
                        currentUser && (
                            <div className='md:w-40'></div>
                        )
                    }
                </div>
            </div>
            <div className='border-t mt-3 w-full border-gray-600'></div>
            <div className='md:flex md:flex-row flex flex-col-reverse text-gray-400 mt-3 w-full md:gap-0 gap-12 justify-between'>
                <div className="copy flex md:justify-start justify-center ">
                    <h1 className='md:text-base text-[17px]'>&copy;YouTooArt - All Rights Reserved</h1>
                </div>
                <div className="term flex md:justify-start justify-center ">
                    <Link to="/terms">

                        <h1 className='md:text-base text-[17px]'>Privacy  .  Terms & Conditions</h1>
                    </Link>
                </div>
                <div className="icon text-white">
                    <ul className='flex md:text-2xl text-4xl md:justify-start justify-center gap-5  md:gap-5'>
                        <a href="https://www.facebook.com/"
                            target='_blank'
                        ><li><FaSquareFacebook /></li>
                        </a>
                        <a href="https://www.instagram.com/"
                            target='_blank'
                        >
                            <li><FaSquareInstagram /></li>
                        </a>
                        <a href="https://www.youtube.com/"
                            target='_blank'
                        >
                            <li><FiYoutube /></li>
                        </a>
                        <a href="https://www.twitter.com/"
                            target='_blank'
                        >
                            <li><FaTwitterSquare /></li>
                        </a>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default Footer;
