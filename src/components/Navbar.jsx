import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/Images/logo.svg'
import { HiMenu, HiX } from 'react-icons/hi';
import '../CSS/Navbar.css'
const Navbar = () => {

    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };
    return (
        <>
            <div className="sticky top-0 z-50 backdrop-blur-md bg-opacity-80 shadow-lg right-0 w-full  bg-[#FFFFFF] flex justify-between  px-6 py-3" >

                <div className="logo px-3">
                    <div className=' flex gap-3 justify-center items-center'>
                        <img className='w-[40px] md:w-[100%]' src={logo} alt="" />
                    </div>
                </div>
                <div className="pages hidden md:block">
                    <ul className='flex gap-8 underline-offset-4 p-3'>
                        <li>
                            <Link to="/home" className="border-b-2  border-[#C02C2C] transition-all">Home</Link>
                        </li>
                        <li>
                            <Link to="/talent" className='hover:border-b-2  hover:border-[#C02C2C] transition-all'>Talent</Link>
                        </li>
                        <li>
                            <Link to="/casting/calls" className='hover:border-b-2  hover:border-[#C02C2C] transition-all'>Casting Calls</Link>
                        </li>
                        <li>
                            <Link to="/categories" className='hover:border-b-2  hover:border-[#C02C2C] transition-all'>Categories</Link>
                        </li>
                        <li>
                            <Link to="/home" className='hover:border-b-2  hover:border-[#C02C2C] transition-all'>Content</Link>
                        </li>
                        <li>
                            <Link to="/howitworks" className='hover:border-b-2  hover:border-[#C02C2C] transition-all'>How it Works</Link>
                        </li>
                        <li>
                            <Link to="/download" className='hover:border-b-2  hover:border-[#C02C2C] transition-all'>Download</Link>
                        </li>
                        <li>
                            <Link to="/contactus" className='hover:border-b-2  hover:border-[#C02C2C] transition-all'>Contact Us</Link>
                        </li>
                    </ul>
                </div>
                <div className="hidden md:block signup px-3">
                    <Link to="/login"><button className='p-3 mr-5 border rounded-3xl border-gray-600'>Sign Up</button></Link>
                </div>
                <div className='block p-3 md:hidden'>
                    {
                        !isOpen ? <HiMenu onClick={toggleMenu} className='' /> : <HiX onClick={toggleMenu} className='' />
                    }
                </div>

            </div>
            <div
                className={`md:hidden bg-[#F4F4F4] transition-all duration-300 ease-in-out overflow-hidden ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
            >
                <ul className='flex flex-col justify-center items-center gap-8 underline-offset-4 p-3'>
                    <li>
                        <Link to="/home" className=" hover:border-b-2 hover:border-[#C02C2C] transition-all">Home</Link>
                    </li>
                    <li>
                        <Link to="/features" className='hover:border-b-2 hover:border-[#C02C2C] transition-all'>Features</Link>
                    </li>
                    <li>
                        <Link to="/howitworks" className='hover:border-b-2 hover:border-[#C02C2C] transition-all'>How it Works</Link>
                    </li>
                    <li>
                        <Link to="/contactus" className='hover:border-b-2 hover:border-[#C02C2C] transition-all'>Contact Us</Link>
                    </li>
                </ul>
            </div>
        </>
    );
}

export default Navbar;
