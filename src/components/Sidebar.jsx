import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import sidebarLogo from '../assets/Icons SVG/clogob.png';
// import sidebarLogo from '../assets/Icons SVG/Cinetrooplogo.png';

import { FaAngleDown } from "react-icons/fa6";
import { CiLogout } from "react-icons/ci";
import HomeIcon from '../assets/Icons SVG/Home.svg';
import TalentIcon from '../assets/Icons SVG/Talent.svg';
import NetworkIcon from '../assets/Icons SVG/Network.svg';
import CastingIcon from '../assets/Icons SVG/Casting.svg';
import { HiOutlineChatBubbleBottomCenterText } from "react-icons/hi2";
import ProfileIcon from '../assets/Icons SVG/Profile.svg';
import TermsConditionIcon from '../assets/Icons SVG/Terms_Conditions.svg';
import TransactionHistoryIcon from '../assets/Icons SVG/Transaction_History.svg';
import SupportIcon from '../assets/Icons SVG/Support.svg';
import AboutUsIcon from '../assets/Icons SVG/Aboutus.svg';
import { useAuth } from '../Context/AuthContext';
import Modal from './Modal';

const activeIconFilter = 'invert(32%) sepia(80%) saturate(462%) hue-rotate(169deg) brightness(94%) contrast(101%)';

const Sidebar = () => {
    const [account, setAccount] = useState(false);
    const [logout, setLogout] = useState(false);
    const { Logout } = useAuth();

    const toggleAccount = () => {
        setAccount(!account);
    };

    const toggleLogout = () => {
        setLogout(!logout);
    };

    const { currentUser } = useAuth();

    return (
        <div className='w-full bg-[#FFFFFF] md:h-full h-screen  overflow-y-auto flex flex-col md:border-r md:border-gray-300'>
            <Link to="/">
                <div className='logo p-5 mx-3 flex gap-3 items-center'>
                    <img src={sidebarLogo} alt="Sidebar Logo" className='w-80' />
                </div>
            </Link>

            <div className='md:flex-grow flex flex-col'>
                <div className='menu flex-grow justify-between p-3'>
                    <ul className='space-y-3 m-3'>
                        {/* Home Link */}
                        <li>
                            <NavLink
                                to='/home'
                                className={({ isActive }) =>
                                    `flex items-center gap-2 p-2 rounded-md ${isActive ? 'bg-[#E7F3FE] font-bold text-[#227BCD] text-lg' : 'text-lg hover:bg-gray-200'}`
                                }
                            >
                                {({ isActive }) => (
                                    <>
                                        <img
                                            src={HomeIcon}
                                            alt="Home"
                                            style={{ filter: isActive ? activeIconFilter : '' }}
                                            className='w-6 h-6 mb-1'
                                        />
                                        Home
                                    </>
                                )}
                            </NavLink>
                        </li>
                        {/* Talent Link */}
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
                                            src={TalentIcon}
                                            alt="Talent"
                                            style={{ filter: isActive ? activeIconFilter : '' }}
                                            className='w-6 h-6 mb-1'
                                        />
                                        Talent
                                    </>
                                )}
                            </NavLink>
                        </li>
                        {/* Network Link */}
                        {
                            !currentUser && (
                                <li>
                                    <NavLink
                                        to='/categories'
                                        className={({ isActive }) =>
                                            `flex  items-center gap-2 p-2 rounded-md ${isActive ? 'bg-[#E7F3FE] font-bold text-[#227BCD] text-lg' : 'text-lg hover:bg-gray-200'}`
                                        }
                                    >
                                        {({ isActive }) => (
                                            <>
                                                <img
                                                    src={NetworkIcon}
                                                    alt="Network"
                                                    style={{ filter: isActive ? activeIconFilter : '' }}
                                                    className='w-6 h-6 mb-1'
                                                />
                                                Categories
                                            </>
                                        )}
                                    </NavLink>
                                </li>
                            )
                        }
                        {/* <li className={`${!currentUser && 'hidden'} `}>
                            <NavLink
                                to='/network'
                                className={({ isActive }) =>
                                    `flex  items-center gap-2 p-2 rounded-md ${isActive ? 'bg-[#E7F3FE] font-bold text-[#227BCD] text-lg' : 'text-lg hover:bg-gray-200'}`
                                }
                            >
                                {({ isActive }) => (
                                    <>
                                        <img
                                            src={NetworkIcon}
                                            alt="Network"
                                            style={{ filter: isActive ? activeIconFilter : '' }}
                                            className='w-6 h-6 mb-1'
                                        />
                                        Network
                                    </>
                                )}
                            </NavLink>
                        </li> */}
                        {/* Casting Link */}
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
                                            src={CastingIcon}
                                            alt="Casting"
                                            style={{ filter: isActive ? activeIconFilter : '' }}
                                            className='w-6 h-6 mb-1'
                                        />
                                        Casting Calls
                                    </>
                                )}
                            </NavLink>
                        </li>
                        {/* Chat Link */}
                        <li className={`${!currentUser && 'hidden'} `}>
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
                            onClick={toggleAccount}
                            className={`flex cursor-pointer justify-between items-center mt-4  ${!currentUser && 'hidden'}`}
                        >
                            <h2 className='text-gray-500 mx-3'>My Account</h2>
                            <div className={`transition-transform duration-300 ${account ? 'rotate-180' : 'rotate-0'}`}>
                                <FaAngleDown />
                            </div>
                        </div>
                        {account && (
                            <div className={`flex flex-col gap-2 mt-2`}>
                                {/* Profile Link */}
                                <li>
                                    <NavLink
                                        to='/profile'
                                        className={({ isActive }) =>
                                            `flex items-center  gap-2 p-2 rounded-md ${isActive ? 'bg-[#E7F3FE] font-bold text-[#227BCD] text-lg' : 'text-lg hover:bg-gray-200'}`
                                        }
                                    >
                                        {({ isActive }) => (
                                            <>
                                                <img
                                                    src={ProfileIcon}
                                                    alt="Profile"
                                                    style={{ filter: isActive ? activeIconFilter : '' }}
                                                    className='w-6 h-6 mb-1'
                                                />
                                                My Profile
                                            </>
                                        )}
                                    </NavLink>
                                </li>
                                {/* Transactions Link */}
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
                                                    src={TransactionHistoryIcon}
                                                    alt="Transactions"
                                                    style={{ filter: isActive ? activeIconFilter : '' }}
                                                    className='w-6 h-6 mb-1'
                                                />
                                                Transactions
                                            </>
                                        )}
                                    </NavLink>
                                </li>
                                {/* Support Link */}
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
                                                    src={SupportIcon}
                                                    alt="Support"
                                                    style={{ filter: isActive ? activeIconFilter : '' }}
                                                    className='w-6 h-6 mb-1'
                                                />
                                                Support
                                            </>
                                        )}
                                    </NavLink>
                                </li>
                                {/* About Us Link */}
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
                                                    src={AboutUsIcon}
                                                    alt="About Us"
                                                    style={{ filter: isActive ? activeIconFilter : '' }}
                                                    className='w-6 h-6 mb-1'
                                                />
                                                About Us
                                            </>
                                        )}
                                    </NavLink>
                                </li>
                                {/* Terms & Conditions Link */}
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
                                                    src={TermsConditionIcon}
                                                    alt="Terms & Conditions"
                                                    style={{ filter: isActive ? activeIconFilter : '' }}
                                                    className='w-6 h-6 mb-1'
                                                />
                                                Terms & Conditions
                                            </>
                                        )}
                                    </NavLink>
                                </li>
                                {/* Privacy Policy Link */}
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
                                                    src={TermsConditionIcon} // Assuming you want a different icon
                                                    alt="Privacy Policy"
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

            {/* Logout Section */}
            <div className="p-3 mb-4 hidden md:block m-3 mx-5 md:mb-4 text-[#FF4E4E] cursor-pointer hover:text-red-600 transition-colors duration-300 flex-shrink-0">
                {
                    currentUser ? (
                        <div onClick={toggleLogout} className="flex items-center gap-2">
                            <CiLogout className="text-2xl font-bold" />
                            <h1 className="text-lg font-medium">Logout</h1>
                        </div>
                    ) : (
                        ''
                    )
                }
                {logout && (

                    <Modal onClose={toggleLogout}>
                        {/* Close Button */}
                        <button onClick={toggleLogout} className="absolute w-7 h-7 top-3 bg-gray-200 p-1 rounded-full right-4 text-gray-500 hover:text-gray-700">
                            ✕
                        </button>
                        {/* Modal Content */}
                        <h3 className="font-bold text-lg">Logout?</h3>
                        <p className="py-4">Are you sure you want to log out?</p>
                        <p className='text-[#9B9B9B]'>Logging out will end your current session and require you to sign in again the next time you access the app.</p>
                        <div className='flex mt-3 gap-3 justify-end items-center'>
                            <button onClick={toggleLogout} className='px-4 font-semibold bg-[#E7F3FE] text-[#399AF3] py-2 rounded-3xl border'>Stay</button>
                            <Link to="/login">
                                <button onClick={Logout} className='px-4 font-semibold py-2 bg-[#FFE5E5] text-[#FF0000] rounded-3xl border'>Yes, Logout</button>
                            </Link>
                        </div>
                    </Modal>
                )}
            </div>


            <div className="p-3 mb-4 md:hidden block m-3 mx-5 md:mb-4 text-[#FF4E4E] cursor-pointer hover:text-red-600 transition-colors duration-300 flex-shrink-0">
                <div onClick={toggleLogout} className="flex items-center gap-2">
                    <CiLogout className="text-2xl font-bold" />
                    <h1 className="text-lg font-medium">Logout</h1>
                </div>
                {logout && (
                    <div className='fixed inset-0 top-0 right-0 z-50 bg-black bg-opacity-50'>
                        <dialog id="my_modal_3" className="modal text-black" open>
                            <div className="modal-box">
                                <form method="dialog">
                                    <button onClick={toggleLogout} className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                                </form>
                                <h3 className="font-bold text-lg">Logout?</h3>
                                <p className="py-4">Are you sure you want to log out?</p>
                                <p className='text-[#9B9B9B]'>Logging out will end your current session and require you to sign in again the next time you access the app.</p>
                                <div className='flex mt-3 gap-3 justify-end items-center'>
                                    <button onClick={toggleLogout} className='px-4 font-semibold bg-[#E7F3FE] text-[#399AF3] py-2 rounded-3xl border'>Stay</button>
                                    <Link to="/login">
                                        <button onClick={Logout} className='px-4 font-semibold py-2 bg-[#FFE5E5] text-[#FF0000] rounded-3xl border'>Yes, Logout</button>
                                    </Link>
                                </div>
                            </div>
                        </dialog>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Sidebar;
