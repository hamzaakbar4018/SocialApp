import React, { useState, useRef, useEffect } from "react";
import { HiOutlineDotsVertical } from "react-icons/hi";
import newArrow from '../../assets/Icons SVG/Arrow.svg';
import {
  collection,
  doc,
  setDoc,
  query,
  orderBy,
  onSnapshot,
  updateDoc
} from "firebase/firestore";
import { db } from "../../Services/Firebase.jsx";
import { useAuth } from "../../Context/AuthContext.jsx";
import { useLocation } from 'react-router-dom';

const UsersChat = ({ userImg, username, time, usersCharMsgs, selectedCardIndex }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const messagesContainerRef = useRef(null);
  const messagesListenerRef = useRef(null);
  const { currentUser } = useAuth();
  const userID = currentUser ? currentUser.uid : null;
  const location = useLocation();
  const selectedChat = usersCharMsgs && usersCharMsgs[selectedCardIndex];

  useEffect(() => {
    if (messagesListenerRef.current) {
      messagesListenerRef.current();
    }

    if (!selectedChat || !userID) {
      return;
    }

    const otherID = selectedChat.id;

    const messagesRef = collection(
      db,
      "messages",
      userID,
      "recent_chats",
      otherID,
      "messages"
    );

    const messagesQuery = query(messagesRef, orderBy('sortTime', 'asc'));

    messagesListenerRef.current = onSnapshot(
      messagesQuery,
      (snapshot) => {
        const fetchedMessages = snapshot.docs.map(doc => ({
          id: doc.id,
          data: {
            ...doc.data(),
            time: formatTimestamp(doc.data().time)
          }
        }));

        setMessages(fetchedMessages);
        setTimeout(scrollToBottom, 100);
      },
      (error) => {
        console.error("Error fetching real-time messages:", error);
      }
    );

    return () => {
      if (messagesListenerRef.current) {
        messagesListenerRef.current();
      }
    };
  }, [selectedChat, userID, usersCharMsgs, selectedCardIndex]);

  const scrollToBottom = () => {
    if (messagesContainerRef.current) {
      const scrollContainer = messagesContainerRef.current;
      scrollContainer.scrollTop = scrollContainer.scrollHeight;
    }
  };

  const handleSendMessage = async () => {
    if (!newMessage.trim()) return;
    const msg = newMessage.trim();
    setNewMessage('');
    try {
      if (!selectedChat) return;

      const otherID = selectedChat.id;

      const now = new Date();
      const docID = now.toISOString().replace(/[:.]/g, '-');
      const sortTime = now.getTime(); // Using getTime() for consistent sorting

      const formattedTime = now.toLocaleString('en-US', {
        month: '2-digit',
        day: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      });

      const messageData = {
        docID,
        fromID: userID,
        toID: otherID,
        messageBody: msg,
        isRead: false,
        time: formattedTime,
        sortTime: sortTime
      };

      // Update sortTime in the recent_chats for the current user
      const currentUserRecentChatRef = doc(db, "messages", userID, "recent_chats", otherID);
      await updateDoc(currentUserRecentChatRef, { sortTime: sortTime });

      // Add the message to both users' message collections
      await Promise.all([
        setDoc(doc(db, "messages", userID, "recent_chats", otherID, "messages", docID), messageData),
        setDoc(doc(db, "messages", otherID, "recent_chats", userID, "messages", docID), messageData),
        updateRecentChats(userID, otherID, msg, formattedTime, sortTime),
        updateRecentChats(otherID, userID, msg, formattedTime, sortTime)
      ]);

      setTimeout(scrollToBottom, 100);
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const formatTimestamp = (timestamp) => {
    if (!timestamp) return 'Unknown time';

    if (typeof timestamp === 'string') {
      return timestamp;
    }

    if (timestamp && typeof timestamp === 'object' && 'seconds' in timestamp) {
      try {
        const date = new Date(timestamp.seconds * 1000 + timestamp.nanoseconds / 1000000);
        return date.toLocaleString('en-US', {
          hour: '2-digit',
          minute: '2-digit',
          hour12: true
        });
      } catch (error) {
        console.error("Error formatting timestamp:", error);
        return 'Invalid time';
      }
    }

    if (timestamp instanceof Date) {
      return timestamp.toLocaleString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      });
    }

    return 'Unknown time';
  };

  const updateRecentChats = async (currentUser, otherUser, latestMessage, formattedTime, sortTime) => {
    try {
      const recentChatRef = doc(
        db,
        "messages",
        currentUser,
        "recent_chats",
        otherUser
      );

      await setDoc(recentChatRef, {
        recentMessage: latestMessage,
        time: formattedTime,
        sortTime: sortTime
      }, { merge: true });
    } catch (error) {
      console.error("Error updating recent chats:", error);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  if (!selectedChat) {
    return (
      <div className="flex flex-col h-screen bg-white justify-center items-center">
        <div className="text-center p-8">
          <h3 className="text-xl font-semibold text-gray-700 mb-2">No Conversation Selected</h3>
          <p className="text-gray-500">Select a chat or start a new conversation</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-white">
        <div className="flex border-b border-gray-300 p-4 items-center justify-between">
          <div className="flex items-center gap-2">
            <img
              src={selectedChat.otherImage || userImg || ''}
              className="rounded-full w-14 h-14"
              alt={`${selectedChat.otherName || username || 'User'}'s avatar`}
            />
            <div>
              <h1 className="text-xl font-bold">{selectedChat.otherName || username || 'Unknown'}</h1>
              <p className="text-sm text-gray-400">{selectedChat.time || time || ''}</p>
            </div>
          </div>
          {/* Uncomment if you want to include the options menu
          <div className="flex border border-gray-400 rounded-full w-[30px] h-[30px] p-2 justify-center items-center">
            <HiOutlineDotsVertical className="font-bold text-2xl" />
          </div> 
          */}
        </div>
      </div>

      {/* Messages Container */}
      <div
        ref={messagesContainerRef}
        className="flex flex-col flex-1 overflow-y-auto bg-white"
      >
        <div className="p-4 flex-1">
          <div className="flex flex-col gap-2">
            {messages.length > 0 ? (
              messages.map((message, index) => {
                const isCurrentUser = message.data.fromID === userID;
                return (
                  <div
                    key={message.id || index}
                    className={`flex flex-col ${isCurrentUser ? 'items-end' : 'items-start'}`}
                  >
                    <div>
                      <div
                        className={`p-2 inline-block rounded-xl ${isCurrentUser
                            ? 'rounded-tr-none bg-[#399AF3] text-white'
                            : 'rounded-tl-none bg-[#E7E8E8] text-black'
                          }`}
                      >
                        {message.data.messageBody || 'No message'}
                      </div>
                    </div>
                    <div className={`chat ${isCurrentUser ? 'chat-end' : 'chat-start'}`}>
                      <div className="chat-header">
                        <time className="text-xs opacity-50">
                          {formatTimestamp(message.data.time)}
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
            {/* <div ref={messagesEndRef} /> */}
          </div>
        </div>
      </div>

      {/* Input Area */}
      <div className="sticky md:mt-16 bottom-0  bg-white p-4 flex items-center gap-1">
        <div className="bg-gray-100 w-auto flex-grow rounded-3xl">
          <input
            type="text"
            placeholder="Enter the message"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            className="p-3 outline-none bg-transparent w-full"
          />
        </div>

        <div
          onClick={handleSendMessage}
          className="bg-black flex-grow-0 rounded-full p-1 flex justify-center items-center cursor-pointer"
        >
          <img src={newArrow} alt="Send" className="w-10 p-1 h-10" />
        </div>
      </div>
    </div>
  );
};

export default UsersChat;
