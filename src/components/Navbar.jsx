import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/Icons SVG/logo.svg';
import { HiMenu, HiX } from 'react-icons/hi';
import '../CSS/Navbar.css';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <>
            <div className="sticky top-0 z-50 backdrop-blur-md bg-opacity-80 shadow-lg right-0 w-full bg-[#FFFFFF] flex justify-between md:px-6 py-3">
                <div className="logo px-3">
                    <img className='md:w-40 w-36' src={logo} alt="Logo" />
                </div>
                <div className="pages hidden md:block">
                    <ul className='flex gap-8 underline-offset-4 p-3'>
                        {/* Navigation Links */}
                        <li><Link to="/" className='border-b-2 border-[#C02C2C] transition-all'>Home</Link></li>
                        <li><Link to="/talent" className='hover:border-b-2 hover:border-[#C02C2C] transition-all'>Talent</Link></li>
                        <li><Link to="/casting/calls" className='hover:border-b-2 hover:border-[#C02C2C] transition-all'>Casting Calls</Link></li>
                        <li><Link to="/categories" className='hover:border-b-2 hover:border-[#C02C2C] transition-all'>Categories</Link></li>
                        <li><Link to="/home" className='hover:border-b-2 hover:border-[#C02C2C] transition-all'>Content</Link></li>
                        <li><Link to="/about" className='hover:border-b-2 hover:border-[#C02C2C] transition-all'>How it Works</Link></li>
                        <li><Link to="/download" className='hover:border-b-2 hover:border-[#C02C2C] transition-all'>Download</Link></li>
                        <li><Link to="/contactus" className='hover:border-b-2 hover:border-[#C02C2C] transition-all'>Contact Us</Link></li>
                    </ul>
                </div>
                <div className="hidden md:block signup px-3">
                    <Link to="/login">
                        <button className='p-3 mr-5 border rounded-3xl border-gray-600'>Sign Up</button>
                    </Link>
                </div>
                <div className='flex items-center justify-center px-3 md:hidden'>
                    {
                        !isOpen ? <HiMenu onClick={toggleMenu} className='text-2xl cursor-pointer' /> : <HiX onClick={toggleMenu} className='text-2xl cursor-pointer' />
                    }
                </div>
            </div>

            {/* Sliding Menu Sheet */}
            <div className={`fixed top-0 left-0 w-full h-full bg-white shadow-lg z-50 transition-transform transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:hidden`}>
                <div className="flex justify-end p-4">
                    <HiX onClick={toggleMenu} className='text-5xl border border-gray-300 rounded-full p-3 cursor-pointer' />
                </div>
                <div className="flex justify-between flex-col items-start mt-10">
                    <ul className='flex text-3xl font-semibold flex-col gap-4'>
                        <li className=' border-l-2 p-2 border-[#C02C2C]'>
                            <Link to="/" className='text-lg ml-3 hover:text-[#C02C2C]' onClick={toggleMenu}>Home</Link>
                            </li>
                        <li className='hover:border-l-2 p-2 hover:border-[#C02C2C]'>
                            <Link to="/talent" className='text-lg ml-3 hover:text-[#C02C2C]' onClick={toggleMenu}>Talent</Link>
                        </li>
                        <li className='p-2 hover:border-l-2 hover:border-[#C02C2C]'>
                            <Link to="/casting/calls" className='text-lg ml-3 hover:text-[#C02C2C]' onClick={toggleMenu}>Casting Calls</Link>
                        </li>
                        <li className='p-2 hover:border-l-2 hover:border-[#C02C2C]'>
                            <Link to="/categories" className='text-lg ml-3 hover:text-[#C02C2C]' onClick={toggleMenu}>Categories</Link>
                        </li>
                        <li className='p-2 hover:border-l-2 hover:border-[#C02C2C]'>
                            <Link to="/home" className='text-lg ml-3 hover:text-[#C02C2C]' onClick={toggleMenu}>Content</Link>
                        </li>
                        <li className='hover:border-l-2 p-2 hover:border-[#C02C2C]'>
                            <Link to="/about" className='text-lg ml-3 hover:text-[#C02C2C]' onClick={toggleMenu}>How it Works</Link>
                        </li>
                        <li className='p-2 hover:border-l-2 hover:border-[#C02C2C]'>
                            <Link to="/download" className='text-lg ml-3 hover:text-[#C02C2C]' onClick={toggleMenu}>Download</Link>
                        </li>
                        <li className='p-2 hover:border-l-2 hover:border-[#C02C2C]'>
                            <Link to="/contactus" className='text-lg ml-3 hover:text-[#C02C2C]' onClick={toggleMenu}>Contact Us</Link>
                        </li>
                    </ul>
                    <div className='w-full absolute bottom-5 left-0'>
                        <Link to="/signup" className='px-4 flex justify-center'>
                            <button className='text-2xl p-3 rounded-full border w-full border-black'>
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
