import React from "react";
import { HiOutlineDotsVertical } from "react-icons/hi";
import newArrow from '../../assets/Icons SVG/Arrow.svg'

const UsersChat = ({
  userImg,
  username,
  time,
  usersCharMsgs,
  selectedCardIndex
}) => {
  // Debug logging with safe checking
  console.log("usersCharMsgs:", usersCharMsgs);
  console.log("selectedCardIndex:", selectedCardIndex);

  // More defensive message selection
  const selectedChatMessages = usersCharMsgs && 
    usersCharMsgs[selectedCardIndex] && 
    usersCharMsgs[selectedCardIndex].messages 
    ? usersCharMsgs[selectedCardIndex].messages 
    : [];

  // Render loading or empty state
  if (!usersCharMsgs || usersCharMsgs.length === 0) {
    return (
      <div className="flex flex-col h-screen bg-gray-100 justify-center items-center">
        <p>No chats available</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-white rounded-t">
        <div className="flex border-b border-gray-300 p-4 items-center justify-between">
          <div className="flex items-center gap-2">
            <img
              src={userImg || ''}
              className="rounded-full w-14 h-14"
              alt={`${username || 'User'}'s avatar`}
            />
            <div>
              <h1 className="text-xl font-bold">{username || 'Unknown'}</h1>
              <p className="text-sm text-gray-400">{time || ''}</p>
            </div>
          </div>
          <div className="flex border border-gray-400 rounded-full w-[30px] h-[30px] p-2 justify-center items-center">
            <HiOutlineDotsVertical className="font-bold text-2xl" />
          </div>
        </div>
      </div>

      <div className="flex flex-col flex-1 overflow-y-auto bg-white">
        <div className="p-4 flex-1">
          <div className="flex flex-col gap-2">
            {selectedChatMessages.length > 0 ? (
              selectedChatMessages.map((message, index) => {
                // Add null checks and provide fallback values
                const messageData = message?.data || {};
                const isCurrentUser = messageData.fromID === "1";

                return (
                  <div
                    key={message?.id || index}
                    className={`flex flex-col ${isCurrentUser ? 'items-end' : ''}`}
                  >
                    <div>
                      <div
                        className={`p-2 inline-block rounded-xl ${isCurrentUser
                            ? 'rounded-tr-none bg-[#399AF3] text-white'
                            : 'rounded-tl-none bg-[#E7E8E8] text-black'
                          }`}
                      >
                        {messageData.messageBody || 'No message'}
                      </div>
                    </div>
                    <div className={`chat ${isCurrentUser ? 'chat-end' : 'chat-start'}`}>
                      <div className="chat-header">
                        <time className="text-xs opacity-50">
                          {messageData.time || 'Unknown time'}
                        </time>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="text-center text-gray-500">
                No messages in this conversation
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Input Section */}
      <div className="sticky bottom-0 border-gray-400 bg-white p-4 flex items-center gap-1">
        <div className="bg-gray-100 w-auto flex-grow rounded-3xl">
          <input
            type="text"
            placeholder="Enter the message"
            className="p-3 outline-none bg-transparent w-auto"
          />
        </div>
        <div className="bg-black flex-grow-0 rounded-full p-1 flex justify-center items-center cursor-pointer">
          <img src={newArrow} alt="" className="w-10 p-1 h-10" />
        </div>
      </div>
    </div>
  );
};

export default UsersChat;