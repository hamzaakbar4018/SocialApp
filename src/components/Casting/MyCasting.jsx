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

const MyCasting = () => {
  const UserId = "YTHetwednqeLYoraizuJ4PLFFlp2";
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [myCasting, setMyCasting] = useState([]);
  const [author, setAuthor] = useState([]);
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

      setAuthor(authorData);
      setMyCasting(myCalls);
      // console.log("MYCALLS", myCalls)
    } catch (error) {
      console.error("Error fetching casting calls:", error);
    } finally {
      setIsLoading(false);
    }
  }
  useEffect(() => {
    fetchMyCasting();
  }, [])

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
      !title || !description || !roleTitle || !roleDescription || !age ||
      !gender || !shootDetails || !budget || !crew || !city ||
      !contactEmail || !contactNumber
    ) {
      alert("Please fill out all required fields.");
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
        docID: docRef.id, // Add the docID field
      });

      // window.location.reload();
      // toast.success("Casting call created successfully!");
      // setIsLoading(false);



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
      window.location.reload();

      toast.success("Casting call created successfully!")

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
    setCreateCasting(!createCast);
  }



  const crewData = ['Actor', 'Director', 'Producer']
  const genderData = ['Male', 'Female']




  return (
    isLoading ? (
      <Loader />
    ) : (
      <div className='bg-gray-100 flex mt-1 '>
        <div className='left overflow-y-auto h-screen flex flex-col gap-1 md:w-1/3 w-full'>
          <div className='bg-white p-3'>
            <button onClick={handleCasting} className='bg-black px2 py-3 flex justify-center items-center gap-2 rounded-full text-white font-semibold w-full'><span className='text-3xl font-light'>+</span> Create Casting Call</button>
          </div>
          {

            myCasting.map((data, index) => (
              <div key={index} onClick={() => {
                setSelectedCardIndex(index);
                setIsSheetOpen(true);
              }}>
                <UserCard date={data.createdAt} {...data} mycasting={mycasting} isSelected={selectedCardIndex === index} />
              </div>
            ))
          }
        </div>
        <div className='right md:block hidden flex-grow'>
          <div className="pl-1">
            {
              selectedCardIndex !== null && selectedCardIndex < myCasting.length && (
                <UserDescription
                  myCallId={myCasting[selectedCardIndex].docID}
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
                  type={myCasting[selectedCardIndex].type}
                  username={author[0].firstName}
                  time={myCasting[selectedCardIndex].createdAt}
                  onDelete={() => handleDelete(myCasting[selectedCardIndex].id)}
                  appliedUsers={myCasting[selectedCardIndex]?.appliedUsers}
                  isDeleting={isDeleting}

                />
              )
            }
          </div>
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
                // <UserDescription
                //   // {...userdata[selectedCardIndex]}
                //   mycasting={mycasting}
                //   sendData={handleDataSend}
                //   title={myCasting[selectedCardIndex].title}
                //   img={author[0]?.image}
                //   des={myCasting[selectedCardIndex].description}
                //   budget={myCasting[selectedCardIndex].budget}
                //   age={myCasting[selectedCardIndex].age}
                //   height={myCasting[selectedCardIndex].height}
                //   gender={myCasting[selectedCardIndex].gender}
                //   location={myCasting[selectedCardIndex].city}
                //   day={myCasting[selectedCardIndex].duration}
                //   crew={myCasting[selectedCardIndex].crew}
                //   username={author[0].firstName}
                //   time={myCasting[selectedCardIndex].createdAt}
                // />
                <UserDescription
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
                    <label htmlFor="">Project Title</label>
                    <input value={title} onChange={(e) => setTitle(e.target.value)} type="text" className='bg-gray-100 p-2 rounded-3xl' placeholder='Enter Project Title' />
                  </div>
                  <div className='flex flex-col gap-2 mt-3'>
                    <label htmlFor="">Short Description</label>

                    <textarea
                      value={description} onChange={(e) => setDescription(e.target.value)}
                      name="" className='bg-gray-100 p-2 py-3 min-h-40 max-h-auto rounded-3xl' placeholder='' id="">Enter Short Description</textarea>
                  </div>
                  <div className='flex flex-col gap-2 mt-3'>
                    <label htmlFor="">Crew Required</label>
                    <select
                      onChange={(e) => setCrew(e.target.value)}
                      className='bg-gray-100 p-2 rounded-3xl'
                      name=""
                      id=""
                    >
                      <option value="" disabled selected>Select Crew</option>
                      {crewData.map((item, index) => (
                        <option key={index} value={item}>
                          {item}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className='flex flex-col gap-2 mt-3'>
                    <label htmlFor="">City Name</label>
                    <input
                      value={city} onChange={(e) => setCity(e.target.value)}
                      type="text" className='bg-gray-100 p-2 rounded-3xl' placeholder='Enter City Name' />
                  </div>

                  <div className='flex flex-col gap-2 mt-3'>
                    <label htmlFor="">Contact Email</label>
                    <input
                      value={contactEmail} onChange={(e) => setContactEmail(e.target.value)}
                      type="text" className='bg-gray-100 p-2 rounded-3xl' placeholder='Enter Contact Email' />
                  </div>

                  <div className='flex flex-col gap-2 mt-3'>
                    <label htmlFor="">Contact Number</label>
                    <input
                      value={contactNumber} onChange={(e) => setContactNumber(e.target.value)}
                      type="text" className='bg-gray-100 p-2 rounded-3xl' placeholder='Enter Contact Number' />
                  </div>

                  <div className='flex flex-col gap-2 mt-3'>
                    <label htmlFor="">Role Title</label>
                    <input
                      value={roleTitle} onChange={(e) => setRoleTitle(e.target.value)}
                      type="text" className='bg-gray-100 p-2 rounded-3xl' placeholder='Enter Role Title' />
                  </div>

                  <div className='flex flex-col gap-2 mt-3'>
                    <label htmlFor="">Role Description</label>

                    <textarea
                      value={roleDescription} onChange={(e) => setRoleDescription(e.target.value)}
                      name="" className='bg-gray-100 p-2 py-3 min-h-40 max-h-auto rounded-3xl' placeholder='' id="">Enter Role Description</textarea>
                  </div>

                  <div className='flex flex-col gap-2 mt-3'>
                    <label htmlFor="">Age Required</label>
                    <input
                      value={age} onChange={(e) => setAge(e.target.value)}
                      type="number" className='bg-gray-100 p-2 rounded-3xl' placeholder='23' />
                  </div>

                  <div className='flex flex-col gap-2 mt-3'>
                    <label htmlFor="">Gender</label>
                    <select
                      value={gender}
                      onChange={(e) => setGender(e.target.value)}
                      className='bg-gray-100 p-2 rounded-3xl'
                    >

                      <option disabled value="" selected>Select Gender</option>
                      {
                        genderData.map((item, index) => (
                          <option key={index} value={item}>{item}</option>
                        ))
                      }
                    </select>
                  </div>

                  <div className='flex flex-col gap-2 mt-3'>
                    <label htmlFor="">Shoot Details</label>

                    <textarea
                      value={shootDetails} // Set the value from the state
                      onChange={(e) => setShootDetails(e.target.value)} name="" className='bg-gray-100 p-2 py-3 min-h-40 max-h-auto rounded-3xl' placeholder='' id="">Enter Shoot Details</textarea>
                  </div>

                  <div className='flex flex-col gap-2 mt-3'>
                    <label
                      htmlFor="">Budget/Remuneration</label>
                    <input
                      value={budget} // Set the value from the state
                      onChange={(e) => setBudget(e.target.value)}
                      type="text" className='bg-gray-100 p-2 rounded-3xl' placeholder='Enter Your Budget' />
                  </div>


                  <div className='mb-20'></div>
                </div>
                <div className='flex bg-white fixed bottom-0 w-full py-3 px-5 pt-4 items-end justify-center md:justify-end gap-3 mt-4'>
                  <div className='bg-[#FFE5E5] text-[#FF0000] md:w-auto w-full md:block flex justify-center   px-4 py-3 rounded-full md:rounded-3xl md:text-base text-xl'>
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

        <ToastContainer />
      </div>
    )
  );
}

export default MyCasting;
