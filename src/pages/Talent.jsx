import React from 'react'
import Sidebar from '../components/Sidebar'
import TalentMain from '../components/TalentMain'
const Talent = () => {
  return (
    <div className='flex'>
            <div className='min-w-[19%] sticky top-0 h-screen overflow-y-auto scrollbar-hide'>
                <Sidebar />
            </div>
            <div className='flex-grow'>
                <TalentMain />
            </div>
        </div>
  )
}

export default Talent