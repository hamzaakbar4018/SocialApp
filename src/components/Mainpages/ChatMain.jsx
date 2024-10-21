import { useContext, useEffect, useRef, useState } from "react";;
import Rightbar from "../Rightbar";
import Arrow from '../../assets/Icons SVG/Arrow.svg'
import AllUsers from "../../Cards/Chat/AllUsers";
import UsersChat from "../../Cards/Chat/UsersChat";
import searchi from '../../assets/Icons SVG/Search.svg'
import Notifications from '../../assets/Icons SVG/Notifications.svg'
import Sidebar from '../Sidebar.jsx'
import { FiMenu } from 'react-icons/fi';
import { NotificatinData } from '../../Context/NotificatinContext.jsx';
import { IoMdArrowBack } from "react-icons/io";
import { HiOutlineDotsVertical } from "react-icons/hi";
const ChatMain = () => {
  const notifyData = useContext(NotificatinData);
  const [popup, setpopup] = useState(false);
  const handlePopup = () => {
    setpopup(!popup)
  }
  const [showSidebar, setShowSidebar] = useState(false);
  const handleSidebarToggle = () => {
    setShowSidebar(!showSidebar);
  };
  const [showRightbar, setShowRightbar] = useState(false);
  const [search, setSearch] = useState(false);
  const [selectedCardIndex, setSelectedCardIndex] = useState(0);
  const searchRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setSearch(false); // Close search bar if click is outside
      }
    };

    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [searchRef]);

  const staticChatData = [
    {
      id: 1,
      userImg: "https://randomuser.me/api/portraits/men/1.jpg",
      username: "Muhammad Ali",
      msg: {
        unread: true,
        text: "Hello how are you?",
        totalmsg: 1,
      },
      received: {
        received: true,
        msg: "Hello this is test msg for receiving.",
      },
      sent: {
        sent: true,
        msg: "Hello this is test msg for sending.",
      },
      time: "2 hours ago",
    },
    {
      id: 2,
      userImg: "https://randomuser.me/api/portraits/women/2.jpg",
      username: "Saira",
      msg: {
        unread: false,
        text: "I am fine, thanks!",
        totalmsg: 2,
      },
      received: {
        received: true,
        msg: "yooo",
      },
      sent: {
        sent: true,
        msg: "Glad to hear from you!",
      },
      time: "30 minutes ago",
    },
    {
      id: 3,
      userImg: "https://randomuser.me/api/portraits/men/3.jpg",
      username: "Abuzar",
      msg: {
        unread: true,
        text: "Haha hell yeh",
        totalmsg: 3,
      },
      received: {
        received: true,
        msg: "I agree with you!",
      },
      sent: {
        sent: true,
        msg: "That's awesome!",
      },
      time: "1 day ago",
    },
    {
      id: 4,
      userImg: "https://randomuser.me/api/portraits/women/4.jpg",
      username: "Sara",
      msg: {
        unread: true,
        text: "Are you available for a meeting?",
        totalmsg: 5,
      },
      received: {
        received: false,
        msg: "ABC",
      },
      sent: {
        sent: true,
        msg: "I will get back to you soon.",
      },
      time: "3 hours ago",
    },
  ];

  const handleBar = () => {
    setShowRightbar(!showRightbar);
  };

  const handleSearch = () => {
    console.log("Search button clicked");
    setSearch(!search);
  };
  const [isSheetOpen, setIsSheetOpen] = useState(false); // State to handle sheet visibility

  return (
    <div className="flex">
      <div className="w-full h-dvh overflow-hidden">
        <div className='flex px-0 bg-white justify-between items-center border-b py-4'>
          <h1 onClick={handleSidebarToggle} className={`${search ? 'hidden' : 'text-xl text-nowrap font-bold items-center p-3 flex gap-2'}`}> <span className='md:hidden block'><FiMenu className='text-3xl' /></span>Chat</h1>
          {showSidebar && (
            <dialog id="my_modal_3" className="modal" open>
              <div className="w-full h-full ">
                <form method="dialog">
                  <button className="btn btn-sm btn-circle btn-ghost absolute right-5 top-5 border-gray-300">✕</button>
                </form>
                <Sidebar />
              </div>
            </dialog>
          )}
          {search && (
            <div className='fixed inset-0 top-0 left-0 w-full h-full bg-black opacity-50 z-10'></div>
          )}
          <div className={`flex justify-end gap-2 md:gap-5 items-center w-full z-20`}>
            <div
              ref={searchRef}
              className={`relative flex border-gray-300 border justify-end items-center md:bg-[#F5F5F5] rounded-3xl px-3 md:py-2 py-3 space-x-2 transition-all duration-300 ease-in-out ${search ? 'w-full rounded-xl bg-[#F5F5F5]' : 'md:w-[300px]'}`}
            >
              <img onClick={handleSearch} src={searchi} className='w-5 h-5 md:w-6 md:h-6 cursor-pointer' alt="Search" />

              <input
                onClick={handleSearch}
                type="search"
                placeholder='Search'
                className={`outline-none flex bg-transparent rounded px-2 py-1 w-full transition-all duration-300 ease-in-out ${search ? 'block' : 'hidden md:flex'}`}
              />

              {search && (
                <img src={Arrow} onClick={handleSearch} className='w-9 p-1 h-9 bg-black rounded-full cursor-pointer' />
              )}

              {search && (
                <div className='bg-white absolute md:right-2 right-0 top-full mt-3 w-full md:w-[98%] rounded-lg p-4'>
                  <div className="recent flex items-center justify-between mx-1">
                    <div>
                      <h2 className='text-gray-400 text-sm'>Recent</h2>
                    </div>
                    <div>
                      <button className='text-[#399AF3] text-sm'>Clear all</button>
                    </div>
                  </div>
                  <div className="users flex justify-between items-center m-1">
                    <h1>Hamza Akbar</h1>
                    <h1 className='cursor-pointer'>✕</h1>
                  </div>
                </div>
              )}
            </div>

            <div
              onClick={() => {
                if (window.innerWidth <= 640) {
                  handlePopup();
                } else {
                  handleBar();
                }
              }}
              className={`${search ? 'hidden' : 'rounded-full cursor-pointer p-3 mr-4 border border-gray-300'}`}
            >
              <img src={Notifications} alt="Notifications" />
            </div>
            {
              popup && (
                <div className='bg-black bg-opacity-50 inset-0 fixed top-0'>
                  <dialog className="modal" open>
                    <div className="modal-box p-0">
                      <button
                        className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                        onClick={handlePopup}
                      >
                        ✕
                      </button>
                      <div className="border-b mb-3 px-6 pt-6 border-gray-400">
                        <h3 className="font-bold mb-4 text-lg">Notifications</h3>
                      </div>
                      <div className="px-6 flex mb-2 flex-col justify-center gap-2">
                        {notifyData.map((data, index) => (
                          <div className="flex items-center gap-2" key={index}>
                            <img
                              className="w-12 h-12 rounded-full"
                              src={data.image}
                              alt="image"
                            />
                            <div className="flex flex-col justify-center">
                              <h1 className="font-semibold">
                                {data.username} <span className="font-light">{data.text}</span>
                              </h1>
                              <p className="text-[#9B9B9B] text-sm">{data.time}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </dialog>
                </div>
              )
            }

          </div>


        </div>
        <div
          className={`showcard transition-all flex-1 overflow-hidden ${showRightbar ? "mr-[1%]" : "mr-0"
            } flex`}
          style={{ height: "calc(100dvh - 5.2rem)" }}
        >
          <div className="left bg-white w-full md:w-[25%] rounded overflow-y-auto border-r">
            {staticChatData.map((data, index) => (
              <AllUsers
                key={data.id}
                {...data}
                isActive={selectedCardIndex === index}
                isSelected={selectedCardIndex === index}
                onClick={() => {
                  setSelectedCardIndex(index);
                  setIsSheetOpen(true)
                }
                }

              />
            ))}
          </div>
          {/* chat */}
          <div
            className="right hidden min-h-full flex-shrink md:block flex-grow"
            style={{ maxHeight: "calc(100vh - 4rem)" }}
          >
            {selectedCardIndex !== null && (
              <div>
                <UsersChat
                  userImg={staticChatData[selectedCardIndex]?.userImg}
                  username={staticChatData[selectedCardIndex]?.username}
                  sent={staticChatData[selectedCardIndex]?.sent}
                  received={staticChatData[selectedCardIndex]?.received}
                  time={staticChatData[selectedCardIndex]?.time}
                />
              </div>
            )}
          </div>

          <div className={`fixed top-0 z-40 right-0 h-full bg-white shadow-lg transition-transform transform ${isSheetOpen ? 'translate-x-0' : 'translate-x-full'} md:hidden w-full sm:w-2/3`}>
            <button
              className="absolute flex items-center border-b border-gray-400 justify-between gap-2 top-0 left-0 bg-white w-full p-4 text-black"
              onClick={() => setIsSheetOpen(false)}
            >
              <div className="flex items-center gap-2">
                <IoMdArrowBack className='text-2xl mb-1 mt-3' />
                <div className="flex gap-2 items-center">
                  <img
                    src={staticChatData[selectedCardIndex]?.userImg}
                    alt="User Image"
                    className="w-[59px] h-[59px] rounded-full"
                  />
                  <div className="flex flex-col items-start">
                    <h1 className="font-bold">{staticChatData[selectedCardIndex]?.username}</h1>
                    <p>{staticChatData[selectedCardIndex]?.time}</p>
                  </div>
                </div>
              </div>
              <div>
                <div className='flex border border-gray-400 rounded-full w-[37px] h-[37px] p-2 justify-center items-center'>
                  <HiOutlineDotsVertical className="font-bold text-2xl" />
                </div>
              </div>

            </button>

            <div className="">
              {
                selectedCardIndex !== null && (
                  <UsersChat
                    userImg={staticChatData[selectedCardIndex]?.userImg}
                    username={staticChatData[selectedCardIndex]?.username}
                    sent={staticChatData[selectedCardIndex]?.sent}
                    received={staticChatData[selectedCardIndex]?.received}
                    time={staticChatData[selectedCardIndex]?.time}
                  />
                )
              }
            </div>
          </div>

        </div>
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
