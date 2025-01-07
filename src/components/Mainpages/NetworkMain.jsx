import React, { useContext, useEffect, useRef, useState } from 'react';
import searchi from '../../assets/Icons SVG/Search.svg'
import Notifications from '../../assets/Icons SVG/Notifications.svg'
import Arrow from '../../assets/Icons SVG/Arrow.svg'
import Rightbar from '../Rightbar';
import TalentCards from '../../Cards/Talent/TalentCards';
import IndustryPage from '../../Cards/Talent/IndustryPage'
import Sidebar from '../Sidebar.jsx'
import { FiMenu } from 'react-icons/fi';
import { NotificatinData } from '../../Context/NotificatinContext.jsx';
import { IndustryData } from '../../Context/IndustryContext.jsx';
import Load from '../Loader/Load.jsx';
import { collection, doc, getDocs, query, updateDoc, where, onSnapshot } from 'firebase/firestore';
import { db } from '../../Services/Firebase.jsx';
import Loader from '../Loader/Loader.jsx';
import { useAuth } from '../../Context/AuthContext.jsx';
import SearchBar from '../SearchBar.jsx';

const NetworkMain = () => {
    const networkpage = true;
    const talentData = useContext(IndustryData);
    const { currentUser } = useAuth();
    const dummyID = currentUser.uid;
    const [isInitialLoading, setIsInitialLoading] = useState(true);
    const [reqUsers, setReqUsers] = useState([]);
    const [UsersFriend, setUsersFriend] = useState([]);
    console.log("setUsersFriend", UsersFriend)

    // Updated UserFriends function with real-time listeners
    useEffect(() => {
        setIsInitialLoading(true);

        // Query to fetch the current user's document
        const currentUserQuery = query(
            collection(db, 'userCollection'),
            where("docID", "==", dummyID)
        );

        // Set up a real-time listener for the current user's document
        const unsubscribeCurrentUser = onSnapshot(currentUserQuery, (querySnapshot) => {
            if (querySnapshot.empty) {
                console.log("No user found with the given docID.");
                setReqUsers([]);
                setUsersFriend([]);
                setIsInitialLoading(false);
                return;
            }

            const userDoc = querySnapshot.docs[0];
            const userData = {
                id: userDoc.id,
                ...userDoc.data(),
            };

            setReqUsers([userData]);
            console.log("User Data Updated:", userData);

            const friendsList = userData.friends || [];

            if (friendsList.length === 0) {
                console.log("No friends found.");
                setUsersFriend([]);
                setIsInitialLoading(false);
                return;
            }

            // Firestore 'in' queries can handle up to 10 items. Split the friendsList into chunks of 10.
            const chunkSize = 10;
            const chunks = [];
            for (let i = 0; i < friendsList.length; i += chunkSize) {
                chunks.push(friendsList.slice(i, i + chunkSize));
            }

            // Array to hold unsubscribe functions for friends listeners
            const unsubscribeFriendsList = [];

            // Function to handle each chunk
            chunks.forEach((chunk) => {
                const friendsQuery = query(
                    collection(db, "userCollection"),
                    where("docID", "in", chunk)
                );

                const unsubscribe = onSnapshot(friendsQuery, (friendSnapshot) => {
                    const allFriendsData = friendSnapshot.docs.map(doc => ({
                        id: doc.id,
                        ...doc.data(),
                    }));

                    setUsersFriend(prevFriends => {
                        // Create a map for existing friends to avoid duplicates
                        const friendsMap = new Map(prevFriends.map(friend => [friend.id, friend]));
                        allFriendsData.forEach(friend => {
                            friendsMap.set(friend.id, friend);
                        });
                        return Array.from(friendsMap.values());
                    });

                    console.log("Friends List Updated:", allFriendsData);
                }, (error) => {
                    console.error("Error fetching friends:", error);
                });

                unsubscribeFriendsList.push(unsubscribe);
            });

            // Cleanup function for friends listeners
            return () => {
                unsubscribeFriendsList.forEach(unsub => unsub());
            };
        }, (error) => {
            console.error("Error fetching current user:", error);
            setIsInitialLoading(false);
        });

        // Cleanup function for current user listener
        return () => {
            unsubscribeCurrentUser();
            setIsInitialLoading(false);
        };
    }, [dummyID]);

    // ... rest of your component code remains unchanged ...

    const [connectionRequests, setConnectionRequests] = useState([]);

    const fetchRequests = async () => {
        try {
            setIsInitialLoading(true);
            const reqUsersQuery = query(
                collection(db, 'userCollection'),
                where("docID", "==", dummyID)
            );

            const querySnapShot = await getDocs(reqUsersQuery);
            const users = querySnapShot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));

            setReqUsers(users);
            console.log("user", users)

            // Fetch connection requests
            const requestsList = users.flatMap((user) => user.received || []);

            if (requestsList.length === 0) {
                console.log("No connection requests found.");
                return;
            }

            const allRequestsData = await Promise.all(
                requestsList.map(async (requestId) => {
                    const requestQuery = query(
                        collection(db, "userCollection"),
                        where("docID", "==", requestId)
                    );

                    const querySnap = await getDocs(requestQuery);
                    return querySnap.docs.map((doc) => ({
                        id: doc.id,
                        ...doc.data(),
                    }))[0]; // Return the first match
                })
            );

            setConnectionRequests(allRequestsData);
            console.log("All Connection Requests:", allRequestsData);
        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            setIsInitialLoading(false);
        }
    };

    const [Loading, setLoading] = useState(false);

    const handleConnectionRequest = async (requestUser, action) => {
        try {
            setLoading(true);
            const currentUserQuery = query(
                collection(db, 'userCollection'),
                where("docID", "==", dummyID)
            );
            const currentUserSnapshot = await getDocs(currentUserQuery);
            const currentUserDoc = currentUserSnapshot.docs[0];

            const requesterQuery = query(
                collection(db, 'userCollection'),
                where("docID", "==", requestUser.docID)
            );
            const requesterSnapshot = await getDocs(requesterQuery);
            const requesterDoc = requesterSnapshot.docs[0];

            const currentUserRef = doc(db, 'userCollection', currentUserDoc.id);
            const requesterRef = doc(db, 'userCollection', requesterDoc.id);

            if (action === 'accept') {
                await updateDoc(currentUserRef, {
                    received: (currentUserDoc.data().received || []).filter(id => id !== requestUser.docID),
                    friends: [...(currentUserDoc.data().friends || []), requestUser.docID]
                });

                await updateDoc(requesterRef, {
                    sent: (requesterDoc.data().sent || []).filter(id => id !== dummyID),
                    friends: [...(requesterDoc.data().friends || []), dummyID]
                });
            } else if (action === 'reject') {
                await updateDoc(currentUserRef, {
                    received: (currentUserDoc.data().received || []).filter(id => id !== requestUser.docID)
                });

                await updateDoc(requesterRef, {
                    sent: (requesterDoc.data().sent || []).filter(id => id !== dummyID)
                });
            }

            // Immediately update the local state to remove the processed request
            setConnectionRequests(prevRequests =>
                prevRequests.filter(request => request.docID !== requestUser.docID)
            );
            console.log("Connection request processed:", action);
            // No need to call UserFriends(); the real-time listener will handle updates
        } catch (error) {
            console.error("Error handling connection request:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchRequests();
    }, []);

    // ... rest of your component code remains unchanged ...

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
    const searchRef = useRef(null);
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (searchRef.current && !searchRef.current.contains(event.target)) {
                setSearch(false); // Close search bar if click is outside
            }
        };

        // Bind the event listener
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            // Unbind the event listener on clean up
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [searchRef]);
    const handleBar = () => {
        setShowRightbar(!showRightbar);
    };

    const handleSearch = () => {
        console.log("Search button clicked");
        setSearch(!search);
    };

    return (
        <div className='flex bg-gray-100'>
            <div className='flex-grow p-[2px] bg-gray-100 '>
                <div className='flex px-0 bg-white justify-between items-center border-b py-4'>
                    <h1 onClick={handleSidebarToggle} className={`${search ? 'hidden' : 'text-xl text-nowrap font-bold items-center p-3 flex gap-2'}`}> <span className='md:hidden block'><FiMenu className='text-3xl' /></span>My Network</h1>
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
                    <div className={`flex ${search && 'm-3'} justify-end gap-2 md:gap-5 items-center w-full z-20`}>
                        {/* <div
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
                        </div> */}
                        <SearchBar search={search} setSearch={setSearch} />

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
                                        <div className="bg-white h-screen w-full p-0">
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
                                                {
                                                    notifyData.length > 0 ? (
                                                        notifyData.map((data, index) => (
                                                            <div className="flex items-center gap-2" key={index}>
                                                                <img
                                                                    className="w-14 h-14 rounded-full"
                                                                    src={data.fromImage}
                                                                    alt="image"
                                                                />
                                                                <div className="flex flex-col justify-center">
                                                                    <h1 className="font-semibold">
                                                                        {data.fromName} <span className="font-light">{data.title}</span>
                                                                    </h1>
                                                                    <p className="text-[#9B9B9B] text-sm">
                                                                        {data.createdAt ? format(new Date(data.createdAt), 'MMM dd, yyyy, hh:mm a') : 'Date not available'}
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        ))
                                                    ) : (
                                                        <div className="text-center text-gray-400 text-sm">
                                                            No notifications available
                                                        </div>
                                                    )
                                                }
                                            </div>
                                        </div>
                                    </dialog>
                                </div>
                            )
                        }

                    </div>


                </div>
                {
                    isInitialLoading ? (
                        <Loader />
                    ) : (
                        <div className={`showcard transition-all ${showRightbar ? 'm-[]' : 'mr-[2px]'}`}>
                            <div className='p-[2px]'>
                                <div className=' bg-white '>
                                    <h1 className='font-bold p-2 md:pl-4'>Requests ({connectionRequests.length})</h1>
                                    <div className='flex pb-3 md:pb-0 flex-wrap md:gap-3 gap-2'>
                                        {connectionRequests.length > 0 ? (
                                            <div className=" bg-white flex-grow-0 space-y-2">
                                                <IndustryPage
                                                    network={true}
                                                    reqData={connectionRequests.map(user => ({
                                                        image: user.image || "https://randomuser.me/api/portraits/men/10.jpg",
                                                        username: user.firstName,
                                                        description: user.bio,
                                                        user: user
                                                    }))}
                                                    Loading={Loading}
                                                    onAccept={(user) => handleConnectionRequest(user, 'accept')}
                                                    onReject={(user) => handleConnectionRequest(user, 'reject')}
                                                />
                                            </div>
                                        ) : (
                                            <div className='ml-4 pb-2 flex justify-center items-center'>
                                                <p className='text-gray-600 font-bold'>No connection requests :</p>
                                            </div>

                                        )}
                                    </div>
                                </div>
                            </div>
                            <div className='p-[2px]'>
                                {/* <div className="bg-white md:p-4 p-2">
                                    <h1 className="font-bold">My Connections ({UsersFriend.length})</h1>
       
                                    {
                                        UsersFriend.length > 0 ? (
                                            <div className="grid grid-cols-2 gap-2 2xl:grid-cols-4 md:grid md:grid-cols-3  mt-3">

                                                {UsersFriend.map((data, index) => (
                                                    <TalentCards key={index} network={network} {...data} />
                                                ))}

                                            </div>
                                        ) : (
                                            <Load />
                                        )
                                    }

                                </div> */}
                                <div className="bg-white md:p-4 p-2">
                                    <h1 className="font-bold">My Connections ({UsersFriend.length})</h1>

                                    {isInitialLoading ? (
                                        // Show loading indicator while data is being fetched
                                        <Load />
                                    ) : UsersFriend.length > 0 ? (
                                        // Show the grid of connections if there are any
                                        <div className="grid grid-cols-2 gap-2 2xl:grid-cols-4 md:grid-cols-3 mt-3">
                                            {UsersFriend.map((data) => (
                                                <TalentCards
                                                    key={data.id}
                                                    networkpage={networkpage}
                                                    currentUser={currentUser}
                                                    {...data}
                                                />
                                            ))}
                                        </div>
                                    ) : (
                                        // Show a message if there are no connections
                                        <div className="mt-3">
                                            <h2 className="font-semibold text-gray-600">No connections yet :</h2>
                                        </div>
                                    )}
                                </div>

                            </div>
                        </div>
                    )
                }
            </div>

            {/* Right Sidebar */}
            {showRightbar && (
                <div className='w-[26%]'>
                    <Rightbar />
                </div>
            )}
        </div>
    );
};

export default NetworkMain;
