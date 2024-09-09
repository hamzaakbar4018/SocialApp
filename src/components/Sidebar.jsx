import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import sidebarLogo from '../assets/Images/sidebarLogo.svg';
import { PiStarFourBold } from "react-icons/pi";
import { PiNewspaperLight } from "react-icons/pi";
import { FaRegUser } from "react-icons/fa6";
import { TbArrowsRightLeft } from "react-icons/tb";
import { HiOutlineSupport } from "react-icons/hi";
import { AiOutlineExclamationCircle } from "react-icons/ai";
import { CgHomeAlt } from "react-icons/cg";
import { HiOutlineGlobeAlt } from "react-icons/hi2";
import { PiUsersThreeLight } from "react-icons/pi";
import { HiOutlineChatBubbleBottomCenterText } from "react-icons/hi2";
import { FaAngleDown } from "react-icons/fa6";
import { CiLogout } from "react-icons/ci";
import { FaAngleUp } from "react-icons/fa6";
const Sidebar = () => {
    const [account, setaccount] = useState(false);
    const openaccount = () => {
        setaccount(!account);
        console.log(account)
    }
    return (
        <div className='flex'>
            <div className='main w-full bg-gray-100 h-[95vh]  flex flex-col border-r border-gray-300'>
                <div className='logo p-5 flex gap-3 items-center'>
                    <img src={sidebarLogo} alt="Sidebar Logo" className='w-12' />
                    <h1 className='bg-gradient-to-r from-[#000000] to-[#656565] text-transparent bg-clip-text text-xl'>
                        YOUTOOART
                    </h1>
                </div>
                <div className='menu flex-grow justify-between p-3'>
                    <ul className='space-y-3 m-3'>
                        <li>
                            <NavLink
                                to='/home'
                                className={({ isActive }) =>
                                    `flex items-center gap-2 p-2 rounded-md ${isActive ? 'bg-[#E7F3FE] font-bold text-[#227BCD]' : 'text- hover:bg-gray-200'}`
                                }
                            >
                                <CgHomeAlt className='text-2xl ' />
                                Home
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to='/talent'
                                className={({ isActive }) =>
                                    `flex items-center gap-2 p-2 rounded-md transition-colors duration-300 ${isActive ? 'bg-[#E7F3FE] font-bold text-[#227BCD]' : 'text- hover:bg-gray-200'}`
                                }
                            >
                                <PiUsersThreeLight className='text-2xl' />
                                Talent
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to='/network'
                                className={({ isActive }) =>
                                    `flex items-center gap-2 p-2 rounded-md transition-colors duration-300 ${isActive ? 'bg-[#E7F3FE] font-bold text-[#227BCD]' : 'text- hover:bg-gray-200'}`
                                }
                            >
                                <HiOutlineGlobeAlt className='text-2xl' />
                                Network
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to='/casting'
                                className={({ isActive }) =>
                                    `flex items-center gap-2 p-2 rounded-md transition-colors duration-300 ${isActive ? 'bg-[#E7F3FE] font-bold text-[#227BCD]' : 'text- hover:bg-gray-200'}`
                                }
                            >
                                <PiStarFourBold className='text-2xl' />
                                Casting
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to='/chat'
                                className={({ isActive }) =>
                                    `flex items-center gap-2 p-2 rounded-md transition-colors duration-300 ${isActive ? 'bg-[#E7F3FE] text-[#227BCD]' : 'text- hover:bg-gray-200'}`
                                }
                            >
                                <div className='flex justify-start gap-2 items-center'>
                                    <HiOutlineChatBubbleBottomCenterText className='text-2xl' />
                                    Chat
                                </div>
                            </NavLink>
                        </li>
                        <div onClick={openaccount} className='flex cursor-pointer justify-between items-center'>
                            <h2 className='text-gray-500 mx-3'>Account</h2>
                            <div
                                className={`transition-transform duration-300 ${account ? 'rotate-180' : 'rotate-0'
                                    }`}
                            >
                                <FaAngleDown />
                            </div>
                        </div>
                        {
                            account && (
                                <div className='flex flex-col gap-2'>
                                    <li>
                                        <NavLink
                                            to='/profile'
                                            className={({ isActive }) =>
                                                `flex items-center gap-2 p-2 rounded-md transition-colors duration-300 ${isActive ? 'bg-[#E7F3FE] text-[#227BCD]' : 'text- hover:bg-gray-200'}`
                                            }
                                        >
                                            <FaRegUser className='text-xl' />
                                            Profile
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink
                                            to='/transaction'
                                            className={({ isActive }) =>
                                                `flex items-center gap-2 p-2 rounded-md transition-colors duration-300 ${isActive ? 'bg-[#E7F3FE] text-[#227BCD]' : 'text- hover:bg-gray-200'}`
                                            }
                                        >
                                            <TbArrowsRightLeft className='text-2xl' />
                                            Transactions
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink
                                            to='/support'
                                            className={({ isActive }) =>
                                                `flex items-center gap-2 p-2 rounded-md transition-colors duration-300 ${isActive ? 'bg-[#E7F3FE] text-[#227BCD]' : 'text- hover:bg-gray-200'}`
                                            }
                                        >
                                            <HiOutlineSupport className='text-2xl' />
                                            Support
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink
                                            to='/about'
                                            className={({ isActive }) =>
                                                `flex items-center gap-2 p-2 rounded-md transition-colors duration-300 ${isActive ? 'bg-[#E7F3FE] text-[#227BCD]' : 'text- hover:bg-gray-200'}`
                                            }
                                        >
                                            <AiOutlineExclamationCircle className='text-2xl' />
                                            About
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink
                                            to='/term-policy'
                                            className={({ isActive }) =>
                                                `flex items-center gap-2 p-2 rounded-md transition-colors duration-300 ${isActive ? 'bg-[#E7F3FE] text-[#227BCD]' : 'text- hover:bg-gray-200'}`
                                            }
                                        >
                                            <PiNewspaperLight className='text-2xl' />
                                            Terms & Conditions
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink
                                            to='/privacy'
                                            className={({ isActive }) =>
                                                `flex items-center gap-2 p-2 rounded-md transition-colors duration-300 ${isActive ? 'bg-[#E7F3FE] text-[#227BCD]' : 'text- hover:bg-gray-200'}`
                                            }
                                        >
                                            <PiNewspaperLight className='text-2xl' />
                                            Privacy Policy
                                        </NavLink>
                                    </li>
                                </div>
                            )
                        }
                    </ul>
                    <div className="flex items-center gap-2 text-[#FF4E4E] p-2 m-3 cursor-pointer hover:text-red-600 transition-colors duration-300">
                        <CiLogout className="text-2xl font-bold" />
                        <h1 className="text-lg font-medium">Logout</h1>
                    </div>

                </div>
            </div>

        </div>
    );
};

export default Sidebar;
