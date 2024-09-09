import React from 'react'
import Sidebar from '../components/Sidebar'
import ChatMain from '../components/Chat/ChatMain'

const Chat = () => {
  return (
    <div className='w-full'>
            <div className='flex-grow'>
                <ChatMain/>
            </div>
        </div>
  )
}

export default Chat