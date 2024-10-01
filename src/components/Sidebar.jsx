import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import sidebarLogo from '../assets/Images/logo.svg';
import { FaAngleDown } from "react-icons/fa6";
import { CiLogout } from "react-icons/ci";
import { Link } from 'react-router-dom'
import Home from '../assets/Icons SVG/Home.svg'
import Talent from '../assets/Icons SVG/Talent.svg'
import Network from '../assets/Icons SVG/Network.svg'
import Casting from '../assets/Icons SVG/Casting.svg'
import Chat from '../assets/Icons SVG/Chat.svg'
import Profile from '../assets/Icons SVG/Profile.svg'
import Terms_Conditon from '../assets/Icons SVG/Terms_Conditions.svg'
import Transaction_History from '../assets/Icons SVG/Transaction_History.svg'
import Support from '../assets/Icons SVG/Support.svg'
import Aboutus from '../assets/Icons SVG/Aboutus.svg'
const Sidebar = () => {
    const [account, setaccount] = useState(false);
    const openaccount = () => {
        setaccount(!account);
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
                                        `flex items-center gap-2 p-2 rounded-md ${isActive ? 'bg-[#E7F3FE] font-bold text-[#227BCD]' : 'text- hover:bg-gray-200'}`
                                    }
                                >
                                    <img src={Home} alt="" />
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
                                    <img src={Talent} alt="" />

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
                                    <img src={Network} alt="" />

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
                                    <img src={Casting} alt="" />

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
                                        <img src={Chat} alt="" />

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
                            {account && (
                                <div className='flex flex-col gap-2'>
                                    <li>
                                        <NavLink
                                            to='/profile'
                                            className={({ isActive }) =>
                                                `flex items-center gap-2 p-2 rounded-md transition-colors duration-300 ${isActive ? 'bg-[#E7F3FE] text-[#227BCD]' : 'text- hover:bg-gray-200'}`
                                            }
                                        >
                                            <img src={Profile} alt="" />
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
                                            <img src={Transaction_History} alt="" />
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
                                            <img src={Support} alt="" />
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
                                            <img src={Aboutus} alt="" />
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
                                            <img src={Terms_Conditon} alt="" />
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
                                            {/* <PiNewspaperLight className='text-2xl' /> */}
                                            <img src={Terms_Conditon} alt="" />
                                            Privacy Policy
                                        </NavLink>
                                    </li>
                                </div>
                            )}
                        </ul>
                    </div>
                </div>

                {/* Logout Button */}
                <div className="p-3 m-3 mb-4 text-[#FF4E4E] cursor-pointer hover:text-red-600 transition-colors duration-300">
                    <div onClick={handleLog} className="flex items-center gap-2">
                        <CiLogout className="text-2xl font-bold" />
                        <h1 className="text-lg font-medium">Logout</h1>
                    </div>
                    {
                        logout && (
                            <dialog id="my_modal_3" className="modal text-black" open>
                                <div className="modal-box">
                                    <form method="dialog">
                                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                                    </form>
                                    <h3 className="font-bold text-lg">Logout?</h3>
                                    <p className="py-4">Are you sure you want to log out?</p>
                                    <p className='text-[#9B9B9B]'>Loggin out will end your current session and require you to sign in again the next time you access the app.</p>
                                    <div className='flex mt-3 gap-3 justify-end items-center'>
                                        <button onClick={handleLog} className='px-4 font-semibold bg-[#E7F3FE] text-[#399AF3] py-2 rounded-3xl border'>Stay</button>
                                        <Link to="/">
                                            <button className='px-4 font-semibold py-2 bg-[#FFE5E5] text-[#FF0000] rounded-3xl border'>Yes,Logout</button>
                                        </Link>
                                    </div>
                                </div>
                            </dialog>
                        )
                    }
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
