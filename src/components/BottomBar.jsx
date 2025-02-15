import React from 'react'
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
import { NavLink } from 'react-router-dom';

const BottomBar = () => {
  const { currentUser, logout } = useAuth()
  const activeIconFilter = 'invert(32%) sepia(80%) saturate(462%) hue-rotate(169deg) brightness(94%) contrast(101%)';

  return (
    <div className='bg-gray-100 min-h-12 flex items-center justify-between fixed bottom-0 left-0 right-0 w-full z-50 md:hidden'>
      <ul className=' flex justify-between w-full mx-5'>
        {/* Home Link */}
        {/* <li>
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
              </>
            )}
          </NavLink>
        </li> */}
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
                  </>
                )}
              </NavLink>
            </li>
          )
        }
        <li className={`${!currentUser && 'hidden'} `}>
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
              </>
            )}
          </NavLink>
        </li>
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
              </>
            )}
          </NavLink>
        </li>


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
              </>
            )}
          </NavLink>
        </li>
        {/* Transactions Link */}
        {/* <li>
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
              </>
            )}
          </NavLink>
        </li> */}
        {/* Support Link */}
        {/* <li>
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
              </>
            )}
          </NavLink>
        </li> */}
        {/* About Us Link */}
        {/* <li>
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
              </>
            )}
          </NavLink>
        </li> */}
        {/* Terms & Conditions Link */}
        {/* <li>
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
              </>
            )}
          </NavLink>
        </li> */}
        {/* Privacy Policy Link */}
        {/* <li>
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
              </>
            )}
          </NavLink>
        </li> */}
      </ul>
    </div>
  )
}

export default BottomBar