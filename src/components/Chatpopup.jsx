import React, { useState } from 'react';
import { motion } from 'framer-motion'; // Import Framer Motion
import { HiOutlineDotsVertical, HiOutlineMinus, HiOutlineX } from "react-icons/hi";
import { FaArrowCircleRight } from 'react-icons/fa';

const PopupChat = ({ userImg, username, time, sent, received }) => {
  const [isMinimized, setIsMinimized] = useState(false);

  return (
    <motion.div
      className={`fixed bottom-4 right-4 bg-white shadow-lg rounded-lg ${
        isMinimized ? 'w-16 h-16 flex items-center justify-center' : 'w-80 h-96'
      } transition-all duration-300 cursor-move`}
      drag
      dragConstraints={{ top: -100, left: -100, right: 100, bottom: 100 }} 
      dragElastic={1.5} 
      initial={{ scale: 0.9 }}
      animate={{ scale: 1 }}
      whileHover={{ scale: 1.05 }}
    >
      {/* Header Section */}
      <div className={`flex items-center justify-between p-2 ${isMinimized ? 'hidden' : 'block'}`}>
        <div className="flex items-center gap-2">
          <img src={userImg} className="rounded-full w-10 h-10" alt={`${username}'s avatar`} />
          <div>
            <h1 className="text-lg font-bold">{username}</h1>
            <p className="text-xs text-gray-400">{time}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={() => setIsMinimized(true)} className="p-1">
            <HiOutlineMinus className="text-lg" />
          </button>
          <button className="p-1">
            <HiOutlineX className="text-lg" />
          </button>
        </div>
      </div>

      {/* Chat Section */}
      {!isMinimized && (
        <div className="flex flex-col flex-1 overflow-y-auto p-4">
          <div className="flex flex-col gap-2">
            {/* Display received messages */}
            {received && received.msg && (
              <div className="flex flex-col">
                <div className="chat chat-start">
                  <div className="chat-bubble text-black" style={{ backgroundColor: '#E7E8E8' }}>
                    {received.msg}
                  </div>
                </div>
                <div className="chat chat-start">
                  <div className="chat-header">
                    <time className="text-xs opacity-50">{received.time}</time>
                  </div>
                </div>
              </div>
            )}

            {/* Display sent messages */}
            {sent && sent.msg && (
              <div className="flex flex-col items-end">
                <div className="chat chat-end">
                  <div className="chat-bubble" style={{ backgroundColor: '#399AF3', color: 'white' }}>
                    {sent.msg}
                  </div>
                </div>
                <div className="chat chat-end">
                  <div className="chat-header">
                    <time className="text-xs opacity-50">{sent.time}</time>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Input Section */}
      {!isMinimized && (
        <div className="border-t border-gray-300 bg-white p-2 flex items-center gap-2">
          <div className="bg-gray-100 w-full rounded-3xl">
            <input
              type="text"
              placeholder="Enter the message"
              className="p-2 outline-none bg-transparent w-full"
            />
          </div>
          <FaArrowCircleRight className="text-2xl cursor-pointer" />
        </div>
      )}

      {/* Minimized State */}
      {isMinimized && (
        <button onClick={() => setIsMinimized(false)} className="text-lg rounded-3xl font-bold">
          Chat
        </button>
      )}
    </motion.div>
  );
};

export default PopupChat;
