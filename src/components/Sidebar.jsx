import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import sidebarLogo from '../assets/Icons SVG/logo.svg';
import { FaAngleDown } from "react-icons/fa6";
import { CiLogout } from "react-icons/ci";
import { Link } from 'react-router-dom';
import Home from '../assets/Icons SVG/Home.svg';
import Talent from '../assets/Icons SVG/Talent.svg';
import Network from '../assets/Icons SVG/Network.svg';
import Casting from '../assets/Icons SVG/Casting.svg';
import { HiOutlineChatBubbleBottomCenterText } from "react-icons/hi2";
import Profile from '../assets/Icons SVG/Profile.svg';
import Terms_Condition from '../assets/Icons SVG/Terms_Conditions.svg';
import Transaction_History from '../assets/Icons SVG/Transaction_History.svg';
import Support from '../assets/Icons SVG/Support.svg';
import Aboutus from '../assets/Icons SVG/Aboutus.svg';

const activeIconFilter = 'invert(32%) sepia(80%) saturate(462%) hue-rotate(169deg) brightness(94%) contrast(101%)';

const Sidebar = () => {
    // const [account, setAccount] = useState(window.innerWidth < 640);
    const [account, setAccount] = useState(false);
    const [logout, setLogout] = useState(false);

    const openAccount = () => {
        setAccount(!account);
    };

    const handleLog = () => {
        setLogout(!logout);
    };

    return (
        <div className='flex h-screen'>
            <div className='w-full bg-[#FFFFFF] h-full overflow-y-auto flex flex-col md:border-r md:border-gray-300'>
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
                                        `flex items-center gap-2 p-2 rounded-md ${isActive ? 'bg-[#E7F3FE] font-bold text-[#227BCD] text-lg' : 'text-lg  hover:bg-gray-200'}`
                                    }
                                >
                                    {({ isActive }) => (
                                        <>
                                            <img
                                                src={Home}
                                                alt="Home"
                                                style={{ filter: isActive ? activeIconFilter : '' }}
                                                className='w-6 h-6 mb-1'
                                            />
                                            Home
                                        </>
                                    )}
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to='/talent'
                                    className={({ isActive }) =>
                                        `flex items-center gap-2 p-2 rounded-md ${isActive ? 'bg-[#E7F3FE] font-bold text-[#227BCD] text-lg' : 'text-lg hover:bg-gray-200'}`
                                    }
                                >
                                    {({ isActive }) => (
                                        <>
                                            <img
                                                src={Talent}
                                                alt="Talent"
                                                style={{ filter: isActive ? activeIconFilter : '' }}
                                                className='w-6 h-6 mb-1'
                                            />
                                            Talent
                                        </>
                                    )}
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to='/network'
                                    className={({ isActive }) =>
                                        `flex items-center gap-2 p-2 rounded-md ${isActive ? 'bg-[#E7F3FE] font-bold text-[#227BCD] text-lg' : 'text-lg hover:bg-gray-200'}`
                                    }
                                >
                                    {({ isActive }) => (
                                        <>
                                            <img
                                                src={Network}
                                                alt="Network"
                                                style={{ filter: isActive ? activeIconFilter : '' }}
                                                className='w-6 h-6 mb-1'
                                            />
                                            Network
                                        </>
                                    )}
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to='/casting'
                                    className={({ isActive }) =>
                                        `flex items-center gap-2 p-2 rounded-md ${isActive ? 'bg-[#E7F3FE] font-bold text-[#227BCD] text-lg' : 'text-lg hover:bg-gray-200'}`
                                    }
                                >
                                    {({ isActive }) => (
                                        <>
                                            <img
                                                src={Casting}
                                                alt="Casting"
                                                style={{ filter: isActive ? activeIconFilter : '' }}
                                                className='w-6 h-6 mb-1'
                                            />
                                            Casting Calls
                                        </>
                                    )}
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to='/chat'
                                    className={({ isActive }) =>
                                        `flex items-center gap-2 p-2 rounded-md ${isActive ? 'bg-[#E7F3FE] text-[#227BCD] text-lg' : 'text-lg hover:bg-gray-200'}`
                                    }
                                >
                                    {({ isActive }) => (
                                        <>

                                            <HiOutlineChatBubbleBottomCenterText
                                                style={{ filter: isActive ? activeIconFilter : '' }}
                                                className='w-7 h-6'
                                            />
                                            Chat
                                        </>
                                    )}
                                </NavLink>
                            </li>

                            {/* Account Section */}
                            <div 
                            onClick={() => {
                                    openAccount()
                                }
                            }
                                className='flex cursor-pointer justify-between items-center'>
                                <h2 className='text-gray-500 mx-3'>My Account</h2>
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
                                                `flex items-center gap-2 p-2 rounded-md ${isActive ? 'bg-[#E7F3FE] font-bold text-[#227BCD] text-lg' : 'text-lg hover:bg-gray-200'}`
                                            }
                                        >
                                            {({ isActive }) => (
                                                <>
                                                    <img
                                                        src={Profile}
                                                        alt="Profile"
                                                        style={{ filter: isActive ? activeIconFilter : '' }}
                                                        className='w-6 h-6 mb-1'
                                                    />
                                                   My Profile
                                                </>
                                            )}
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink
                                            to='/transaction'
                                            className={({ isActive }) =>
                                                `flex items-center gap-2 p-2 rounded-md ${isActive ? 'bg-[#E7F3FE] font-bold text-[#227BCD] text-lg' : 'text-lg hover:bg-gray-200'}`
                                            }
                                        >
                                            {({ isActive }) => (
                                                <>
                                                    <img
                                                        src={Transaction_History}
                                                        alt="Transactions"
                                                        style={{ filter: isActive ? activeIconFilter : '' }}
                                                        className='w-6 h-6 mb-1'
                                                    />
                                                    Transactions
                                                </>
                                            )}
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink
                                            to='/support'
                                            className={({ isActive }) =>
                                                `flex items-center gap-2 p-2 rounded-md ${isActive ? 'bg-[#E7F3FE] font-bold text-[#227BCD] text-lg' : 'text-lg hover:bg-gray-200'}`
                                            }
                                        >
                                            {({ isActive }) => (
                                                <>
                                                    <img
                                                        src={Support}
                                                        alt="Support"
                                                        style={{ filter: isActive ? activeIconFilter : '' }}
                                                        className='w-6 h-6 mb-1'
                                                    />
                                                    Support
                                                </>
                                            )}
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink
                                            to='/about'
                                            className={({ isActive }) =>
                                                `flex items-center gap-2 p-2 rounded-md ${isActive ? 'bg-[#E7F3FE] font-bold text-[#227BCD] text-lg' : 'text-lg hover:bg-gray-200'}`
                                            }
                                        >
                                            {({ isActive }) => (
                                                <>
                                                    <img
                                                        src={Aboutus}
                                                        alt="About Us"
                                                        style={{ filter: isActive ? activeIconFilter : '' }}
                                                        className='w-6 h-6 mb-1'
                                                    />
                                                    About Us
                                                </>
                                            )}
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink
                                            to='/term-policy'
                                            className={({ isActive }) =>
                                                `flex items-center tracking-tight gap-2 p-2 rounded-md ${isActive ? 'bg-[#E7F3FE] font-bold text-[#227BCD] text-lg' : 'text-lg hover:bg-gray-200'}`
                                            }
                                        >
                                            {({ isActive }) => (
                                                <>
                                                    <img
                                                        src={Terms_Condition}
                                                        alt="Terms & Conditions"
                                                        style={{ filter: isActive ? activeIconFilter : '' }}
                                                        className='w-6 h-6 mb-1'
                                                    />
                                                    Terms & Conditions
                                                </>
                                            )}
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink
                                            to='/privacy'
                                            className={({ isActive }) =>
                                                `flex items-center gap-2 p-2 rounded-md ${isActive ? 'bg-[#E7F3FE] font-bold text-[#227BCD] text-lg' : 'text-lg hover:bg-gray-200'}`
                                            }
                                        >
                                            {({ isActive }) => (
                                                <>
                                                    <img
                                                        src={Terms_Condition}
                                                        alt="Terms & Conditions"
                                                        style={{ filter: isActive ? activeIconFilter : '' }}
                                                        className='w-6 h-6 mb-1'
                                                    />
                                                    Privacy Policy
                                                </>
                                            )}
                                        </NavLink>
                                    </li>
                                </div>
                            )}
                        </ul>
                    </div>
                </div>

                {/* Logout */}
<div className="p-3 block m-3 mx-5 mb-4 text-[#FF4E4E] cursor-pointer hover:text-red-600 transition-colors duration-300 flex-shrink-0">
    <div onClick={handleLog} className="flex items-center gap-2">
        <CiLogout className="text-2xl font-bold" />
        <h1 className="text-lg font-medium">Logout</h1>
    </div>
    {logout && (
        <dialog id="my_modal_3" className="modal text-black" open>
            <div className="modal-box">
                <form method="dialog">
                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                </form>
                <h3 className="font-bold text-lg">Logout?</h3>
                <p className="py-4">Are you sure you want to log out?</p>
                <p className='text-[#9B9B9B]'>Logging out will end your current session and require you to sign in again the next time you access the app.</p>
                <div className='flex mt-3 gap-3 justify-end items-center'>
                    <button onClick={handleLog} className='px-4 font-semibold bg-[#E7F3FE] text-[#399AF3] py-2 rounded-3xl border'>Stay</button>
                    <Link to="/login">
                        <button className='px-4 font-semibold py-2 bg-[#FFE5E5] text-[#FF0000] rounded-3xl border'>Yes, Logout</button>
                    </Link>
                </div>
            </div>
        </dialog>
    )}
</div>

            </div>
        </div>
    );
};

export default Sidebar;
