import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/Icons SVG/clogob.png';
//  import logo from '../assets/Icons SVG/Cinetrooplogo.png';

import { HiMenu, HiX } from 'react-icons/hi';
import '../CSS/Navbar.css';
import { useAuth } from '../Context/AuthContext';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const { currentUser } = useAuth();

    // const contactEmail = "support@youtooart.com";
    // const subject = encodeURIComponent("Inquiry from YouTooArt Website");
    // const body = encodeURIComponent("Hello YouTooArt Team,\n\nI would like to inquire about...");
    const contactEmail = "support@cinetroop.com";
    const subject = encodeURIComponent("Inquiry from YouTooArt Website");
    const body = encodeURIComponent("Hello CineTroop Team,\n\nI would like to inquire about...");
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    return (
        <>
            <div className="sticky top-0 z-50 backdrop-blur-md bg-opacity-80 shadow-lg right-0 w-full bg-[#FFFFFF] flex justify-between md:px-6 py-3">
                <div className="logo px-3">
                    {/* <a href="#top">
                        <img className='md:w-60 w-40' src={logo} alt="Logo" />
                    </a> */}
                    <img onClick={scrollToTop} className='md:w-60 w-40 cursor-pointer' src={logo} alt="Logo" />
                </div>
                <div className="pages md:mt-2 hidden md:block">
                    <ul className='flex gap-8 underline-offset-4 p-3'>
                        {/* Navigation Links */}
                        <li onClick={scrollToTop}><Link to="/" className='border-b-2 border-[#d6587f] transition-all'>Home</Link></li>
                        <li><Link to="/talent" className='hover:border-b-2 hover:border-[#d6587f] transition-all'>Talent</Link></li>
                        <li><Link to="/casting/calls" className='hover:border-b-2 hover:border-[#d6587f] transition-all'>Casting Calls</Link></li>
                        <li><Link to="/categories" className='hover:border-b-2 hover:border-[#d6587f] transition-all'>Categories</Link></li>
                        <li><Link to="/home" className='hover:border-b-2 hover:border-[#d6587f] transition-all'>Content</Link></li>
                        <li><a href="#how-it-works" className='hover:border-b-2 hover:border-[#d6587f] transition-all'>How it Works</a></li>
                        {/* <li><Link to="/download" className='hover:border-b-2 hover:border-[#C02C2C] transition-all'>Download</Link></li> */}
                        <li><a
                            href={`mailto:${contactEmail}?subject=${subject}&body=${body}`}
                            className='hover:border-b-2 hover:border-[#d6587f] transition-all'>Contact Us</a></li>
                    </ul>
                </div>
                <div className="hidden md:block signup px-3">
                    <Link to="/signup">
                        <button className={`p-3 mr-5 border rounded-3xl border-gray-600 ${currentUser && 'hidden'}`}>Sign Up</button>
                    </Link>
                    {
                        currentUser && (
                            <div className='md:w-40'></div>
                        )
                    }
                </div>
                <div className='flex items-center justify-center px-3 md:hidden'>
                    {
                        !isOpen ? <HiMenu onClick={toggleMenu} className='text-2xl cursor-pointer' /> : <HiX onClick={toggleMenu} className='text-2xl cursor-pointer' />
                    }
                </div>
            </div>

            {/* Sliding Menu Sheet */}
            <div className={`fixed top-0 left-0 w-full h-full bg-white shadow-lg z-50 transition-transform transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:hidden`}>
                <div className="flex justify-end px-4 py-2">
                    <HiX onClick={toggleMenu} className='text-5xl border border-gray-300 rounded-full p-3 cursor-pointer' />
                </div>
                <div className="flex justify-between flex-col items-start">
                    <ul className='flex text-3xl font-semibold flex-col gap-3'>
                        <li className=' border-l-2 p-2 border-[#d6587f]'>
                            <Link to="/" className='text-lg ml-3 hover:text-[#d6587f]' onClick={toggleMenu}>Home</Link>
                        </li>
                        <li className='hover:border-l-2 p-2 hover:border-[#d6587f]'>
                            <Link to="/talent" className='text-lg ml-3 hover:text-[#d6587f]' onClick={toggleMenu}>Talent</Link>
                        </li>
                        <li className='p-2 hover:border-l-2 hover:border-[#d6587f]'>
                            <Link to="/casting/calls" className='text-lg ml-3 hover:text-[#d6587f]' onClick={toggleMenu}>Casting Calls</Link>
                        </li>
                        <li className='p-2 hover:border-l-2 hover:border-[#d6587f]'>
                            <Link to="/categories" className='text-lg ml-3 hover:text-[#d6587f]' onClick={toggleMenu}>Categories</Link>
                        </li>
                        <li className='p-2 hover:border-l-2 hover:border-[#d6587f]'>
                            <Link to="/home" className='text-lg ml-3 hover:text-[#d6587f]' onClick={toggleMenu}>Content</Link>
                        </li>
                        <li className='hover:border-l-2 p-2 hover:border-[#d6587f]'>
                            <a href="#how-it-works" className='text-lg ml-3 hover:text-[#d6587f]' onClick={toggleMenu}>How it Works</a>
                        </li>
                        <li className='p-2 hover:border-l-2 hover:border-[#d6587f]'>
                            <Link to="/download" className='text-lg ml-3 hover:text-[#d6587f]' onClick={toggleMenu}>Download</Link>
                        </li>
                        <li className='p-2 hover:border-l-2 hover:border-[#d6587f]'>
                            <a
                                href={`mailto:${contactEmail}?subject=${subject}&body=${body}`}
                                className='text-lg ml-3 hover:text-[#d6587f]' onClick={toggleMenu}>Contact Us</a>
                        </li>

                    </ul>
                    <div className='w-full absolute mt-2 bottom-5 left-0'>
                        <Link to="/signup" className='px-4 flex justify-center'>
                            <button className={`text-2xl p-3 rounded-full border w-full border-black ${currentUser ? 'hidden' : 'block'}`}>
                                Signup
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Navbar;
