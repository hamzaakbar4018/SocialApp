import React, { useState, useRef, useContext, useEffect } from "react";
import UserDataCard from "../Cards/UserDataCard";
import Conneections from "../Cards/Conneections";
import { NotificatinData } from "../Context/NotificatinContext";
import { ImSpinner2 } from "react-icons/im";
import { collection, query, where, getDocs, doc, updateDoc } from 'firebase/firestore';
import { db } from "../Services/Firebase";
const Rightbar = () => {
  const dummyID = "YTHetwednqeLYoraizuJ4PLFFlp2";
  const { notifyData } = useContext(NotificatinData);
  const [Loading, setLoading] = useState(false);
  const [connectionRequests, setConnectionRequests] = useState([]);
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [reqUsers, setReqUsers] = useState([]);
  const [visibleNotifyCount, setVisibleNotifyCount] = useState(5);
  const [isNotifyExpanded, setIsNotifyExpanded] = useState(false);
  const dialogRef = useRef(null);

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

      // Fetch connection requests
      const requestsList = users.flatMap((user) => user.received || []);

      if (requestsList.length === 0) {
        setConnectionRequests([]);
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
          }))[0];
        })
      );

      setConnectionRequests(allRequestsData.filter(Boolean));
      console.log("CHECK", allRequestsData.filter(Boolean))
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsInitialLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

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

      setConnectionRequests(prevRequests =>
        prevRequests.filter(request => request.docID !== requestUser.docID)
      );

      // Refresh the requests after handling
      await fetchRequests();
    } catch (error) {
      console.error("Error handling connection request:", error);
    } finally {
      setLoading(false);
    }
  };

  const toggleNotifyShowMore = () => {
    setVisibleNotifyCount(isNotifyExpanded ? 2 : notifyData.length);
    setIsNotifyExpanded(!isNotifyExpanded);
  };

  const handlePopup = () => {
    if (dialogRef.current) {
      dialogRef.current.showModal();
    }
  };

  const closePopup = () => {
    if (dialogRef.current) {
      dialogRef.current.close();
    }
  };

  const parseAndFormatDate = (date) => {
    const parsedDate = date?.toDate ? date.toDate() : new Date(date);
    return parsedDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };
  const rightBar = true;

  return (
    <div className="bg-white border-l px-3 h-[100vh] overflow-y-auto">
      <div className="py-8 px-2">
        <h1 className="font-semibold">Notifications</h1>
      </div>
      {notifyData ? (
        notifyData.length > 0 ? (
          <div className="px-2 flex flex-col gap-3">
            {notifyData.slice(0, visibleNotifyCount).map((data) => (
              <UserDataCard
                key={data.id}
                fromImage={data.fromImage}
                fromName={data.fromName}
                title={data.title}
                date={data.createdAt}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center p-4">
            <p className="text-gray-500">No notifications yet</p>
          </div>
        )
      ) : (
        <div className="flex justify-center items-center">
          <ImSpinner2 className="animate-spin" />
        </div>
      )}

      <div className="px-2 bg-[#E6E7E854] flex justify-center items-center py-2 mt-3">
        <button onClick={handlePopup} className="text-blue-500 hover:underline">
          Show All
        </button>
      </div>

      <div className="connections px-2 flex flex-col gap-3 mt-8">
        <h1 className="font-semibold text-nowrap">Connection Requests</h1>
        {isInitialLoading ? (
          <div className="flex justify-center items-center">
            <ImSpinner2 className="animate-spin" />
          </div>
        ) : connectionRequests.length > 0 ? (
          connectionRequests.map(user => (
            <Conneections
              key={user.docID}
              image={user.image || "https://randomuser.me/api/portraits/men/10.jpg"}
              username={user.firstName}
              description={user.bio}
              user={user}
              reqData={{
                image: user.image || "https://randomuser.me/api/portraits/men/10.jpg"
              }}
              rightBar={rightBar}
              Loading={Loading}
              onAccept={(user) => handleConnectionRequest(user, 'accept')}
              onReject={(user) => handleConnectionRequest(user, 'reject')}
            />
          ))
        ) : (
          <div className="flex justify-center items-center p-4">
            <p className="text-gray-500">No requests</p>
          </div>
        )}
      </div>

      <dialog ref={dialogRef} className="modal">
        <div className="modal-box p-0">
          <button
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            onClick={closePopup}
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
                  src={data.fromImage}
                  alt="image"
                />
                <div className="flex flex-col justify-center">
                  <h1 className="font-semibold">
                    {data.fromName} <span className="font-light">{data.title}</span>
                  </h1>
                  <p className="text-[#9B9B9B] text-sm">
                    {parseAndFormatDate(data.createdAt)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default Rightbar;