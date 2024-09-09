import React from 'react'
import Sidebar from '../components/Sidebar'
import NetworkMain from '../components/NetworkMain'
const Talent = () => {
  return (
    <div className='flex'>
            {/* <div className='min-w-[19%] sticky top-0 h-screen overflow-y-auto scrollbar-hide'>
                <Sidebar />
            </div> */}
            <div className='flex-grow'>
                <NetworkMain />
            </div>
        </div>
  )
}

export default Talent