import React, { useContext, useEffect, useRef, useState } from 'react';
import Rightbar from '../Rightbar';
import { NavLink, Outlet, useLocation, useParams, useNavigate } from 'react-router-dom';
import Activity from '../../assets/Icons SVG/Activity.svg';
import activityblue from '../../assets/Icons SVG/activityblue.svg';
import aboutblue from '../../assets/Icons SVG/aboutblue.svg';
import About from '../../assets/Icons SVG/About.svg';
import myworkblue from '../../assets/Icons SVG/myworkblue.svg';
import MyWork from '../../assets/Icons SVG/MyWork.svg';
import Sidebar from '../Sidebar.jsx';
import { FiMenu } from 'react-icons/fi';
import { NotificatinData } from '../../Context/NotificatinContext.jsx';
import TopData from './TopData.jsx';

const Profile = () => {
  const { id } = useParams();
  const navigate = useNavigate(); // Initialize useNavigate
  const notifyData = useContext(NotificatinData);
  const [popup, setpopup] = useState(false);
  const handlePopup = () => {
    setpopup(!popup);
  };
  const [showSidebar, setShowSidebar] = useState(false);
  const handleSidebarToggle = () => {
    if (window.innerWidth < 768) { // 768px is Tailwind's `md` breakpoint
      setShowSidebar(!showSidebar);
    }
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

  const handleBack = () => { // Updated handleBack function
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      // Fallback navigation if there's no history
      navigate('/default-route'); // Replace with your desired fallback route
    }
  };

  const activeStyle = 'filter-[invert(42%) sepia(35%) saturate(1040%) hue-rotate(166deg) brightness(91%) contrast(94%)] text-[#399AF3]';

  return (
    <div className='flex'>
      <div className='flex-grow p-[2px] bg-gray-100'>
        <div className='flex px-0 bg-white justify-between items-center border-b py-4'>
          <div className="flex items-center"> {/* Wrapper for Back Arrow and Title */}
            {/* Back Arrow Button */}
            {/* <button onClick={handleBack} className='mr-2 focus:outline-none' aria-label="Go Back">
              <img src={Arrow} alt="Back" className='w-6 h-6' />
            </button> */}

            {/* Profile Title with Menu Toggle */}
            <h1 onClick={handleSidebarToggle} className={`${search ? 'hidden' : 'text-xl text-nowrap font-bold items-center p-3 flex gap-2'}`}>
              <span className='md:hidden block'><FiMenu className='text-3xl' /></span><span className='md:ml-5'>Profile</span>
            </h1>
          </div>

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
                    to="userprofileactivity" // Relative path
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
                    to="userprofileabout" // Relative path
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
                    to="userprofilemywork" // Relative path
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
                        <span>Work</span>
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
