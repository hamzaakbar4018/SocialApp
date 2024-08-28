import React from 'react'
import Sidebar from '../components/Sidebar'
import SupportMain from '../components/SupportMain'
const Talent = () => {
  return (
    <div className='flex'>
            <div className='min-w-[19%] sticky top-0 h-screen overflow-y-auto scrollbar-hide'>
                <Sidebar />
            </div>
            <div className='flex-grow'>
                <SupportMain />
            </div>
        </div>
  )
}

export default Talent