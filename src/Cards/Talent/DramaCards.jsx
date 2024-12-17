import React, { useEffect, useState } from "react";
import { ImSpinner2 } from "react-icons/im";
import { IoMailOutline } from "react-icons/io5";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../../Services/Firebase.jsx";

const TalentCards = ({
  image,
  firstName,
  categoryName,
  docID,
  network,
  onConnect,
  onFollow,
  production,
  landingtalent
}) => {
  const [isConnecting, setIsConnecting] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState('Connect');
  const dummyId = "YTHetwednqeLYoraizuJ4PLFFlp2"; // Hardcoded current user ID

  // Fetch connection status from Firestore
  const fetchConnectionStatus = async () => {
    try {
      // Query to find the current user document
      const currentUserQuery = query(
        collection(db, 'userCollection'),
        where("docID", "==", dummyId)
      );
      const currentUserSnapshot = await getDocs(currentUserQuery);

      if (currentUserSnapshot.empty) {
        console.error("Current user not found");
        return;
      }

      const currentUserDoc = currentUserSnapshot.docs[0].data();

      // Check if the targeted user is in the current user's connected or requested arrays
      if (currentUserDoc.connected && currentUserDoc.connected.includes(docID)) {
        setConnectionStatus('Connected');
      } else if (currentUserDoc.requested && currentUserDoc.requested.includes(docID)) {
        setConnectionStatus('Requested');
      } else {
        setConnectionStatus('Connect');
      }
    } catch (error) {
      console.error("Error fetching connection status:", error);
    }
  };

  // Fetch connection status when component mounts or docID changes
  useEffect(() => {
    fetchConnectionStatus();
  }, [docID]);

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

        // Update connection status based on the result from onConnect
        if (newStatus) {
          setConnectionStatus(newStatus);
        }
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
        const newStatus = await onFollow({
          docID,
          firstName,
          image,
          categoryName
        });

        // Update connection status based on the result from onFollow
        if (newStatus) {
          setConnectionStatus(newStatus);
        }
      } catch (error) {
        console.error('Error following:', error);
      } finally {
        setIsConnecting(false);
      }
    }
  };
const connect = false
  return (
    <div className="md:overflow-hidden">
      <div className={`bg-[#ECF5FE] rounded-xl p-5 h-auto w-[255px] 
        ${network && 'md:min-w-[255px] h-auto w-auto'} 
        ${landingtalent && '2xl:min-h-[350px] md:min-w-[300px] rounded-xl md:w-auto md:h-auto h-[340px] w-[300px] 2xl:min-w-auto'} 
        ${connect && 'w-[222px] tracking-tighter'} 
        min-h-min h-[250px] `}>
        <div className="flex flex-col gap-3 space-y-2 h-full">
          <div className={`${landingtalent && 'flex flex-col justify-center items-center text-xl gap-4'}`}>
            <div className="flex-shrink-0">
              <img
                src={image}
                className={`rounded-full w-20 h-20 object-cover ${landingtalent && 'w-32 h-32'}`}
                alt="User img"
              />
            </div>
            <h2 className="mt-2 text-lg font-bold">{firstName}</h2>
            <div className="flex flex-wrap gap-2">
              {Array.isArray(categoryName) && categoryName.map((cat, index) => (
                <p key={index} className="text-gray-400">{cat}</p>
              ))}
            </div>
          </div>
          <div className="flex justify-between items-center mt-auto">
            <button
              onClick={() => {
                if (production) {
                  handleFollow();
                } else {
                  handleConnect();
                }
              }}
              disabled={
                isConnecting || 
                connectionStatus === 'Requested' || 
                connectionStatus === 'Connected' || 
                connectionStatus === 'Following'
              }
              className={`bg-black w-full text-nowrap  px-3 tracking-tighter rounded-3xl text-white py-2`}
            >
              {isConnecting ? (
                <div className="flex gap-1 justify-center items-center">
                  <ImSpinner2 className="animate-spin" />
                  {production ? 'Following' : 'Connecting'}
                </div>
              ) : (
                connectionStatus
              )}
            </button>
            <div className="ml-3 mr-3 p-2 border border-gray-400 rounded-full flex justify-center items-center">
              <IoMailOutline className="text-2xl" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TalentCards;