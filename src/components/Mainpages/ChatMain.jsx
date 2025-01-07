import { useContext, useEffect, useRef, useState } from "react";
import Rightbar from "../Rightbar";
import Arrow from '../../assets/Icons SVG/Arrow.svg';
import AllUsers from "../../Cards/Chat/AllUsers";
import UsersChat from "../../Cards/Chat/UsersChat";
import searchi from '../../assets/Icons SVG/Search.svg';
import Notifications from '../../assets/Icons SVG/Notifications.svg';
import Edit from '../../assets/Icons SVG/Edit.svg';
import Sidebar from '../Sidebar.jsx';
import { FiMenu } from 'react-icons/fi';
import { NotificatinData } from '../../Context/NotificatinContext.jsx';
import { IoMdArrowBack } from "react-icons/io";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { useLocation } from "react-router-dom";
import { LuPencil } from "react-icons/lu";
import { useAuth } from '../../Context/AuthContext.jsx';
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
  Timestamp,
  orderBy,
  onSnapshot,
  addDoc,
  updateDoc
} from "firebase/firestore";
import { db } from "../../Services/Firebase.jsx";
import Loader from "../Loader/Loader.jsx";
import SearchBar from "../SearchBar.jsx";
import NoData from "../Loader/NoData.jsx";

const ChatMain = () => {
  const { currentUser } = useAuth();
  const userID = currentUser.uid;

  const [selectedChatId, setSelectedChatId] = useState(null);
  const [selectedCardIndex, setSelectedCardIndex] = useState(0);

  const [recentChats, setRecentChats] = useState([]);
  const [usersData, setUsersData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [usersCharMsgs, setUsersCharMsgs] = useState([]);

  const notifyData = useContext(NotificatinData);
  const [popup, setpopup] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  const [showRightbar, setShowRightbar] = useState(false);
  const [search, setSearch] = useState(false);

  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const searchRef = useRef(null);

  const formatTimestamp = (timestamp) => {
    if (!timestamp) return 'Unknown time';

    if (timestamp instanceof Timestamp) {
      return timestamp.toDate().toLocaleString('en-US', {
        month: '2-digit',
        day: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      });
    }

    if (typeof timestamp === 'string') {
      console.log(timestamp)
      return timestamp;
    }

    if (timestamp && typeof timestamp === 'object' && 'seconds' in timestamp) {
      const date = new Date(timestamp.seconds * 1000 + timestamp.nanoseconds / 1000000);
      return date.toLocaleString('en-US', {
        month: '2-digit',
        day: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        miliseconds: '2-digit',
        nanoseconds: '2-digit',
        second12: true,
        hour12: true
      });
    }
    return 'Unknown time';
  };

  useEffect(() => {
    const fetchRecentChats = () => {
      try {
        setIsLoading(true);
        const recentChatsRef = collection(db, "messages", userID, "recent_chats" );
        const recentChatsQuery = query(recentChatsRef, orderBy("sortTime", "desc"));

        const unsubscribe = onSnapshot(
          recentChatsQuery,
          async (snapshot) => {
            const recentChatsIds = snapshot.docs.map((docSnap) => ({
              id: docSnap.id,
              data: {
                ...docSnap.data(),
                // Keep the original timestamp
                sortTime: docSnap.data().sortTime,
                // Add a formatted time for display
                formattedTime: formatTimestamp(docSnap.data().time),
              },
            }));

            if (recentChatsIds.length > 0) {
              setRecentChats(recentChatsIds);

              const userMessagesPromises = recentChatsIds.map(async (chat) => {
                const messagesRef = collection(
                  db,
                  "messages",
                  userID,
                  "recent_chats",
                  chat.id,
                  "messages"
                );
                const messagesSnapshot = await getDocs(messagesRef);
                const messages = messagesSnapshot.docs.map((messageDoc) => ({
                  id: messageDoc.id,
                  data: {
                    ...messageDoc.data(),
                    time: formatTimestamp(messageDoc.data().time)
                  },
                }));

                return {
                  id: chat.id,
                  data: chat.data,
                  messages,
                };
              });

              const usersCharMsgs = await Promise.all(userMessagesPromises);
              setUsersCharMsgs(usersCharMsgs);

              const userPromises = recentChatsIds.map(async (element) => {
                const getUserDataSnapshot = await getDoc(
                  doc(db, "users", element.id)
                );
                if (getUserDataSnapshot.exists()) {
                  const userData = getUserDataSnapshot.data();
                  return { id: getUserDataSnapshot.id, data: userData };
                }
                return null;
              });

              const usersData = await Promise.all(userPromises);
              setUsersData(usersData.filter((user) => user !== null));
            } else {
              setRecentChats([]);
              setUsersCharMsgs([]);
            }
            setIsLoading(false);
          },
          (error) => {
            console.error("Error fetching recent chats:", error);
            setIsLoading(false);
          }
        );

        return unsubscribe;
      } catch (error) {
        console.error("Error setting up listener:", error);
        setIsLoading(false);
      }
    };

    const unsubscribe = fetchRecentChats();
    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, [userID]);

  useEffect(() => {
    if (selectedChatId && recentChats.length > 0) {
      const newIndex = recentChats.findIndex(
        (chat) => chat.id === selectedChatId
      );
      setSelectedCardIndex(newIndex !== -1 ? newIndex : null);
    }
  }, [recentChats, selectedChatId]);

  const handleSendMessage = async (otherUserId, textMessage) => {
    try {
      const timeNow = Timestamp.now();
      await addDoc(
        collection(db, "messages", userID, "recent_chats", otherUserId, "messages"),
        {
          text: textMessage,
          time: timeNow,
          senderId: userID,
        }
      );
      await updateDoc(
        doc(db, "messages", userID, "recent_chats", otherUserId),
        {
          sortTime: timeNow, // Ensure sortTime is updated
          recentMessage: textMessage,
        }
      );

      await addDoc(
        collection(db, "messages", otherUserId, "recent_chats", userID, "messages"),
        {
          text: textMessage,
          time: timeNow,
          senderId: userID,
        }
      );
      await updateDoc(
        doc(db, "messages", otherUserId, "recent_chats", userID),
        {
          sortTime: timeNow, // Ensure sortTime is updated for the other user
          recentMessage: textMessage,
        }
      );

      // Update the recentChats state to move the chat to the top
      setRecentChats((prevChats) => {
        const updatedChats = prevChats.map((chat) =>
          chat.id === otherUserId
            ? { 
                ...chat, 
                data: { 
                  ...chat.data, 
                  sortTime: timeNow, // Update sortTime
                  recentMessage: textMessage,
                  formattedTime: formatTimestamp(timeNow) // Update formattedTime
                } 
              }
            : chat
        );
        return updatedChats.sort((a, b) => b.data.sortTime.seconds - a.data.sortTime.seconds);
      });

      // Update the selected chat index to the top
      setSelectedCardIndex(0);
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const handlePopup = () => {
    setpopup(!popup);
  };

  const handleSidebarToggle = () => {
    setShowSidebar(!showSidebar);
  };

  const handleBar = () => {
    setShowRightbar(!showRightbar);
  };

  const handleSearch = () => {
    setSearch(!search);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setSearch(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [searchRef]);

  const location = useLocation();
  const chatLocation = location.pathname === '/chat';
  const isSmallScreen = window.innerWidth <= 640;

  return (
    <div className="flex">
      <div className="w-full h-dvh overflow-hidden">
        <div className="flex px-0 bg-white justify-between items-center border-b py-4">
          <h1
            onClick={handleSidebarToggle}
            className={`${search ? "hidden" : "text-xl font-bold items-center p-3 flex gap-2"
              }`}
          >
            <span className="md:hidden block">
              <FiMenu className="text-3xl" />
            </span>
            Chat
          </h1>

          {showSidebar && (
            <dialog id="my_modal_3" className="modal" open>
              <div className="w-full h-full">
                <form method="dialog">
                  <button className="btn btn-sm btn-circle btn-ghost absolute right-5 top-5 border-gray-300">
                    ✕
                  </button>
                </form>
                <Sidebar />
              </div>
            </dialog>
          )}

          {search && (
            <div className="fixed inset-0 top-0 left-0 w-full h-full bg-black opacity-50 z-10"></div>
          )}

          <div
            className={`flex ${search && "m-3"} justify-end gap-2 md:gap-5 items-center w-full z-10`}
          >
            <SearchBar search={search} setSearch={setSearch} />

            <div
              onClick={() => {
                if (window.innerWidth <= 640) {
                  handlePopup();
                } else {
                  handleBar();
                }
              }}
              className={`${search
                ? "hidden"
                : "rounded-full cursor-pointer p-3 mr-4 border border-gray-300"
                } ${chatLocation && isSmallScreen && "bg-black border-0"}`}
            >
              {isSmallScreen ? (
                chatLocation ? (
                  <LuPencil className="text-white text-xl" />
                ) : (
                  <img src={Notifications} alt="Notifications" />
                )
              ) : (
                <img src={Notifications} alt="Notifications" />
              )}
            </div>

            {popup && (
              <div className="bg-black bg-opacity-50 inset-0 fixed top-0">
                <dialog className="modal" open>
                  <div className="bg-white h-screen p-0">
                    <button
                      className="btn btn-sm btn-circle btn-ghost absolute right-4 top-5 border border-gray-300"
                      onClick={handlePopup}
                    >
                      ✕
                    </button>
                    <div className="border-b mb-3 px-6 pt-6 border-gray-300">
                      <h3 className="font-bold mb-4 text-lg">Notifications</h3>
                    </div>
                    <div className="px-6 flex mb-2 flex-col justify-center gap-3">
                      {notifyData.map((data, index) => (
                        <div className="flex items-center gap-2" key={index}>
                          <img
                            className="w-14 h-14 rounded-full"
                            src={data.image}
                            alt="Notif"
                          />
                          <div className="flex flex-col justify-center">
                            <h1 className="font-semibold">
                              {data.username}{" "}
                              <span className="font-light">{data.text}</span>
                            </h1>
                            <p className="text-[#9B9B9B] text-sm">
                              {data.time}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </dialog>
              </div>
            )}
          </div>
        </div>

        {isLoading ? (
          <Loader />
        ) : (
          <div
            className={`showcard transition-all flex-1 overflow-hidden ${showRightbar ? "mr-[1%]" : "mr-0"
              } flex`}
            style={{ height: "calc(100dvh - 5.2rem)" }}
          >
            <div className={`left p-[4px] bg-[#F5F5F5] w-full md:w-auto md:min-w-[25%] rounded overflow-y-auto ${recentChats.length === 0 && 'md:min-w-full'}`}>
              {
                recentChats.length > 0 ? (
                  recentChats.map((usr, index) => (
                    <AllUsers
                      key={usr.id}
                      otherName={usr.data.otherName}
                      otherImage={usr.data.otherImage}
                      otherID={usr.id} // Assuming id is the user ID
                      recentMessage={usr.data.recentMessage}
                      time={usr.data.formattedTime} // Use formattedTime here
                      isActive={selectedCardIndex === index}
                      isSelected={selectedCardIndex === index}
                      onClick={() => {
                        setSelectedChatId(usr.id);
                        setIsSheetOpen(true);
                      }}
                    />
                  ))
                ) : (
                  <NoData />
                )
              }
            </div>

            <div
              className={`right py-[4px] px-[2px] bg-[#F5F5F5] hidden min-h-full flex-shrink md:block flex-grow ${recentChats.length === 0 && 'hidden'}`}
              style={{ maxHeight: "calc(100vh - 4rem)" }}
            >
              {recentChats && recentChats.length > 0 && selectedCardIndex !== null && (
                <UsersChat
                  userImg={recentChats[selectedCardIndex]?.data?.otherImage}
                  username={recentChats[selectedCardIndex]?.data?.otherName}
                  time={recentChats[selectedCardIndex]?.data?.formattedTime}
                  usersCharMsgs={usersCharMsgs}
                  selectedCardIndex={selectedCardIndex}
                  recentChats={recentChats}
                  onSendMessage={handleSendMessage}
                />
              )}
            </div>

            <div
              className={`fixed top-0 z-40 right-0 h-full bg-white shadow-lg transition-transform transform ${isSheetOpen ? "translate-x-0" : "translate-x-full"
                } md:hidden w-full sm:w-2/3`}
            >
              <button
                className="absolute flex items-center border-b border-gray-300 justify-between gap-2 top-0 left-0 bg-white w-full p-4 text-black"
                onClick={() => setIsSheetOpen(false)}
              >
                <div className="flex items-center gap-2">
                  <IoMdArrowBack className="text-2xl mb-1 mt-3" />
                  <div className="flex gap-2 items-center">
                    <img
                      src={
                        recentChats[selectedCardIndex]?.data?.otherImage ||
                        ""
                      }
                      alt="User"
                      className="w-[59px] h-[59px] rounded-full"
                    />
                    <div className="flex flex-col items-start">
                      <h1 className="font-bold">
                        {recentChats[selectedCardIndex]?.data?.otherName}
                      </h1>
                      <p>{recentChats[selectedCardIndex]?.data?.formattedTime}</p>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="flex border border-gray-400 rounded-full w-[37px] h-[37px] p-2 justify-center items-center">
                    <HiOutlineDotsVertical className="font-bold text-2xl" />
                  </div>
                </div>
              </button>

              <div className=''>
                {recentChats && recentChats.length > 0 && selectedCardIndex !== null && (
                  <UsersChat
                    userImg={recentChats[selectedCardIndex]?.data?.otherImage}
                    username={recentChats[selectedCardIndex]?.data?.otherName}
                    time={recentChats[selectedCardIndex]?.data?.formattedTime}
                    usersCharMsgs={usersCharMsgs}
                    selectedCardIndex={selectedCardIndex}
                    recentChats={recentChats}
                    onSendMessage={handleSendMessage}
                  />
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {showRightbar && (
        <div className="w-[26%] h-dvh">
          <Rightbar />
        </div>
      )}
    </div>
  );
};

export default ChatMain;

