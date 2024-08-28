import React from 'react'
import Sidebar from '../components/Sidebar'
import TransacctionMain from '../components/TransacctionMain'
const Transacction = () => {
  return (
    <div className='flex'>
            <div className='min-w-[19%] sticky top-0 h-screen overflow-y-auto scrollbar-hide'>
                <Sidebar />
            </div>
            <div className='flex-grow'>
                <TransacctionMain />
            </div>

        </div>
  )
}

export default Transacction;