import React, { useContext, useEffect, useRef, useState } from 'react';
import Rightbar from '../Rightbar';
import { NavLink, Outlet, Navigate, useLocation, useParams } from 'react-router-dom';
import Arrow from '../../assets/Icons SVG/Arrow.svg'
import ProfileCard from '../../Cards/ProfileCards/ProfileCard';
import searchi from '../../assets/Icons SVG/Search.svg'
import Notifications from '../../assets/Icons SVG/Notifications.svg'
import Activity from '../../assets/Icons SVG/Activity.svg'
import activityblue from '../../assets/Icons SVG/activityblue.svg'
import aboutblue from '../../assets/Icons SVG/aboutblue.svg'
import About from '../../assets/Icons SVG/About.svg'
import myworkblue from '../../assets/Icons SVG/myworkblue.svg'
import MyWork from '../../assets/Icons SVG/MyWork.svg'
import Sidebar from '../Sidebar.jsx'
import { FiMenu } from 'react-icons/fi';
import { NotificatinData } from '../../Context/NotificatinContext.jsx';
import TopData from './TopData.jsx'


const Profile = () => {

    const { id } = useParams();
    const notifyData = useContext(NotificatinData);
    const [popup, setpopup] = useState(false);
    const handlePopup = () => {
        setpopup(!popup)
    }
    const [showSidebar, setShowSidebar] = useState(false);
    const handleSidebarToggle = () => {
        setShowSidebar(!showSidebar);
    };
    const [showRightbar, setShowRightbar] = useState(false);
    const [search, setSearch] = useState(false);
    const searchRef = useRef(null);
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (searchRef.current && !searchRef.current.contains(event.target)) {
                setSearch(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [searchRef]);
    const handleBar = () => {
        setShowRightbar(!showRightbar);
    };

    const handleSearch = () => {
        setSearch(!search);
    };
    const location = useLocation();
    if (location.pathname === `/userprofile/${id}`) {
        return <Navigate to={`/userprofile/${id}/userprofileactivity`} />;
    }


    const activeStyle = 'filter-[invert(42%) sepia(35%) saturate(1040%) hue-rotate(166deg) brightness(91%) contrast(94%)] text-[#399AF3]'

    return (
        <div className='flex'>
            <div className='flex-grow p-[2px] bg-gray-100'>
                <div className='flex px-0 bg-white justify-between items-center border-b py-4'>
                    <h1 onClick={handleSidebarToggle} className={`${search ? 'hidden' : 'text-xl text-nowrap font-bold items-center p-3 flex gap-2'}`}> <span className='md:hidden block'><FiMenu className='text-3xl' /></span>Profile</h1>
                    {showSidebar && (
                        <dialog id="my_modal_3" className="modal" open>
                            <div className="w-full h-full ">
                                <form method="dialog">
                                    <button className="btn btn-sm btn-circle btn-ghost absolute right-5 top-5 border-gray-300">✕</button>
                                </form>
                                <Sidebar />
                            </div>
                        </dialog>
                    )}
  

                </div>
                <div className={`showcard transition-all ${showRightbar ? '' : 'mr-[2px]'}`}>
                    <div className='p-[2px]'>
                        <div className='bg-white'>
                            <TopData id={id} />
                        </div>
                    </div>

                    <div className='p-[2px]'>
                        <div className='bg-white p-6'>
                            <ul className='flex gap-6 text-gray-400'>
                                {/* Activity NavLink */}
                                <li>
                                    <NavLink
                                        to={`/userprofile/${id}/userprofileactivity`}
                                        className={({ isActive }) =>
                                            `flex gap-2 items-center ${isActive ? 'font-bold text-black' : ''}`
                                        }
                                    >
                                        {({ isActive }) => (
                                            <>
                                                <img
                                                    src={isActive ? activityblue : Activity}
                                                    className={`w-6 h-6 transition-all ${isActive ? '' : 'opacity-60'}`}
                                                    alt="Activity"
                                                />
                                                <span>Activity</span>
                                            </>
                                        )}
                                    </NavLink>
                                </li>

                                {/* About NavLink */}
                                <li>
                                    <NavLink
                                        to={`/userprofile/${id}/userprofileabout`}
                                        className={({ isActive }) =>
                                            `flex gap-2 items-center ${isActive ? 'font-bold text-black' : ''}`
                                        }
                                    >
                                        {({ isActive }) => (
                                            <>
                                                <img
                                                    src={isActive ? aboutblue : About}
                                                    className={`w-6 h-6 transition-all ${isActive ? '' : 'opacity-60'}`}
                                                    alt="About"
                                                />
                                                <span>About</span>
                                            </>
                                        )}
                                    </NavLink>
                                </li>

                                {/* My Work NavLink */}
                                <li>
                                    <NavLink
                                        to={`/userprofile/${id}/userprofilemywork`}
                                        className={({ isActive }) =>
                                            `flex gap-2 items-center ${isActive ? 'font-bold text-black' : ''}`
                                        }
                                    >
                                        {({ isActive }) => (
                                            <>
                                                <img
                                                    src={isActive ? myworkblue : MyWork}
                                                    className={`w-6 h-6 transition-all ${isActive ? '' : 'opacity-60'}`}
                                                    alt="My Work"
                                                />
                                                <span>My Work</span>
                                            </>
                                        )}
                                    </NavLink>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <Outlet />
                </div>
            </div>

            {showRightbar && (
                <div className='w-[26%]'>
                    <Rightbar />
                </div>
            )}
        </div>
    );
};

export default Profile;
