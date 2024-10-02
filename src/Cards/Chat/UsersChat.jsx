import React from "react";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { FaArrowCircleRight } from "react-icons/fa";

const UsersChat = ({ userImg, username, time, sent, received }) => {
  return (
    <div className="flex flex-col h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-white rounded-t">
        <div className="flex border-b border-gray-400 p-4 items-center justify-between">
          <div className="flex  items-center gap-2">
            <img
              src={userImg}
              className="rounded-full w-14 h-14"
              alt={`${username}'s avatar`}
            />
            <div>
              <h1 className="text-xl font-bold">{username}</h1>
              <p className="text-sm text-gray-400">{time}</p>
            </div>
          </div>
          <div className="flex border border-gray-400 rounded-full w-[30px] h-[30px] p-2 justify-center items-center">
            <HiOutlineDotsVertical className="font-bold text-2xl" />
          </div>
        </div>
      </div>

      <div className="flex flex-col flex-1 overflow-y-auto  bg-white">
        <div className="p-4 flex-1">
          <div className="flex flex-col gap-2">
            {received && received.msg && (
              <div className="flex flex-col">
                <div className="">
                  <div
                    className="p-2 inline-block rounded-tr-xl rounded-br-xl rounded-bl-xl text-black"
                    style={{ backgroundColor: "#E7E8E8" }}
                  >
                    {received.msg}
                  </div>
                </div>
                <div className="chat chat-start">
                  <div className="chat-header">
                    <time className="text-xs opacity-50">{time}</time>
                  </div>
                </div>
              </div>
            )}

            {/* Display sent messages */}
            {sent && sent.msg && (
              <div className="flex flex-col items-end">
                <div className="">
                  <div
                    className="p-2 rounded-tl-xl rounded-br-xl rounded-bl-xl"
                    style={{ backgroundColor: "#399AF3", color: "white" }}
                  >
                    {sent.msg}
                  </div>
                </div>
                <div className="chat chat-end">
                  <div className="chat-header">
                    <time className="text-xs opacity-50">{time}</time>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Input Section */}
      <div className="sticky bottom-0 border-gray-400 bg-white p-4 flex items-center gap-2">
        <div className="bg-gray-100 w-full rounded-3xl">
          <input
            type="text"
            placeholder="Enter the message"
            className="p-3 outline-none bg-transparent w-full"
          />
        </div>
        <FaArrowCircleRight className="text-4xl cursor-pointer" />
      </div>
    </div>
  );
};

export default UsersChat;
