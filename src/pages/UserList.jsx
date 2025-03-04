// import React, { useEffect, useState, useRef } from 'react';
// import { useParams, useNavigate } from 'react-router-dom'; // Import useNavigate
// import { collection, getDocs, query, where } from 'firebase/firestore';
// import { db } from '../Services/Firebase';
// import NoData from '../components/Loader/NoData';
// import Loader from '../components/Loader/Loader';
// import { ChevronLeft, ChevronRight } from 'lucide-react';

// const UserList = () => {
//     const { categoryName } = useParams(); // Get category name from URL
//     const navigate = useNavigate(); // React Router's navigation hook
//     const [users, setUsers] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const carouselRef = useRef(null);

//     useEffect(() => {
//         const fetchUsers = async () => {
//             try {
//                 const q = query(
//                     collection(db, 'userCollection'),
//                     where('categoryName', 'array-contains', categoryName)
//                 );
//                 const querySnapshot = await getDocs(q);
//                 const userData = querySnapshot.docs.map((doc) => ({
//                     docID: doc.id,
//                     ...doc.data(),
//                 }));
//                 setUsers(userData);
//             } catch (error) {
//                 console.error('Error fetching users:', error);
//             } finally {
//                 setLoading(false);
//             }
//         };
//         fetchUsers();
//     }, [categoryName]);

//     const scrollCarousel = (direction) => {
//         const carousel = carouselRef.current;
//         if (carousel) {
//             const scrollAmount = carousel.offsetWidth * 0.8;
//             carousel.scrollBy({
//                 left: direction === 'left' ? -scrollAmount : scrollAmount,
//                 behavior: 'smooth',
//             });
//         }
//     };

//     if (loading) return <Loader />;

//     return (
//         <div className="relative w-full overflow-x-hidden hide-scrollbar">

//             <div className="md:pt-8 border-b-2 border-gray-300 font-sans bg-white mr-1 ml-1">
//                 <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
//                     People in {categoryName}
//                 </h2>
//             </div>
//             <button
//                 onClick={() => scrollCarousel('left')}
//                 className="absolute left-2 top-[63%] transform -translate-y-1/2 z-10 bg-gray-800 bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 focus:outline-none transition-opacity"
//                 aria-label="Scroll Left"
//             >
//                 <ChevronLeft size={24} />
//             </button>

//             <div
//                 ref={carouselRef}
//                 className="carousel flex gap-4 px-4  pb-4 overflow-x-auto scroll-smooth hide-scrollbar"
//                 style={{ scrollSnapType: 'x mandatory' }}
//             >
//                 {users.length === 0 ? (
//                     <div className='min-w-full'>
//                         <NoData />
//                     </div>
//                 ) : (
//                     <div className='m-10 flex gap-8 '>
//                         {
//                             users.map((user) => (
//                                 <div
//                                     key={user.docID}
//                                     className="bg-[#ECF5FE] rounded-xl p-5 h-auto min-w-[255px] max-w-[300px] shadow-md cursor-pointer"
//                                     onClick={() => navigate(`/userprofile/${user.docID}`)} // Navigate to user profile
//                                 >
//                                     {/* User Image */}
//                                     <div>
//                                         <img
//                                             src={user.image}
//                                             alt={user.firstName}
//                                             className="w-20 h-20 rounded-full mb-4 bg-gray-400"
//                                         />
//                                     </div>
//                                     {/* User Name */}
//                                     <div>
//                                         <h3 className="text-xl font-semibold text-gray-800 mb-4">
//                                             {`${user.firstName} ${user.lastName}`}
//                                         </h3>
//                                         {/* User Bio */}
//                                         <div className="text-wrap">
//                                             <p className="text-gray-600 text-sm break-words">
//                                                 {user.bio || 'No bio available'}
//                                             </p>
//                                         </div>
//                                     </div>

//                                 </div>
//                             ))
//                         }
//                     </div>
//                 )
//                 }
//             </div>

//             <button
//                 onClick={() => scrollCarousel('right')}
//                 className="absolute right-2 top-[63%] transform -translate-y-1/2 z-10 bg-gray-800 bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 focus:outline-none transition-opacity"
//                 aria-label="Scroll Right"
//             >
//                 <ChevronRight size={24} />
//             </button>
//         </div>
//     );
// };

// export default UserList;

import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; 
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../Services/Firebase';
import NoData from '../components/Loader/NoData';
import Loader from '../components/Loader/Loader';

const UserList = () => {
  const { categoryName } = useParams(); // Get category name from URL
  const navigate = useNavigate(); // React Router's navigation hook
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const q = query(
          collection(db, 'userCollection'),
          where('categoryName', 'array-contains', categoryName)
        );
        const querySnapshot = await getDocs(q);
        const userData = querySnapshot.docs.map((doc) => ({
          docID: doc.id,
          ...doc.data(),
        }));
        setUsers(userData);
      } catch (error) {
        console.error('Error fetching users:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, [categoryName]);

  if (loading) return <Loader />;

  return (
    <div className="w-full bg-white p-4">
      <div className="md:pt-8 border-b-2 border-gray-300 font-sans bg-white mr-1 ml-1">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
          People in {categoryName}
        </h2>
      </div>

      {/* Grid layout for user cards */}
      <div className="md:mt-5 mt-3 grid grid-cols-1 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {users.length === 0 ? (
          <div className="col-span-4 text-center">
            <NoData />
          </div>
        ) : (
          users.map((user) => (
            <div
              key={user.docID}
              className="bg-[#ECF5FE] rounded-xl p-5 shadow-md cursor-pointer hover:shadow-lg transition-shadow"
              onClick={() => navigate(`/userprofile/${user.docID}`)} // Navigate to user profile
            >
              {/* User Image */}
              <div className="flex justify-center mb-4">
                <img
                  src={user.image}
                  alt={user.firstName}
                  className="w-20 h-20 rounded-full bg-gray-400"
                />
              </div>
              {/* User Name */}
              <div className="text-center">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">
                  {`${user.firstName} ${user.lastName}`}
                </h3>
                {/* User Bio */}
                <p className="text-gray-600 text-sm">{user.bio || 'No bio available'}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default UserList;
