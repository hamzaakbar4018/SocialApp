import React from 'react'
import Sidebar from '../components/Sidebar'
import CastingMain from '../components/Casting/CastingMain'

const Casting = () => {
  return (
    <div className='flex'>
            <div className='min-w-[19%] sticky top-0 h-screen overflow-y-auto scrollbar-hide'>
                <Sidebar />
            </div>
            <div className='flex-grow'>
                <CastingMain/>
            </div>
        </div>
  )
}

export default Casting