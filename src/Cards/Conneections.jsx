import React, { useState } from 'react'
import { AiOutlineCheck, AiOutlineClose } from 'react-icons/ai'
import '../CSS/Connections.css'
import { ImSpinner2 } from 'react-icons/im'

const Connections = ({ image, username, description, network, user, onAccept, onReject }) => {
  const [isAccepting, setIsAccepting] = useState(false);
  const [isRejecting, setIsRejecting] = useState(false);
  const handleAccept = async () => {
    if (onAccept) {
      setIsAccepting(true);
      try {
        await onAccept(user);
      } catch (error) {
        console.error('Error accepting connection:', error);
      } finally {
        setIsAccepting(false);
      }
    }
  };

  const handleReject = async () => {
    if (onReject) {
      setIsRejecting(true);
      try {
        await onReject(user);
      } catch (error) {
        console.error('Error rejecting connection:', error);
      } finally {
        setIsRejecting(false);
      }
    }
  };

  return (
    <div className={`flex flex-col gap-4 ${network && 'px-4 w-[245px] max-h-[230px] bg-[#ECF5FE] gap-6 rounded-xl py-8'}`}>
      {
        network ? (
          <div className='network ml-1 flex flex-col font-bold gap-2'>
            <img src={image} alt="" className={`w-12 h-12 ${network && 'w-20 h-20'} rounded-full`} />
            <div className=''>
              <h1 className='text-sm font-semibold'>{username}</h1>
              <p className='text-gray-400 text-xs'>{description}</p>
            </div>
          </div>
        ) : null
      }
      <div className={`flex ${network ? 'justify-start md:justify-center' : 'justify-center'} items-center md:gap-4 gap-2`}>
        <button
          onClick={handleAccept}
          disabled={isAccepting || isRejecting}
          className={`flex items-center gap-1 bg-[#B3FCE2] text-[#008F5C] py-2 px-3 rounded-3xl hover:bg-[#B3FCE2] ${(isAccepting || isRejecting) ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          {
            isAccepting ? (
              <div className='flex justify-center items-center gap-1'>
                <ImSpinner2 className='animate-spin' />
                Accepting
              </div>
            ) : (
              <div className='flex justify-center items-center gap-1'>
                <AiOutlineCheck size={16} />
                Accept
              </div>
            )
          }
        </button>
        <button
          onClick={handleReject}
          disabled={isAccepting || isRejecting}
          className={`flex items-center gap-1 bg-[#FFE5E5] text-[#FF4E4E] py-2 px-3 rounded-3xl hover:bg-[#FFE5E5] ${(isAccepting || isRejecting) ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          {
            isRejecting ? (
              <div className='flex justify-center items-center gap-1'>
                <ImSpinner2 className='animate-spin' />
                Rejecting
              </div>
            ) : (
              <div className='flex justify-center items-center gap-1'>
                <AiOutlineClose size={16} />
                Reject
              </div>
            )
          }
        </button>
      </div>
    </div>
  )
}

export default Connections