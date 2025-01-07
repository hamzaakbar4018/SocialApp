import React, { useEffect, useState } from "react";
import { ImSpinner2 } from "react-icons/im";
import { IoMailOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { db } from "../../Services/Firebase";
import {
  doc,
  getDoc,
  updateDoc,
  arrayUnion,
  arrayRemove,
  setDoc,
  serverTimestamp
} from "firebase/firestore";

const TalentCards = ({
  image,
  firstName,
  categoryName,
  docID,
  connect,
  landingtalent,
  network,
  onConnect,
  onFollow,
  connectionStatus: initialConnectionStatus,
  production,
  currentUser,
  networkpage
}) => {
  const navigate = useNavigate();
  const [isConnecting, setIsConnecting] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState(initialConnectionStatus || "Follow");
  const handleProfile = (uid) => {
    navigate(`/userprofile/${uid}`);

  }
  const initializeChat = async () => {
    try {
      const userID = currentUser?.uid  
      const now = new Date();
      const timestamp = serverTimestamp();
      const formattedTime = now.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        miliseconds: 'numeric',
        nanoseconds: 'numeric',
        hour12: true
      });

      // Check if chat already exists
      const existingChatRef = doc(db, "messages", userID, "recent_chats", docID);
      const existingChatSnap = await getDoc(existingChatRef);

      if (!existingChatSnap.exists()) {
        // Create initial message
        const initialMessageId = now.toISOString().replace(/[:.]/g, '-');
        const messageData = {
          docID: initialMessageId,
          fromID: userID,
          toID: docID,
          messageBody: "👋 Hello!",
          isRead: false,
          time: formattedTime,
          timestamp,
          sortTime: now.getTime() * 1000
        };

        // Create chat documents for both users
        const currentUserChatData = {
          id: docID,
          otherID: docID,
          otherName: firstName,
          otherImage: image,
          recentMessage: "👋 Hello!",
          time: formattedTime,
          timestamp,
          sortTime: now.getTime() * 1000
        };

        const otherUserChatData = {
          id: userID,
          otherID: userID,
          otherName: currentUser?.displayName || "Current User",
          otherImage: currentUser?.photoURL || "",
          recentMessage: "👋 Hello!",
          time: formattedTime,
          timestamp,
          sortTime: now.getTime() * 1000
        };

        // Create new chat documents and initial message
        await Promise.all([
          setDoc(doc(db, "messages", userID, "recent_chats", docID), currentUserChatData),
          setDoc(doc(db, "messages", docID, "recent_chats", userID), otherUserChatData),
          setDoc(doc(db, "messages", userID, "recent_chats", docID, "messages", initialMessageId), messageData),
          setDoc(doc(db, "messages", docID, "recent_chats", userID, "messages", initialMessageId), messageData)
        ]);

        // Navigate to chat with the selected chat data
        navigate('/chat', {
          state: {
            selectedChat: currentUserChatData
          }
        });
      } else {
        // If chat exists, just navigate to it
        const existingChatData = existingChatSnap.data();
        navigate('/chat', {
          state: {
            selectedChat: {
              ...existingChatData,
              id: docID,
              otherID: docID,
              otherName: firstName,
              otherImage: image
            }
          }
        });
      }
    } catch (error) {
      console.error("Error initializing chat:", error);
    }
  };

  // Rest of the component code remains the same...
  const handleConnect = async () => {
    if (onConnect) {
      setIsConnecting(true);
      try {
        const newStatus = await onConnect({
          docID,
          firstName,
          image,
          categoryName
        });
        setConnectionStatus(newStatus);
      } catch (error) {
        console.error('Error connecting:', error);
      } finally {
        setIsConnecting(false);
      }
    }
  };

  const handleFollow = async () => {
    if (onFollow) {
      setIsConnecting(true);
      try {
        const userID = currentUser?.uid || "YTHetwednqeLYoraizuJ4PLFFlp2";
        const userDocRef = doc(db, 'userCollection', userID);
        const userDocSnap = await getDoc(userDocRef);

        if (userDocSnap.exists()) {
          const userData = userDocSnap.data();
          const followList = userData.follow || [];
          const isCurrentlyFollowing = followList.includes(docID);

          if (isCurrentlyFollowing) {
            await updateDoc(userDocRef, {
              follow: arrayRemove(docID)
            });
            setConnectionStatus('Follow');
          } else {
            await updateDoc(userDocRef, {
              follow: arrayUnion(docID)
            });
            setConnectionStatus('Following');
          }
        }
      } catch (error) {
        console.error('Error following/unfollowing:', error);
      } finally {
        setIsConnecting(false);
      }
    }
  };

  useEffect(() => {
    const fetchFollowStatus = async () => {
      try {
        const userID = currentUser?.uid;
        const userDocRef = doc(db, 'userCollection', userID);
        const userDocSnap = await getDoc(userDocRef);

        if (userDocSnap.exists()) {
          const userData = userDocSnap.data();
          const followList = userData.follow || [];
          const isFollowing = followList.includes(docID);
          setConnectionStatus(isFollowing ? 'Following' : 'Follow');
        }
      } catch (error) {
        console.error("Error fetching follow status:", error);
      }
    };

    fetchFollowStatus();
  }, [docID, currentUser]);

  return (
    <div className="md:overflow-hidden">
      <div className={`bg-[#ECF5FE] rounded-2xl p-5 h-auto w-[255px] 
        ${network && 'md:min-w-[255px] h-auto w-auto'} 
        ${landingtalent && '2xl:min-h-[433px] md:min-w-auto md:h-auto h-[340px] w-[300px] 2xl:min-w-[356px]'} 
        ${connect && 'w-[222px] tracking-tighter'} 
        min-h-min h-[250px] `}>
        <div className="flex flex-col gap-3 space-y-2 h-full">
          {landingtalent ? (
            <div className="flex md:gap-0 gap-2 flex-col mt-3 justify-center items-center">
              <img
                
                src={image}
                className="rounded-full cursor-pointer w-20 h-20 2xl:w-40 2xl:h-40"
                alt="User img"
              />
              <h2 className="2xl:mt-8 mt-4 2xl:text-2xl font-bold text-center">{firstName}</h2>
              {
                Array.isArray(categoryName) && categoryName.map((cat, index) => (
                  <p key={index} className="text-gray-400 2xl:mt-5 2xl:text-xl text-center">{cat}</p>
                ))
              }
            </div>
          ) : (
            <div>
              <div className="flex-shrink-0">
                <img
                onClick={() => handleProfile(docID)}
                  src={image}
                  className="rounded-full cursor-pointer w-20 h-20 object-cover"
                  alt="User img"
                />
              </div>
              <h2 className="mt-2 text-lg font-bold">{firstName}</h2>
              <div className="flex flex-wrap gap-2">
                {
                  Array.isArray(categoryName) && categoryName.map((cat, index) => (
                    <p key={index} className="text-gray-400">{cat}</p>
                  ))
                }
              </div>
            </div>
          )}
          <div className="flex justify-between items-center mt-auto">
            <button
              onClick={handleFollow}
              disabled={isConnecting}
              className={`bg-black ${landingtalent ? '2xl:min-w-[248px] w-full 2xl:text-2xl 2xl:mt-5' : 'w-full text-nowrap rounded-full px-3 tracking-tighter'} rounded-3xl text-white py-2`}
            >
              {isConnecting ? (
                <div className="flex gap-1 justify-center items-center">
                  <ImSpinner2 className="animate-spin" />
                  {connectionStatus === 'Following' ? 'Unfollowing' : 'Following'}
                </div>
              ) : (
                networkpage ? "Connected" : connectionStatus
              )}
            </button>
            {landingtalent ? (
              <div
                onClick={initializeChat}
                className="rounded-full border 2xl:mt-5 p-2 ml-3 cursor-pointer hover:bg-gray-100"
              >
                <IoMailOutline className="2xl:text-4xl text-3xl" />
              </div>
            ) : (
              <div
                onClick={initializeChat}
                className="ml-3 mr-3 p-2 border border-gray-400 rounded-full flex justify-center items-center cursor-pointer hover:bg-gray-100"
              >
                <IoMailOutline className="text-2xl" />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TalentCards;