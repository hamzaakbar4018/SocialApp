import React, { useEffect, useState } from 'react';
import UserCard from '../../Cards/CastingCards/UserCard';
import UserDescription from '../../Cards/CastingCards/UserDescription';
import { IoMdArrowBack } from "react-icons/io";
import { collection, doc, addDoc, getDocs, query, where, deleteDoc, updateDoc, orderBy } from 'firebase/firestore';
import { db } from '../../Services/Firebase';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ImSpinner2 } from 'react-icons/im';
import Loader from '../Loader/Loader'
import Payment from '../../Cards/Payment';
import { useAuth } from '../../Context/AuthContext';
import NoData from '../Loader/NoData'
import { Outlet, useLocation, useNavigate, useParams } from 'react-router-dom';
const MyCasting = () => {
  const { currentUser } = useAuth();
  const UserId = currentUser?.uid;
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [myCasting, setMyCasting] = useState([]);
  const [author, setAuthor] = useState([]);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [castingCallLimit, setCastingCallLimit] = useState(1);

  const fetchMyCasting = async () => {
    try {
      setIsLoading(true);
      const myCastQuery = query(
        collection(db, "castingCallCollection"),
        where("authorID", "==", UserId)
      );
      const querySnapShot = await getDocs(myCastQuery);

      const myCalls = querySnapShot.docs
        .map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
        .sort((a, b) => {
          const aSeconds = a.createdAt?.seconds || 0;
          const bSeconds = b.createdAt?.seconds || 0;
          return bSeconds - aSeconds;
        });

      const authorQuery = query(
        collection(db, 'userCollection'),
        where("docID", "==", UserId)
      );

      const getAuthorData = await getDocs(authorQuery);
      const authorData = getAuthorData.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      const paidCastingCallsQuery = query(
        collection(db, 'userPayments'),
        where("userId", "==", UserId),
        where("type", "==", "castingCall")
      );

      const paidCallsSnapShot = await getDocs(paidCastingCallsQuery);
      const paidCalls = paidCallsSnapShot.docs.length;

      // Set casting call limit based on free and paid calls
      setCastingCallLimit(1 + paidCalls);

      setAuthor(authorData);
      setMyCasting(myCalls);
      console.log("MYCALLS", myCalls)

    } catch (error) {
      console.error("Error fetching casting calls:", error);
    } finally {
      setIsLoading(false);
    }
  }
  useEffect(() => {
    fetchMyCasting();
  }, [])
  const navigate = useNavigate();
  const { callId } = useParams();

  const handleSelectCastingCall = (id) => {
    // Update to use the full path
    navigate(`/casting/mycalls/${id}/received`);
  };

  const location = useLocation();
  useEffect(() => {
    // After casting calls are fetched
    if (!isLoading && myCasting.length > 0 && location.pathname === '/casting/mycalls') {
      navigate(`/casting/mycalls/${myCasting[0].id}/received`);
    }
  }, [isLoading, myCasting, location.pathname, navigate]);


  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [roleTitle, setRoleTitle] = useState('');
  const [roleDescription, setRoleDescription] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [height, setHeight] = useState('');
  const [shootDetails, setShootDetails] = useState('');
  const [budget, setBudget] = useState('');
  const [crew, setCrew] = useState('');
  const [city, setCity] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [duration, setDuration] = useState('');
  const [appliedUsers, setAppliedUsers] = useState([]);


  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    if (
      !title || !description ||
      !gender || !crew || !city || !height
    ) {
      alert("Please fill out all required fieldssss.");
      console.log(crew)
      setIsSubmitting(false);

      return;
    }

    console.log("Casting Call Data:", {
      title,
      description,
      roleTitle,
      roleDescription,
      age,
      gender,
      height,
      shootDetails,
      budget,
      crew,
      city,
      contactEmail,
      contactNumber,
      duration,
      appliedUsers,
    });
    setIsSubmitting(false);

    const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contactEmail);
    if (!isValidEmail) {
      alert("Please enter a valid email address.");
      return;
    }

    if (isNaN(budget) || isNaN(duration)) {
      alert("Budget and Duration should be valid numbers.");
      return;
    }

    try {
      setIsSubmitting(true);
      const docRef = await addDoc(collection(db, "castingCallCollection"), {
        title,
        description,
        roleTitle,
        roleDescription,
        age,
        gender,
        height,
        shootDetails,
        budget: Number(budget),
        crew,
        city,
        contactEmail,
        contactNumber,
        duration: Number(duration),
        appliedUsers: [],
        authorID: UserId,
        createdAt: new Date(),
      });

      await updateDoc(doc(db, "castingCallCollection", docRef.id), {
        docID: docRef.id,
      });
      setTitle('');
      setDescription('');
      setRoleTitle('');
      setRoleDescription('');
      setAge('');
      setGender('');
      setHeight('');
      setShootDetails('');
      setBudget('');
      setCrew('');
      setCity('');
      setContactEmail('');
      setContactNumber('');
      setDuration('');
      setAppliedUsers([]);


      setCreateCasting(false);
      toast.success("Casting call created successfully!")
      fetchMyCasting();
      // window.location.reload();


    } catch (error) {
      console.error("Error creating casting call: ", error);
      toast.error("Error creating casting call. Please try again later.");


    } finally {
      setIsSubmitting(false);
    }
  };

  const deleteCastingCall = async (id) => {
    if (!id) {
      setIsDeleting(true)
      console.error("No docID provided!");
      setIsDeleting(false)
      return;
    }

    try {
      setIsDeleting(true)
      await deleteDoc(doc(db, "castingCallCollection", id));
      toast.success('Casting call deleted successfully!')
      setMyCasting((prevState) => prevState.filter((casting) => casting.id !== id));
      setIsDeleting(false)
    } catch (error) {
      console.error("Error deleting casting call: ", error);
      setIsDeleting(false)
    }
    finally {
      setIsDeleting(false);
    }
  };

  const handleDelete = (id) => {
    if (!id) {
      console.error("No docID found for the selected casting call");
      return;
    }
    deleteCastingCall(id);
  };

  const handleDataSend = (data) => {
    console.log(data);
  };

  const [selectedCardIndex, setSelectedCardIndex] = useState(0);
  const mycasting = true;

  const [createCast, setCreateCasting] = useState(false);
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const handleCasting = () => {
    if (!currentUser) {
      navigate('/login')
    }

    if (myCasting.length >= castingCallLimit) {
      setShowPaymentModal(true);
      return;
    }
    setCreateCasting(!createCast);
  }
  const handlePaymentSuccess = async () => {
    // Record payment in Firestore
    try {
      await addDoc(collection(db, 'userPayments'), {
        userId: UserId,
        type: 'castingCall',
        timestamp: new Date(),
        amount: 99 // Price for additional casting call
      });

      // Increase casting call limit
      setCastingCallLimit(prev => prev + 1);

      // Close payment modal
      setShowPaymentModal(false);

      // Trigger submission again
      handleSubmit(new Event('submit'));
    } catch (error) {
      console.error("Error recording payment:", error);
      toast.error("Payment recording failed");
    }
  };

  const [cat, setCat] = useState([]);

  const fetchCategories = async () => {
    try {
      const categoriesQuery = query(
        collection(db, "categoryCollection"),
        orderBy("name")
      );

      const querySnapshot = await getDocs(categoriesQuery);
      const categories = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setCat(categories);
    } catch (error) {
      if (error.code === 'failed-precondition') {
        console.error("This query requires an index. Please add it in the Firebase Console");
      } else {
        console.error("Error fetching categories:", error);
      }
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  // Extract just the names from the categories for crewData
  const crewData = cat.map(category => category.name);


  const genderData = ['Male', 'Female']

  return (
    isLoading ? (
      <Loader />
    ) : (
      <div className='bg-gray-100 flex mt-1 '>
        <div className={`left overflow-y-auto h-screen flex flex-col gap-1 ${myCasting.length > 0 ? 'md:w-1/3 w-full' : 'w-full'}`}>
          <div className='create bg-white p-3'>
            <button onClick={handleCasting} className='bg-black px2 py-3 flex justify-center items-center gap-2 rounded-full text-white font-semibold w-full'><span className='text-3xl font-light'>+</span> Create Casting Call</button>
          </div>
          {
            myCasting.length === 0 ? (
              <NoData data={"You have not created any casting call."} />
            ) : (
              myCasting.map((data, index) => (
                <div key={index} onClick={() => {
                  setSelectedCardIndex(index);
                  setIsSheetOpen(true);
                  handleSelectCastingCall(data.id);
                }}>
                  <UserCard
                    type={data.roleTitle} day={data.duration} location={data.city}
                    date={data.createdAt}
                    {...data}
                    mycasting={mycasting}
                    isSelected={selectedCardIndex === index}
                  />
                </div>
              ))
            )
          }
        </div>
        <div className='right md:block hidden flex-grow'>
          <div className="pl-1">
            {
              selectedCardIndex !== null && selectedCardIndex < myCasting.length && (
                <UserDescription
                  // myCallId={myCasting[selectedCardIndex].docID}
                  callId={myCasting[selectedCardIndex].docID}
                  mycasting={mycasting}
                  sendData={handleDataSend}
                  title={myCasting[selectedCardIndex].title}
                  img={author[0]?.image}
                  des={myCasting[selectedCardIndex].description}
                  budget={myCasting[selectedCardIndex].budget}
                  age={myCasting[selectedCardIndex].age}
                  height={myCasting[selectedCardIndex].height}
                  gender={myCasting[selectedCardIndex].gender}
                  location={myCasting[selectedCardIndex].city}
                  day={myCasting[selectedCardIndex].duration}
                  crew={myCasting[selectedCardIndex].crew}
                  type={myCasting[selectedCardIndex].roleTitle}
                  username={author[0].firstName}
                  time={myCasting[selectedCardIndex].createdAt}
                  onDelete={() => handleDelete(myCasting[selectedCardIndex].id)}
                  appliedUsers={myCasting[selectedCardIndex]?.appliedUsers}
                  isDeleting={isDeleting}

                />
              )
            }
          </div>
          {/* {callId && <Outlet />} */}
        </div>
        <div className={`fixed z-40 top-0 right-0 h-full bg-white shadow-lg transition-transform transform ${isSheetOpen ? 'translate-x-0' : 'translate-x-full'} md:hidden w-full sm:w-2/3`}>
          <button
            className="absolute top-3 left-[-1] bg-white w-full p-4 text-black"
            onClick={() => setIsSheetOpen(false)}
          >
            <IoMdArrowBack className='text-2xl mb-1 mt-3' />
          </button>

          <div className="py-4">
            {
              selectedCardIndex !== null && selectedCardIndex < myCasting.length && (
                <UserDescription
                  callId={myCasting[selectedCardIndex].docID}
                  isDeleting={isDeleting}
                  mycasting={mycasting}
                  sendData={handleDataSend}
                  title={myCasting[selectedCardIndex].title}
                  img={author[0]?.image}
                  des={myCasting[selectedCardIndex].description}
                  budget={myCasting[selectedCardIndex].budget}
                  age={myCasting[selectedCardIndex].age}
                  height={myCasting[selectedCardIndex].height}
                  gender={myCasting[selectedCardIndex].gender}
                  location={myCasting[selectedCardIndex].city}
                  day={myCasting[selectedCardIndex].duration}
                  type={myCasting[selectedCardIndex].type}
                  crew={myCasting[selectedCardIndex].crew}
                  username={author[0].firstName}
                  time={myCasting[selectedCardIndex].createdAt}
                  onDelete={() => handleDelete(myCasting[selectedCardIndex].id)}
                />
              )
            }
            <ToastContainer />
          </div>

        </div>
        {createCast && (
          <div className="modal" open>
            <div className="modal-box flex p-0 flex-col 2xl:h-[60%] h-[80%] md:h-auto md:w-[40%]">
              <div className='px-5 pt-6'>
                <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={handleCasting}>✕</button>
                <h3 className="font-bold text-lg mb-4">Create Casting Call</h3>
              </div>
              <div className="flex-grow overflow-auto">
                <div className='pt-5 px-5'>
                  <div className='flex flex-col gap-2 mt-4'>
                    <label htmlFor="title">Project Title <span className="text-red-500">*</span></label>
                    <input
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      type="text"
                      className='bg-gray-100 p-2 rounded-3xl'
                      placeholder='Enter Project Title'
                    />
                  </div>

                  <div className='flex flex-col gap-2 mt-3'>
                    <label htmlFor="description">Short Description <span className="text-red-500">*</span></label>
                    <textarea
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      className='bg-gray-100 p-2 py-3 min-h-40 max-h-auto rounded-3xl'
                      placeholder='Enter Short Description'
                    />
                  </div>

                  <div className='flex flex-col gap-2 mt-3'>
                    <label htmlFor="crew">Crew Required <span className="text-red-500">*</span></label>
                    <select
                      onChange={(e) => setCrew(e.target.value)}
                      className='bg-gray-100 p-2 rounded-3xl'
                    >
                      <option value="" disabled selected>Select Crew</option>
                      {crewData.map((item, index) => (
                        <option key={index} value={item}>{item}</option>
                      ))}
                    </select>
                  </div>

                  <div className='flex flex-col gap-2 mt-3'>
                    <label htmlFor="city">City Name <span className="text-red-500">*</span></label>
                    <input
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      type="text"
                      className='bg-gray-100 p-2 rounded-3xl'
                      placeholder='Enter City Name'
                    />
                  </div>

                  <div className='flex flex-col gap-2 mt-3'>
                    <label htmlFor="contactEmail">Contact Email</label>
                    <input
                      value={contactEmail}
                      onChange={(e) => setContactEmail(e.target.value)}
                      type="text"
                      className='bg-gray-100 p-2 rounded-3xl'
                      placeholder='Enter Contact Email'
                    />
                  </div>

                  <div className='flex flex-col gap-2 mt-3'>
                    <label htmlFor="contactNumber">Contact Number</label>
                    <input
                      value={contactNumber}
                      onChange={(e) => setContactNumber(e.target.value)}
                      type="text"
                      className='bg-gray-100 p-2 rounded-3xl'
                      placeholder='Enter Contact Number'
                    />
                  </div>

                  <div className='flex flex-col gap-2 mt-3'>
                    <label htmlFor="roleTitle">Role Title</label>
                    <input
                      value={roleTitle}
                      onChange={(e) => setRoleTitle(e.target.value)}
                      type="text"
                      className='bg-gray-100 p-2 rounded-3xl'
                      placeholder='Enter Role Title'
                    />
                  </div>

                  <div className='flex flex-col gap-2 mt-3'>
                    <label htmlFor="roleDescription">Role Description</label>
                    <textarea
                      value={roleDescription}
                      onChange={(e) => setRoleDescription(e.target.value)}
                      className='bg-gray-100 p-2 py-3 min-h-40 max-h-auto rounded-3xl'
                      placeholder='Enter Role Description'
                    />
                  </div>

                  <div className='flex flex-col gap-2 mt-3'>
                    <label htmlFor="age">Age Required</label>
                    <input
                      value={age}
                      onChange={(e) => setAge(e.target.value)}
                      type="number"
                      className='bg-gray-100 p-2 rounded-3xl'
                      placeholder='23'
                    />
                  </div>

                  <div className='flex flex-col gap-2 mt-3'>
                    <label htmlFor="gender">Gender <span className="text-red-500">*</span></label>
                    <select
                      value={gender}
                      onChange={(e) => setGender(e.target.value)}
                      className='bg-gray-100 p-2 rounded-3xl'
                    >
                      <option disabled value="" selected>Select Gender</option>
                      {genderData.map((item, index) => (
                        <option key={index} value={item}>{item}</option>
                      ))}
                    </select>
                  </div>

                  <div className='flex flex-col gap-2 mt-3'>
                    <label htmlFor="height">Height <span className="text-red-500">*</span></label>
                    <input
                      value={height}
                      onChange={(e) => setHeight(e.target.value)}
                      type="text"
                      className='bg-gray-100 p-2 rounded-3xl'
                      placeholder='5ft'
                    />
                  </div>

                  <div className='flex flex-col gap-2 mt-3'>
                    <label htmlFor="shootDetails">Shoot Details</label>
                    <textarea
                      value={shootDetails}
                      onChange={(e) => setShootDetails(e.target.value)}
                      className='bg-gray-100 p-2 py-3 min-h-40 max-h-auto rounded-3xl'
                      placeholder='Enter Shoot Details'
                    />
                  </div>

                  <div className='flex flex-col gap-2 mt-3'>
                    <label htmlFor="budget">Budget/Remuneration</label>
                    <input
                      value={budget}
                      onChange={(e) => setBudget(e.target.value)}
                      type="text"
                      className='bg-gray-100 p-2 rounded-3xl'
                      placeholder='Enter Your Budget'
                    />
                  </div>

                  <div className='flex flex-col gap-2 mt-3'>
                    <label htmlFor="duration">Duration Days</label>
                    <input
                      value={duration}
                      onChange={(e) => setDuration(e.target.value)}
                      type="number"
                      className='bg-gray-100 p-2 rounded-3xl'
                      placeholder='7'
                    />
                  </div>

                  <div className='mb-20'></div>
                </div>

                <div className='flex bg-white fixed bottom-0 w-full py-3 px-5 pt-4 items-end justify-center md:justify-end gap-3 mt-4'>
                  <div className='bg-[#FFE5E5] text-[#FF0000] md:w-auto w-full md:block flex justify-center px-4 py-3 rounded-full md:rounded-3xl md:text-base text-xl'>
                    <button onClick={handleCasting}>
                      Cancel
                    </button>
                  </div>
                  <div onClick={handleSubmit} className='bg-black md:w-auto w-full md:block flex justify-center text-white px-4 py-3 rounded-full md:rounded-3xl md:text-base text-xl'>
                    <button disabled={isSubmitting}>
                      {isSubmitting ? (
                        <div className='flex gap-2'>
                          <ImSpinner2 className='text-2xl animate-spin mr-1 flex' /> Submitting
                        </div>
                      ) : (
                        <>Submit</>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        {showPaymentModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg">
              <h2 className="text-xl font-bold mb-4">Upgrade Casting Calls</h2>
              <p className="mb-4">You've reached your free casting call limit. Pay ₹99 to create an additional casting call.</p>
              <Payment
                amount={99}
                onSuccess={handlePaymentSuccess}
                onClose={() => setShowPaymentModal(false)}
              />
            </div>
          </div>
        )}

        <ToastContainer />
      </div>
    )
  );
}

export default MyCasting;
