import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import loginPageimg from '../../assets/Icons SVG/loginPageimg.png';
import logo from '../../assets/Icons SVG/logo.svg';
import verifyTick from '../../assets/Icons SVG/verifytick.svg';
import { IoMdArrowRoundBack } from "react-icons/io";
import upload from '../../assets/Icons SVG/Upload.svg';
import { app, auth, db } from '../../Services/Firebase';
import { collection, getDocs, addDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL, getStorage } from 'firebase/storage';

const Verify = () => {
    const [otpCode, setOtpCode] = useState('');
    const [verified, setVerified] = useState(false);
    const [account, setAccount] = useState(false);
    const [complete, setComplete] = useState(false);
    const [createProfile, setCreateProfile] = useState(false);
    const [createProfile2, setCreateProfile2] = useState(false);
    const [phoneNumber, setPhoneNumber] = useState('');

    const [allCategories, setAllCategories] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const location = useLocation();
    const navigate = useNavigate();

    const [error, setError] = useState(null);
    const [SelectedCategories, setSelectedCategories] = useState([]);

    // Profile Creation State
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [country, setCountry] = useState('');
    const [city, setCity] = useState('');
    const [bio, setBio] = useState('');
    const [profileImage, setProfileImage] = useState(null);

    // Countries and Cities (you might want to replace this with a more comprehensive list)
    const countries = ['Country 1', 'Country 2', 'Country 3'];
    const citiesMap = {
        'Country 1': ['City A', 'City B', 'City C'],
        'Country 2': ['City D', 'City E', 'City F'],
        'Country 3': ['City G', 'City H', 'City I']
    };

    const fetchCategories = async () => {
        setIsLoading(true);
        try {
            const querySnapShot = await getDocs(collection(db, 'categoryCollection'));
            const categories = querySnapShot.docs.map((doc) => ({
                id: doc.id,
                name: doc.data().name,
            }));
            setAllCategories(categories);
            setIsLoading(false);
        } catch (error) {
            console.error("Error in fetching categories:", error);
            setError("Failed to load categories");
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    // Upload profile image to Firebase Storage
    const uploadProfileImage = async (file) => {
        if (!file) return null;
        try {
            const storage = getStorage(app);
            const uniqueFileName = `YooTooArt/userModule/${Date.now()}-${file.name}`;
            const storageRef = ref(storage, uniqueFileName);
            
            // Use uploadBytes with metadata
            const metadata = {
                contentType: file.type,
                customMetadata: {
                    'uploadedBy': 'user' // Optional custom metadata
                }
            };
    
            const snapshot = await uploadBytes(storageRef, file, metadata);
            const downloadURL = await getDownloadURL(snapshot.ref);
            return downloadURL;
        } catch (error) {
            console.error("Error uploading profile image:", error);
            return null;
        }
    };

    // Save user profile to Firestore
    const saveUserProfile = async () => {
        try {
            // Validate required fields
            if (!firstName || !lastName || !country || !city) {
                alert("Please fill in all required fields");
                return false;
            }

            // Upload profile image first
            const imageUrl = await uploadProfileImage(profileImage);

            // Prepare user profile data
            const userProfileData = {
                firstName,
                lastName,
                country,
                city,
                bio: bio || '',
                categoryName: SelectedCategories,
                phoneNumber,
                image: imageUrl || '',
                isVerified: true,
                isProductionHouse: false,
                canPost: true,
                experience: '',
                website: '',
                blockedUsers: [],
                follow: [],
                friends: [],
                received: [],
                requested: [],
                sent: [],
                blocked: [],
                createdAt: new Date() // Add timestamp
            };

            // Add document to userCollection
            const docRef = await addDoc(collection(db, 'userCollection'), userProfileData);

            console.log("User profile saved with ID:", docRef.id);
            return true;
        } catch (error) {
            console.error("Error saving user profile:", error);
            alert("Failed to save profile. Please try again.");
            return false;
        }
    };

    // Rest of your existing methods remain the same...

    const handleComplete = async () => {
        // Validate required fields
        if (!firstName || !lastName || !country || !city) {
            alert("Please fill in all required fields");
            return;
        }

        const profileSaved = await saveUserProfile();
        if (profileSaved) {
            setComplete(true);
            setCreateProfile2(false);
        }
    };
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setProfileImage(file);
    };



    const handleImageClick = () => {
        document.getElementById('fileInput').click();
    };

    // Toggle category selection
    const handleToggleCategory = (categoryName) => {
        setSelectedCategories(prev =>
            prev.includes(categoryName)
                ? prev.filter(cat => cat !== categoryName)
                : [...prev, categoryName]
        );
    };

    useEffect(() => {
        if (location.state && location.state.phoneNumber) {
            setPhoneNumber(location.state.phoneNumber);
        } else {
            navigate('/signup');
        }
    }, [location, navigate]);

    const handleVerifyOTP = async () => {
        if (otpCode.length !== 6) {
            alert('Please enter a 6-digit OTP');
            return;
        }

        try {
            const confirmationResult = window.confirmationResult;
            const result = await confirmationResult.confirm(otpCode);

            // User successfully verified
            setVerified(true);
            setAccount(true);
        } catch (error) {
            console.error("Error verifying OTP:", error);
            alert('Invalid OTP. Please try again.');
        }
    };

    const handleCreateProfile = () => {
        setCreateProfile(true);
        setAccount(false);
    };

    const handleCreateProfile2 = () => {
        setCreateProfile2(true);
        setCreateProfile(false);
    };

    const handleCloseModal = () => {
        setVerified(false);
        setAccount(false);
        setCreateProfile(false);
        setCreateProfile2(false);
        setComplete(false);
    };



    console.log(SelectedCategories)
    return (
        <>
            <div className='flex h-screen'>
                <div className='md:w-[30%] flex flex-col justify-between md:justify-start left py-4'>
                    <div className='flex md:justify-start ml-5 md:ml-0 gap-2 items-center'>
                        <Link to='/'>
                            <img className='md:pl-10 md:w-60 w-52' src={logo} alt="Logo" />
                        </Link>
                    </div>

                    <div className="middle px-5 relative md:px-10 md:mt-48">
                        <div>
                            <Link to='/login'>
                                <h1 className='font-bold text-2xl'>
                                    <IoMdArrowRoundBack className='mb-6' />
                                </h1>
                            </Link>
                            <h1 className='text-xl font-bold mt-3'>Verify Your Account</h1>
                            <h2 className='mt-3 font-light'>
                                Please enter 6 digits OTP you received on your registered phone{' '}
                                <span className='text-[#399AF3]'>+91325*****41</span>
                            </h2>
                        </div>
                        {/* <div className='mt-6 flex flex-col'>
                            <label htmlFor="otp" className='font-bold'>Enter OTP</label>
                            <input type="number" name="otp" id="otp" placeholder='0 0 0 0' className='text-center mt-3 text-xl bg-[#1C1C1C14] p-2 rounded-full' />
                        </div> */}
                        <div className='mt-6 flex flex-col'>
                            <label htmlFor="otp" className='font-bold'>Enter OTP</label>
                            <input
                                type="text"
                                name="otp"
                                id="otp"
                                value={otpCode}
                                onChange={(e) => setOtpCode(e.target.value)}
                                maxLength={6}
                                placeholder='0 0 0 0'
                                className='text-center mt-3 text-xl bg-[#1C1C1C14] p-2 rounded-full'
                            />
                        </div>
                        {/* <div>
                            <button onClick={handleAccount} className='bg-black w-full text-white p-3 rounded-3xl mt-6'>Verify</button>
                        </div> */}
                        <div>
                            <button
                                onClick={handleVerifyOTP}
                                className='bg-black w-full text-white p-3 rounded-3xl mt-6'
                            >
                                Verify
                            </button>
                        </div>
                    </div>
                    <div className="last px-5 md:px-10 mt-20 md:mt-52">
                        <p><span className='text-gray-500'>by</span> <span className='font-bold'>Signing In</span>, <span className='text-gray-500'>you agree with the </span><span className='text-[#399AF3] font-bold'>Terms & Conditions </span> <span className='text-gray-500'>of You2Art</span></p>
                    </div>
                </div>

                <div className="right hidden md:block w-[70%] m-5">
                    <img className='' src={loginPageimg} alt="Login Page" />
                </div>
            </div>

            {/* Verification Modal */}
            {verified && (
                <dialog className="modal modal-open">
                    <div className="modal-box md:w-1/3">
                        <form method="dialog">
                            <button
                                type="button"
                                className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                                onClick={handleCloseModal}
                            >
                                ✕
                            </button>
                        </form>
                        <div className='justify-center flex flex-col items-center mt-5'>
                            <img src={verifyTick} alt="Verification Success" />
                            <h1 className='text-xl font-bold'>Verification Successful</h1>
                        </div>
                    </div>
                </dialog>
            )}

            {/* Account Creation Modal */}
            {account && (
                <dialog className="modal modal-open">
                    <div className="modal-box md:w-1/3">
                        <form method="dialog">
                            <button
                                type="button"
                                className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                                onClick={handleCloseModal}
                            >
                                ✕
                            </button>
                        </form>
                        <div className='justify-center flex flex-col items-center mt-5'>
                            <img src={verifyTick} alt="Account Created" />
                            <h1 className='text-xl font-bold'>Account Created</h1>
                            <h1 className='text-center'>Your account was created, you can now start exploring Talent and post Casting Calls.</h1>
                            <div className='flex w-full gap-3 mt-8'>
                                <button onClick={handleCloseModal} className=' w-full p-3 rounded-3xl bg-[#E2E2E2]'>Skip For Now</button>
                                <button onClick={handleCreateProfile} className='bg-black w-full text-white p-3 rounded-3xl'>Create Profile</button>
                            </div>
                        </div>
                    </div>
                </dialog>
            )}

            {/* Profile Creation Modal */}
            {createProfile && (
                <dialog className="modal modal-open">
                    <div className="modal-box overflow-y-auto p-0 h-[90%] sm:h-[80%] md:min-h-[70%] lg:h-[60%] xl:h-[50%] w-[90%] sm:w-[80%] md:w-[80%] lg:w-[70%] xl:min-w-[45%] overflow-hidden relative">
                        <form method="dialog" className="relative">
                            <button
                                type="button"
                                className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                                onClick={handleCloseModal}
                            >
                                ✕
                            </button>
                        </form>
                        <h3 className="font-bold px-4 sm:px-6 pt-4 text-lg">Complete Profile</h3>
                        <div className="pb-2 border-b border-gray-300">
                            <h1 className="px-4 sm:px-6 text-sm text-[#399AF3]">Step 1 of 2</h1>
                        </div>
                        <div className='overflow-y-auto h-full pb-2'>
                            <div className="px-4 sm:px-6 py-2">
                                <h1 className="font-semibold">Choose Categories (Multiple Selection)</h1>
                            </div>
                            <div className="px-4 sm:px-6 py-2 grid grid-cols-1 sm:grid-cols-2 gap-2">
                                {allCategories.map((data, index) => (
                                    <div
                                        key={data.id || index}
                                        onClick={() => handleToggleCategory(data.name)}
                                        className={`flex items-center border p-3 rounded gap-2 cursor-pointer ${SelectedCategories.includes(data.name)
                                            ? 'border-[#399AF3] bg-[#E7F3FF]'
                                            : 'border-gray-300'
                                            }`}
                                    >
                                        <input
                                            className="min-w-6 h-6"
                                            type="checkbox"
                                            name="category"
                                            id={`category-${data.id || index}`}
                                            checked={SelectedCategories.includes(data.name)}
                                            onChange={() => handleToggleCategory(data.name)}
                                            onClick={(e) => e.stopPropagation()}
                                        />
                                        <label
                                            htmlFor={`category-${data.id || index}`}
                                            className="cursor-pointer font-semibold flex-grow"
                                        >
                                            {data.name}
                                        </label>
                                    </div>
                                ))}
                            </div>
                            <div className="px-4 sm:px-6 py-2">
                                <p className="text-sm text-gray-600">
                                    Selected Categories: {SelectedCategories.join(', ')}
                                </p>
                            </div>
                        </div>
                        <div className="sticky bottom-0 left-0 p-4 w-full flex md:flex-row gap-2 justify-center md:justify-end bg-white">
                            <button
                                type="button"
                                onClick={() => setCreateProfile(false)}
                                className="px-4 py-2 rounded-full bg-[#E2E2E2] hover:bg-gray-300 transition duration-300"
                            >
                                Skip For Now
                            </button>
                            <button
                                type="button"
                                onClick={handleCreateProfile2}
                                disabled={SelectedCategories.length === 0}
                                className={`px-4 py-2 rounded-full text-white font-semibold ${SelectedCategories.length > 0
                                    ? 'bg-black'
                                    : 'bg-gray-400 cursor-not-allowed'
                                    }`}
                            >
                                Save and Next
                            </button>
                        </div>
                    </div>
                </dialog>
            )}


            {/* Profile Creation Step 2 Modal */}
            {
                createProfile2 && (
                    <dialog className="modal modal-open">
                        <div className="modal-box p-0 h-[80%] 2xl:h-[80%] 2xl:min-w-[50%] overflow-hidden relative">
                            <form method="dialog" className="relative">
                                <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={handleCloseModal}>✕</button>
                            </form>
                            <h3 className="font-bold px-6 pt-4 text-lg">Complete Profile</h3>
                            <div className='pb-2 border-b border-gray-300'>
                                <h1 className='px-6 text-sm text-[#399AF3]'>Step 2 of 2</h1>
                            </div>
                            <div className='px-6 overflow-y-auto max-h-[70%] py-2'>
                                <div className=' py-2'>
                                    <h1 className='font-semibold'>Upload Your Image</h1>
                                </div>
                                <div className="flex bg-[#399AF31A] py-5 rounded flex-col items-center justify-center gap-2">
                                    <img
                                        className="w-[18%] h-[18%] cursor-pointer"
                                        src={upload}
                                        alt="Upload"
                                        onClick={handleImageClick}
                                    />
                                    <p className='text-sm'>Drag and Drop or <span className='text-[#399AF3]'>Browse</span> an image </p>

                                    <input
                                        type="file"
                                        id="fileInput"
                                        style={{ display: 'none' }}
                                        onChange={handleFileChange}
                                        accept="image/*"
                                    />
                                    {profileImage && (
                                        <p className="text-xs font-bold">
                                            {profileImage.name} Uploaded successfully!
                                        </p>
                                    )}
                                </div>
                                <div className='flex flex-wrap gap-2 mt-2 '>
                                    <div className='flex flex-col gap-2 w-full'>
                                        <label className='font-semibold' htmlFor="firstName">First Name</label>
                                        <input
                                            className='px-3 mt-1 py-2 rounded-full bg-[#1C1C1C14]'
                                            type="text"
                                            placeholder='Enter First Name'
                                            value={firstName}
                                            onChange={(e) => setFirstName(e.target.value)}
                                            name="firstName"
                                            id="firstName"
                                        />
                                    </div>
                                    <div className='flex flex-col gap-2 w-full'>
                                        <label className='font-semibold' htmlFor="lastName">Last Name</label>
                                        <input
                                            className='px-2 mt-1 py-2 rounded-full bg-[#1C1C1C14]'
                                            type="text"
                                            placeholder='Enter Last Name'
                                            value={lastName}
                                            onChange={(e) => setLastName(e.target.value)}
                                            name="lastName"
                                            id="lastName"
                                        />
                                    </div>
                                </div>

                                <div className='md:flex gap-2 mt-2 '>
                                    <div className='flex flex-col gap-2 w-full'>
                                        <label className='font-semibold' htmlFor="country">Country</label>
                                        <select
                                            className='px-3 mt-1 py-3 rounded-full bg-[#1C1C1C14]'
                                            value={country}
                                            onChange={(e) => {
                                                setCountry(e.target.value);
                                                setCity(''); // Reset city when country changes
                                            }}
                                            name="country"
                                            id="country"
                                        >
                                            <option value="">Select Country</option>
                                            {countries.map(c => (
                                                <option key={c} value={c}>{c}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className='flex flex-col mt-2 md:mt-0 gap-2 w-full'>
                                        <label className='font-semibold' htmlFor="city">City</label>
                                        <select
                                            className='px-3 mt-1 py-3 rounded-full bg-[#1C1C1C14]'
                                            value={city}
                                            onChange={(e) => setCity(e.target.value)}
                                            name="city"
                                            id="city"
                                            disabled={!country}
                                        >
                                            <option value="">Select City</option>
                                            {country && citiesMap[country].map(c => (
                                                <option key={c} value={c}>{c}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>

                                <div className='flex md:mb-0 mb-8 flex-col gap-2 mt-2 '>
                                    <label className='font-semibold' htmlFor="bio">Short Bio</label>
                                    <textarea
                                        placeholder='Enter Bio'
                                        className='bg-[#1C1C1C14] px-3 py-2 rounded-xl h-32'
                                        value={bio}
                                        onChange={(e) => setBio(e.target.value)}
                                        name="bio"
                                        id="bio"
                                    ></textarea>
                                </div>
                            </div>
                            <div className='absolute bottom-0 right-0 p-4 w-full flex gap-2 justify-between bg-white'>
                                <button
                                    onClick={() => {
                                        handleCloseModal(false);
                                        handleCreateProfile(true);
                                    }}

                                    className='px-4 py-2 rounded-full bg-[#399AF31A] hover:bg-gray-300 text-[#399AF3] font-semibold transition duration-300'>Back</button>
                                <div className='flex gap-2 items-center'>
                                    <button onClick={handleCloseModal} className='px-4 py-2 rounded-full bg-[#E2E2E2] hover:bg-gray-300 transition duration-300'>Skip For Now</button>
                                    <button onClick={handleComplete} className='px-4 py-2 rounded-full text-white font-semibold bg-black'>Submit</button>
                                </div>
                            </div>
                        </div>
                    </dialog>
                )
            }

            {
                complete && (
                    <dialog className="modal modal-open">
                        <div className="modal-box md:w-1/3">
                            <form method="dialog">
                                <button
                                    type="button"
                                    className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                                    onClick={() => { setComplete(false) }}
                                >
                                    ✕
                                </button>
                            </form>
                            <div className='justify-center flex flex-col items-center mt-5'>
                                <img src={verifyTick} alt="Account Created" />
                                <h1 className='text-xl font-bold'>Profile Completed!</h1>
                                <h1 className='text-center font-semibold'>Congrats! You just completed your profile.</h1>
                                <div className='flex justify-center w-full mt-8'>
                                    <Link to="/home" className='w-full'>
                                        <button onClick={handleCreateProfile} className='bg-black w-full text-white p-3 rounded-3xl'>Proceed to Home</button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </dialog>
                )
            }
        </>
    );
};

const FileUpload = () => {
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setProfileImage(file);
    };

    const handleImageClick = () => {
        document.getElementById('fileInput').click();
    };

    return (
        <div className="flex bg-[#399AF31A] py-5 rounded flex-col items-center justify-center gap-2">
            <img
                className="w-[18%] h-[18%] cursor-pointer"
                src={upload}
                alt="Upload"
                onClick={handleImageClick}
            />
            <p className='text-sm'>Drag and Drop or <span className='text-[#399AF3]'>Browse</span> an image </p>

            <input
                type="file"
                id="fileInput"
                style={{ display: 'none' }}
                onChange={handleFileChange}
                accept="image/*"
            />
            {profileImage && (
                <p className="text-xs font-bold">
                    {profileImage.name} Uploaded successfully!
                </p>
            )}
        </div>
    );
};


export default Verify;