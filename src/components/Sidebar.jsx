import React from 'react';
import { NavLink } from 'react-router-dom';
import sidebarLogo from '../assets/Images/sidebarLogo.svg';
import home from '../assets/Images/home.svg';
import talent from '../assets/Images/talent.svg';
import network from '../assets/Images/network.svg';
import casting from '../assets/Images/casting.svg';
import chat from '../assets/Images/chat.svg';
import profile from '../assets/Images/profile.svg';
import transaction from '../assets/Images/transaction.svg';
import support from '../assets/Images/support.svg';
import about from '../assets/Images/about.svg';
import termPolicy from '../assets/Images/termPolicy.svg';

const Sidebar = () => {
    return (
        <div className='flex'>
            <div className='main w-full bg-gray-100 h-screen flex flex-col border-r border-gray-300'>
                <div className='logo p-5 flex gap-3 items-center'>
                    <img src={sidebarLogo} alt="Sidebar Logo" className='w-12' />
                    <h1 className='bg-gradient-to-r from-[#000000] to-[#656565] text-transparent bg-clip-text text-xl'>
                        YOUTOOART
                    </h1>
                </div>
                <div className='menu flex-grow p-3'>
                    <ul className='space-y-3 m-3'>
                        <li>
                            <NavLink
                                to='/home'
                                className={({ isActive }) =>
                                    `flex items-center gap-2 p-2 rounded-md transition-colors duration-300 ${isActive ? 'bg-gradient-to-r from-[#c0d5ec] text-[#227BCD]' : 'text- hover:bg-gray-200'}`
                                }
                            >
                                <img src={home} alt="Home" className='w-6' />
                                Home
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to='/talent'
                                className={({ isActive }) =>
                                    `flex items-center gap-2 p-2 rounded-md transition-colors duration-300 ${isActive ? 'bg-gradient-to-r from-[#c0d5ec] text-[#227BCD]' : 'text- hover:bg-gray-200'}`
                                }
                            >
                                <img src={talent} alt="Talent" className='w-6' />
                                Talent
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to='/network'
                                className={({ isActive }) =>
                                    `flex items-center gap-2 p-2 rounded-md transition-colors duration-300 ${isActive ? 'bg-gradient-to-r from-[#c0d5ec] text-[#227BCD]' : 'text- hover:bg-gray-200'}`
                                }
                            >
                                <img src={network} alt="Network" className='w-6' />
                                Network
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to='/casting'
                                className={({ isActive }) =>
                                    `flex items-center gap-2 p-2 rounded-md transition-colors duration-300 ${isActive ? 'bg-gradient-to-r from-[#c0d5ec] text-[#227BCD]' : 'text- hover:bg-gray-200'}`
                                }
                            >
                                <img src={casting} alt="Casting" className='w-6' />
                                Casting
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to='/chat'
                                className={({ isActive }) =>
                                    `flex items-center gap-2 p-2 rounded-md transition-colors duration-300 ${isActive ? 'bg-gradient-to-r from-[#c0d5ec] text-[#227BCD]' : 'text- hover:bg-gray-200'}`
                                }
                            >
                                <img src={chat} alt="Chat" className='w-6' />
                                Chat
                            </NavLink>
                        </li>
                        <h2 className='text-gray-500 mx-3'>Account</h2>
                        <li>
                            <NavLink
                                to='/profile'
                                className={({ isActive }) =>
                                    `flex items-center gap-2 p-2 rounded-md transition-colors duration-300 ${isActive ? 'bg-gradient-to-r from-[#c0d5ec] text-[#227BCD]' : 'text- hover:bg-gray-200'}`
                                }
                            >
                                <img src={profile} alt="Profile" className='w-6' />
                                Profile
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to='/transaction'
                                className={({ isActive }) =>
                                    `flex items-center gap-2 p-2 rounded-md transition-colors duration-300 ${isActive ? 'bg-gradient-to-r from-[#c0d5ec] text-[#227BCD]' : 'text- hover:bg-gray-200'}`
                                }
                            >
                                <img src={transaction} alt="Transaction" className='w-6' />
                                Transactions
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to='/support'
                                className={({ isActive }) =>
                                    `flex items-center gap-2 p-2 rounded-md transition-colors duration-300 ${isActive ? 'bg-gradient-to-r from-[#c0d5ec] text-[#227BCD]' : 'text- hover:bg-gray-200'}`
                                }
                            >
                                <img src={support} alt="Support" className='w-6' />
                                Support
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to='/about'
                                className={({ isActive }) =>
                                    `flex items-center gap-2 p-2 rounded-md transition-colors duration-300 ${isActive ? 'bg-gradient-to-r from-[#c0d5ec] text-[#227BCD]' : 'text- hover:bg-gray-200'}`
                                }
                            >
                                <img src={about} alt="About" className='w-6' />
                                About
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to='/term-policy'
                                className={({ isActive }) =>
                                    `flex items-center gap-2 p-2 rounded-md transition-colors duration-300 ${isActive ? 'bg-gradient-to-r from-[#c0d5ec] text-[#227BCD]' : 'text- hover:bg-gray-200'}`
                                }
                            >
                                <img src={termPolicy} alt="Term Policy" className='w-6' />
                                Terms & Conditions
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to='/term-policy'
                                className={({ isActive }) =>
                                    `flex items-center gap-2 p-2 rounded-md transition-colors duration-300 ${isActive ? 'bg-gradient-to-r from-[#c0d5ec] text-[#227BCD]' : 'text- hover:bg-gray-200'}`
                                }
                            >
                                <img src={termPolicy} alt="Term Policy" className='w-6' />
                                Privacy Policy
                            </NavLink>
                        </li>
                    </ul>
                </div>
            </div>
            
        </div>
    );
};

export default Sidebar;
