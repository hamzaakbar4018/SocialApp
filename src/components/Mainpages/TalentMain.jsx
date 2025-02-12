import React, { useContext, useEffect, useRef, useState } from "react";
import {
    collection,
    doc,
    getDocs,
    query,
    updateDoc,
    where,
    arrayRemove,
} from "firebase/firestore";
import { onSnapshot } from "firebase/firestore";
import { FiMenu } from "react-icons/fi";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

// Components
import Rightbar from "../Rightbar";
import ProductionData from "../../Cards/Talent/ProductionData";
import IndustryPage from "../../Cards/Talent/IndustryPage";
import Sidebar from "../Sidebar.jsx";
import Loader from "../Loader/Loader.jsx";
import SearchBar from "../SearchBar.jsx";
import NoDataFound from "../Loader/NoData.jsx";

// Context
import { NotificatinData } from "../../Context/NotificatinContext.jsx";
import { IndustryData } from "../../Context/IndustryContext.jsx";
import { useAuth } from "../../Context/AuthContext.jsx";

// Firebase
import { db } from "../../Services/Firebase.jsx";

// Assets
import searchi from "../../assets/Icons SVG/Search.svg";
import Notifications from "../../assets/Icons SVG/Notifications.svg";

const TalentMain = () => {
    // Context
    const { talentData, isLoading } = useContext(IndustryData);
    const notifyData = useContext(NotificatinData);
    const { currentUser } = useAuth();

    // State
    const [loading, setLoading] = useState(false);
    const [popup, setPopup] = useState(false);
    const [showSidebar, setShowSidebar] = useState(false);
    const [showRightbar, setShowRightbar] = useState(false);
    const [search, setSearch] = useState(false);
    const [connectionStatus, setConnectionStatus] = useState({});

    // Refs
    const searchRef = useRef(null);

    // Filter production houses
    const productionData =
        talentData?.filter((user) => user.isProductionHouse === true) || [];

    // Filter followed users if logged in
    const usersWithDummyId = currentUser
        ? productionData.filter(
            (user) =>
                Array.isArray(user.follow) && user.follow.includes(currentUser.uid)
        )
        : [];

    // Handlers
    const handlePopup = () => setPopup(!popup);
    const handleSidebarToggle = () => setShowSidebar(!showSidebar);
    const handleBar = () => setShowRightbar(!showRightbar);
    const handleSearch = () => setSearch(!search);

    // Handle connection requests
    const handleConnect = async (targetedUser, action = "connect") => {
        if (!currentUser) {
            window.location.href = "/login";
            return false;
        }

        try {
            setLoading(true);

            // Get current user's document
            const currentUserQuery = query(
                collection(db, "userCollection"),
                where("docID", "==", currentUser.uid)
            );
            const currentUserSnapshot = await getDocs(currentUserQuery);

            if (currentUserSnapshot.empty) {
                console.error("Current user not found");
                return false;
            }

            const currentUserDoc = currentUserSnapshot.docs[0];

            // Get targeted user's document
            const requesterQuery = query(
                collection(db, "userCollection"),
                where("docID", "==", targetedUser.docID)
            );
            const requesterSnapshot = await getDocs(requesterQuery);

            if (requesterSnapshot.empty) {
                console.error("Targeted user not found");
                return false;
            }

            const connectorDoc = requesterSnapshot.docs[0];

            const currentUserRef = doc(db, "userCollection", currentUserDoc.id);
            const requesterRef = doc(db, "userCollection", connectorDoc.id);

            if (action === "connect") {
                // Check if already requested
                const currentRequested = currentUserDoc.data().requested || [];
                if (currentRequested.includes(targetedUser.docID)) {
                    setConnectionStatus((prev) => ({
                        ...prev,
                        [targetedUser.docID]: "Requested",
                    }));
                    return "Requested";
                }

                // Update current user's requested list
                await updateDoc(currentUserRef, {
                    requested: [...currentRequested, targetedUser.docID],
                });

                // Update targeted user's received list
                await updateDoc(requesterRef, {
                    received: [
                        ...(connectorDoc.data().received || []),
                        currentUser.uid,
                    ],
                });

                setConnectionStatus((prev) => ({
                    ...prev,
                    [targetedUser.docID]: "Requested",
                }));

                return "Requested";
            }

            return false;
        } catch (error) {
            console.error("Error handling connection request:", error);
            return false;
        } finally {
            setLoading(false);
        }
    };

    // Handle click outside search
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (searchRef.current && !searchRef.current.contains(event.target)) {
                setSearch(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () =>
            document.removeEventListener("mousedown", handleClickOutside);
    }, [searchRef]);

    return (
        <div
            className={`flex ${showRightbar ? "col-span-8" : "col-span-10"
                } transition-all`}
        >
            <div className="flex-grow w-full p-[2px] bg-gray-100">
                {/* Header */}
                <div className="flex px-0 bg-white justify-between items-center border-b py-4">
                    <h1
                        onClick={handleSidebarToggle}
                        className={`${search ? "hidden" : "text-xl text-nowrap font-bold items-center p-3 flex gap-2"
                            }`}
                    >
                        <span className="md:hidden block">
                            <FiMenu className="text-3xl" />
                        </span>{" "}
                        Talent
                    </h1>

                    {/* Search and Notifications */}
                    <div
                        className={`flex ${search && "m-3"
                            } justify-end gap-2 md:gap-5 items-center w-full z-10`}
                    >
                        <SearchBar search={search} setSearch={setSearch} />
                        <div
                            onClick={() =>
                                window.innerWidth <= 640 ? handlePopup() : handleBar()
                            }
                            className={`${search
                                    ? "hidden"
                                    : "rounded-full cursor-pointer p-3 mr-4 border border-gray-300"
                                }`}
                        >
                            <img src={Notifications} alt="Notifications" />
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                <div className="p-[2px]">
                    {/* Drama Industry Section */}
                    <div className="bg-white pl-1 flex-grow-0 py-4 space-y-2">
                        <h3 className="text-2xl md:px-0 md:pl-4 px-2">
                            People in Drama Industry
                        </h3>
                        {isLoading ? (
                            <Loader />
                        ) : talentData?.length > 0 ? (
                            <IndustryPage
                                onConnect={(user) =>
                                    currentUser && handleConnect(user, "connect")
                                }
                                connectionStatus={connectionStatus}
                                setConnectionStatus={setConnectionStatus}
                                showRightbar={showRightbar}
                                isLoggedIn={!!currentUser}
                            />
                        ) : (
                            <NoDataFound data={"No Talent found"}/>
                        )}
                    </div>

                    {/* Production Houses Section */}
                    <div className="bg-white flex-grow-0 pl-1 py-4 space-y-2">
                        <h3 className="text-2xl md:px-0 md:pl-4 px-2">
                            Popular Production Houses
                        </h3>
                        {isLoading ? (
                            <Loader />
                        ) : productionData?.length > 0 ? (
                            <ProductionData
                                onFollow={(user) =>
                                    currentUser && handleConnect(user, "follow")
                                }
                                productionData={productionData}
                                connectionStatus={connectionStatus}
                                showRightbar={showRightbar}
                                isLoggedIn={!!currentUser}
                            />
                        ) : (
                            <NoDataFound data={"No production houses yet"}/>
                        )}
                    </div>
                </div>
            </div>

            {/* Sidebar and Modal Components */}
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

            {/* {search && (
                <div className="fixed inset-0 top-0 w-full h-full bg-black opacity-50 z-10"></div>
            )} */}

            {popup && (
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
                            {notifyData.length > 0 ? (
                                notifyData.map((data, index) => (
                                    <div className="flex items-center gap-2" key={index}>
                                        <img
                                            className="w-14 h-14 rounded-full"
                                            src={data.fromImage}
                                            alt="image"
                                        />
                                        <div className="flex flex-col justify-center">
                                            <h1 className="font-semibold">
                                                {data.fromName}{" "}
                                                <span className="font-light">{data.title}</span>
                                            </h1>
                                            <p className="text-[#9B9B9B] text-sm">
                                                {data.createdAt
                                                    ? new Date(data.createdAt).toLocaleString()
                                                    : "Date not available"}
                                            </p>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="text-center text-gray-400 text-sm">
                                    No notifications available
                                </div>
                            )}
                        </div>
                    </div>
                </dialog>
            )}
        </div>
    );
};

export default TalentMain;
