import React from 'react'
import { FaAngleDown } from "react-icons/fa6";
import { CiLogout } from "react-icons/ci";
import TalentIcon from '../assets/Icons SVG/Talent.svg';
import NetworkIcon from '../assets/Icons SVG/Network.svg';
import CastingIcon from '../assets/Icons SVG/Casting.svg';
import { HiOutlineChatBubbleBottomCenterText } from "react-icons/hi2";
import ProfileIcon from '../assets/Icons SVG/Profile.svg';
import { useAuth } from '../Context/AuthContext';
import { NavLink } from 'react-router-dom';

const BottomBar = () => {
  const { currentUser } = useAuth();
  const activeIconFilter = 'invert(32%) sepia(80%) saturate(462%) hue-rotate(169deg) brightness(94%) contrast(101%)';

  return (
    <div className='bg-white border-t border-gray-200 py-2 flex items-center justify-between fixed bottom-0 left-0 right-0 w-full z-50 md:hidden shadow-lg'>
      <ul className='flex justify-around w-full px-2'>
        {/* Talent Link */}
        <li>
          <NavLink
            to='/talent'
            className={({ isActive }) =>
              `flex items-center justify-center p-2 rounded-xl transition-all duration-300 ${isActive ? 'bg-[#E7F3FE] text-[#227BCD]' : 'hover:bg-gray-50'}`
            }
          >
            {({ isActive }) => (
              <div className='flex flex-col items-center gap-1'>
                <img
                  src={TalentIcon}
                  alt="Talent"
                  style={{ filter: isActive ? activeIconFilter : '' }}
                  className='w-6 h-6'
                />
                <span className='text-xs font-medium'>Talent</span>
              </div>
            )}
          </NavLink>
        </li>

        {/* Network Link - Conditional rendering based on user state */}
        {/* <li className={currentUser ? '' : 'hidden'}>
          <NavLink
            to='/network'
            className={({ isActive }) =>
              `flex items-center justify-center p-2 rounded-xl transition-all duration-300 ${isActive ? 'bg-[#E7F3FE] text-[#227BCD]' : 'hover:bg-gray-50'}`
            }
          >
            {({ isActive }) => (
              <div className='flex flex-col items-center gap-1'>
                <img
                  src={NetworkIcon}
                  alt="Network"
                  style={{ filter: isActive ? activeIconFilter : '' }}
                  className='w-6 h-6'
                />
                <span className='text-xs font-medium'>Network</span>
              </div>
            )}
          </NavLink>
        </li> */}

        {/* Categories Link - Show when user is not logged in */}
        {currentUser && (
          <li>
            <NavLink
              to='/categories'
              className={({ isActive }) =>
                `flex items-center justify-center p-2 rounded-xl transition-all duration-300 ${isActive ? 'bg-[#E7F3FE] text-[#227BCD]' : 'hover:bg-gray-50'}`
              }
            >
              {({ isActive }) => (
                <div className='flex flex-col items-center gap-1'>
                  <img
                    src={NetworkIcon}
                    alt="Categories"
                    style={{ filter: isActive ? activeIconFilter : '' }}
                    className='w-6 h-6'
                  />
                  <span className='text-xs font-medium'>Categories</span>
                </div>
              )}
            </NavLink>
          </li>
        )}

        {/* Casting Link */}
        <li>
          <NavLink
            to='/casting'
            className={({ isActive }) =>
              `flex items-center justify-center p-2 rounded-xl transition-all duration-300 ${isActive ? 'bg-[#E7F3FE] text-[#227BCD]' : 'hover:bg-gray-50'}`
            }
          >
            {({ isActive }) => (
              <div className='flex flex-col items-center gap-1'>
                <img
                  src={CastingIcon}
                  alt="Casting"
                  style={{ filter: isActive ? activeIconFilter : '' }}
                  className='w-6 h-6'
                />
                <span className='text-xs font-medium'>Casting Calls</span>
              </div>
            )}
          </NavLink>
        </li>

        {/* Chat Link - Only visible when user is logged in */}
        {currentUser && (
          <li>
            <NavLink
              to='/chat'
              className={({ isActive }) =>
                `flex items-center justify-center p-2 rounded-xl transition-all duration-300 ${isActive ? 'bg-[#E7F3FE] text-[#227BCD]' : 'hover:bg-gray-50'}`
              }
            >
              {({ isActive }) => (
                <div className='flex flex-col items-center gap-1'>
                  <HiOutlineChatBubbleBottomCenterText
                    className={`w-6 h-6 ${isActive ? 'text-[#227BCD]' : 'text-gray-600'}`}
                  />
                  <span className='text-xs font-medium'>Chat</span>
                </div>
              )}
            </NavLink>
          </li>
        )}

        {/* Profile Link */}
        <li>
          <NavLink
            to='/profile'
            className={({ isActive }) =>
              `flex items-center justify-center p-2 rounded-xl transition-all duration-300 ${isActive ? 'bg-[#E7F3FE] text-[#227BCD]' : 'hover:bg-gray-50'}`
            }
          >
            {({ isActive }) => (
              <div className='flex flex-col items-center gap-1'>
                <img
                  src={ProfileIcon}
                  alt="Profile"
                  style={{ filter: isActive ? activeIconFilter : '' }}
                  className='w-6 h-6'
                />
                <span className='text-xs font-medium'>Profile</span>
              </div>
            )}
          </NavLink>
        </li>
      </ul>
    </div>
  )
}

export default BottomBar