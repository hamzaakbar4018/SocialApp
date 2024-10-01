import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import sidebarLogo from '../assets/Images/logo.svg';
import { FaAngleDown } from "react-icons/fa6";
import { CiLogout } from "react-icons/ci";
import Home from '../assets/Icons SVG/Home.svg';
import Talent from '../assets/Icons SVG/Talent.svg';
import Network from '../assets/Icons SVG/Network.svg';
import Casting from '../assets/Icons SVG/Casting.svg';
import Chat from '../assets/Icons SVG/Chat.svg';
import Profile from '../assets/Icons SVG/Profile.svg';
import Terms_Conditon from '../assets/Icons SVG/Terms_Conditions.svg';
import Transaction_History from '../assets/Icons SVG/Transaction_History.svg';
import Support from '../assets/Icons SVG/Support.svg';
import Aboutus from '../assets/Icons SVG/Aboutus.svg';

const Sidebar = () => {
    const [account, setAccount] = useState(false);
    const openAccount = () => {
        setAccount(!account);
    }

    const [logout, setLogout] = useState(false);
    const handleLog = () => {
        setLogout(!logout);
    }

    return (
        <div className='flex h-screen'>
            <div className='w-full bg-[#FFFFFF] h-full flex flex-col border-r border-gray-300'>
                <Link className='' to="/">
                    <div className='logo p-5 mx-3 flex gap-3 items-center'>
                        <img src={sidebarLogo} alt="Sidebar Logo" className='w-44' />
                    </div>
                </Link>

                <div className='flex-grow flex flex-col'>
                    <div className='menu flex-grow justify-between p-3'>
                        <ul className='space-y-3 m-3'>
                            <li>
                                <NavLink
                                    to='/home'
                                    className={({ isActive }) =>
                                        `flex items-center gap-2 p-2 rounded-md ${isActive ? 'bg-[#E7F3FE] font-bold text-[#227BCD]' : 'text-gray-700 hover:bg-gray-200'}`
                                    }
                                >
                                    <img
                                        src={Home}
                                        alt="Home"
                                        className={`w-6 transition-all duration-300 ${({ isActive }) => (isActive ? 'filter hue-rotate(180deg) brightness(0) invert(1)' : 'filter brightness(1)')}`}
                                    />
                                    Home
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to='/talent'
                                    className={({ isActive }) =>
                                        `flex items-center gap-2 p-2 rounded-md ${isActive ? 'bg-[#E7F3FE] font-bold text-[#227BCD]' : 'text-gray-700 hover:bg-gray-200'}`
                                    }
                                >
                                    <img
                                        src={Talent}
                                        alt="Talent"
                                        className={`w-6 transition-all duration-300 ${({ isActive }) => (isActive ? 'filter hue-rotate(180deg) brightness(0) invert(1)' : 'filter brightness(1)')}`}
                                    />
                                    Talent
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to='/network'
                                    className={({ isActive }) =>
                                        `flex items-center gap-2 p-2 rounded-md ${isActive ? 'bg-[#E7F3FE] font-bold text-[#227BCD]' : 'text-gray-700 hover:bg-gray-200'}`
                                    }
                                >
                                    <img
                                        src={Network}
                                        alt="Network"
                                        className={`w-6 transition-all duration-300 ${({ isActive }) => (isActive ? 'filter hue-rotate(180deg) brightness(0) invert(1)' : 'filter brightness(1)')}`}
                                    />
                                    Network
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to='/casting'
                                    className={({ isActive }) =>
                                        `flex items-center gap-2 p-2 rounded-md ${isActive ? 'bg-[#E7F3FE] font-bold text-[#227BCD]' : 'text-gray-700 hover:bg-gray-200'}`
                                    }
                                >
                                    <img
                                        src={Casting}
                                        alt="Casting"
                                        className={`w-6 transition-all duration-300 ${({ isActive }) => (isActive ? 'filter hue-rotate(180deg) brightness(0) invert(1)' : 'filter brightness(1)')}`}
                                    />
                                    Casting
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to='/chat'
                                    className={({ isActive }) =>
                                        `flex items-center gap-2 p-2 rounded-md ${isActive ? 'bg-[#E7F3FE] font-bold text-[#227BCD]' : 'text-gray-700 hover:bg-gray-200'}`
                                    }
                                >
                                    <div className='flex justify-start gap-2 items-center'>
                                        <img
                                            src={Chat}
                                            alt="Chat"
                                            className={`w-6 transition-all duration-300 ${({ isActive }) => (isActive ? 'filter hue-rotate(180deg) brightness(0) invert(1)' : 'filter brightness(1)')}`}
                                        />
                                        Chat
                                    </div>
                                </NavLink>
                            </li>
                            <div onClick={openAccount} className='flex cursor-pointer justify-between items-center'>
                                <h2 className='text-gray-500 mx-3'>Account</h2>
                                <div className={`transition-transform duration-300 ${account ? 'rotate-180' : 'rotate-0'}`}>
                                    <FaAngleDown />
                                </div>
                            </div>
                            {account && (
                                <div className='flex flex-col gap-2'>
                                    <li>
                                        <NavLink
                                            to='/profile'
                                            className={({ isActive }) =>
                                                `flex items-center gap-2 p-2 rounded-md ${isActive ? 'bg-[#E7F3FE] font-bold text-[#227BCD]' : 'text-gray-700 hover:bg-gray-200'}`
                                            }
                                        >
                                            <img
                                                src={Profile}
                                                alt="Profile"
                                                className={`w-6 transition-all duration-300 ${({ isActive }) => (isActive ? 'filter hue-rotate(180deg) brightness(0) invert(1)' : 'filter brightness(1)')}`}
                                            />
                                            Profile
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink
                                            to='/transaction'
                                            className={({ isActive }) =>
                                                `flex items-center gap-2 p-2 rounded-md ${isActive ? 'bg-[#E7F3FE] font-bold text-[#227BCD]' : 'text-gray-700 hover:bg-gray-200'}`
                                            }
                                        >
                                            <img
                                                src={Transaction_History}
                                                alt="Transactions"
                                                className={`w-6 transition-all duration-300 ${({ isActive }) => (isActive ? 'filter hue-rotate(180deg) brightness(0) invert(1)' : 'filter brightness(1)')}`}
                                            />
                                            Transactions
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink
                                            to='/support'
                                            className={({ isActive }) =>
                                                `flex items-center gap-2 p-2 rounded-md ${isActive ? 'bg-[#E7F3FE] font-bold text-[#227BCD]' : 'text-gray-700 hover:bg-gray-200'}`
                                            }
                                        >
                                            <img
                                                src={Support}
                                                alt="Support"
                                                className={`w-6 transition-all duration-300 ${({ isActive }) => (isActive ? 'filter hue-rotate(180deg) brightness(0) invert(1)' : 'filter brightness(1)')}`}
                                            />
                                            Support
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink
                                            to='/about'
                                            className={({ isActive }) =>
                                                `flex items-center gap-2 p-2 rounded-md ${isActive ? 'bg-[#E7F3FE] font-bold text-[#227BCD]' : 'text-gray-700 hover:bg-gray-200'}`
                                            }
                                        >
                                            <img
                                                src={Aboutus}
                                                alt="About"
                                                className={`w-6 transition-all duration-300 ${({ isActive }) => (isActive ? 'filter hue-rotate(180deg) brightness(0) invert(1)' : 'filter brightness(1)')}`}
                                            />
                                            About
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink
                                            to='/term-policy'
                                            className={({ isActive }) =>
                                                `flex items-center gap-2 p-2 rounded-md ${isActive ? 'bg-[#E7F3FE] font-bold text-[#227BCD]' : 'text-gray-700 hover:bg-gray-200'}`
                                            }
                                        >
                                            <img
                                                src={Terms_Conditon}
                                                alt="Terms & Conditions"
                                                className={`w-6 transition-all duration-300 ${({ isActive }) => (isActive ? 'filter hue-rotate(180deg) brightness(0) invert(1)' : 'filter brightness(1)')}`}
                                            />
                                            Privacy Policy
                                        </NavLink>
                                    </li>
                                </div>
                            )}
                        </ul>
                    </div>
                </div>

                <div className='flex justify-between items-center p-3'>
                    <div className='flex gap-3 items-center cursor-pointer' onClick={handleLog}>
                        <CiLogout />
                        <span>Logout</span>
                    </div>
                </div>
                {logout && (
                    <div className="bg-gray-200 p-4 rounded-md">
                        <p>Are you sure you want to log out?</p>
                        <div className="flex justify-end mt-2">
                            <button className="text-red-500 mr-3">Yes</button>
                            <button className="text-gray-500">No</button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Sidebar;
