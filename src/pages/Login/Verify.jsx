import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import countryList from 'react-select-country-list';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import loginPageimg from '../../assets/Icons SVG/loginPageimg.png';
import logo from '../../assets/Icons SVG/clogob.png';
import verifyTick from '../../assets/Icons SVG/verifytick.svg';
import { IoMdArrowRoundBack } from "react-icons/io";
import upload from '../../assets/Icons SVG/Upload.svg';
import { app, auth, db } from '../../Services/Firebase';
import { collection, getDocs, addDoc, doc, setDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL, getStorage } from 'firebase/storage';
import { PhoneAuthProvider, signInWithCredential } from 'firebase/auth';
import { ImSpinner2 } from 'react-icons/im';

const Verify = () => {
    const [otpCode, setOtpCode] = useState('');
    const [verified, setVerified] = useState(false);
    const [account, setAccount] = useState(false);
    const [complete, setComplete] = useState(false);
    const [createProfile, setCreateProfile] = useState(false);
    const [createProfile2, setCreateProfile2] = useState(false);
    const [phoneNumber, setPhoneNumber] = useState('');
    const [verificationId, setVerificationId] = useState('');

    const [allCategories, setAllCategories] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isLoadingV, setIsLoadingV] = useState(false);

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

    const [countryOptions, setCountryOptions] = useState([]);
    const [selectedCountry, setSelectedCountry] = useState(null);

    useEffect(() => {
        const options = countryList().getData().map(country => ({
            label: country.label,
            value: country.value
        }));
        setCountryOptions(options);
    }, []);

    const handleCountryChange = (selectedOption) => {
        setSelectedCountry(selectedOption);
        setCountry(selectedOption ? selectedOption.label : '');
        setCity(''); // Reset city when country changes
    };
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
            setIsLoading(true);

            // Validate required fields
            if (!firstName || !lastName || !country || !city) {
                alert("Please fill in all required fields");
                return false;
            }

            // Get the current authenticated user
            const user = auth.currentUser;
            if (!user) {
                alert("No authenticated user found. Please sign in again.");
                return false;
            }

            // Upload profile image first
            const imageUrl = await uploadProfileImage(profileImage);
            // Prepare user profile data
            const userProfileData = {
                firstName,
                lastName,
                country,
                docID: user.uid,
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

            // Use the authenticated user's UID as the document ID
            const userDocRef = doc(db, 'userCollection', user.uid);
            await setDoc(userDocRef, userProfileData);
            setIsLoading(false)

            console.log("User profile saved with ID:", user.uid);
            return true;
        } catch (error) {
            console.error("Error saving user profile:", error);
            alert("Failed to save profile. Please try again.");
            return false;
        }
        finally {
            setIsLoading(false);
        }
    };
    useEffect(() => {
        // Check if phone number and verification ID are passed in location state
        if (location.state && location.state.phoneNumber) {
            setPhoneNumber(location.state.phoneNumber);

            // Set verification ID from location state
            if (location.state.verificationId) {
                setVerificationId(location.state.verificationId);
            }
        } else {
            // If no phone number is found, redirect back to signup
            navigate('/signup');
        }
    }, [location, navigate]);
    const handleVerifyOTP = async () => {
        if (otpCode.length !== 6) {
            setError('Please enter a 6-digit OTP');
            return;
        }

        try {
            setIsLoadingV(true);
            // Use the verificationId from state
            if (!verificationId) {
                throw new Error('No verification session found. Please restart the process.');
            }

            // Create phone auth credential using verificationId from state
            const credential = PhoneAuthProvider.credential(verificationId, otpCode);

            // Sign in with the credential
            const userCredential = await signInWithCredential(auth, credential);

            // Set the user in state or context if needed
            // This will trigger the AuthContext's onAuthStateChanged
            setCreateProfile(true);

            // Optional: Navigate to profile creation if not using state management
            // navigate('/create-profile', {
            //     state: { 
            //         phoneNumber: phoneNumber,
            //         user: userCredential.user 
            //     }
            // });
            setCreateProfile(true);
            setIsLoadingV(false);

        } catch (error) {
            setIsLoadingV(false);
            console.error("Verification Error:", error);
            switch (error.code) {
                case 'auth/invalid-verification-code':
                    setError('Invalid OTP. Please check the code and try again.');
                    break;
                case 'auth/code-expired':
                    setError('OTP has expired. Please request a new OTP.');
                    break;
                default:
                    setError(`Verification failed: ${error.message}`);
            }
        } finally {
            setIsLoadingV(false);

        }
    };
    // Rest of your existing methods remain the same...

    const handleComplete = async () => {
        // Validate required fields
        if (!firstName || !country || !city) {
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

    // useEffect(() => {
    //     if (location.state && location.state.phoneNumber) {
    //         setPhoneNumber(location.state.phoneNumber);
    //     } else {
    //         navigate('/signup');
    //     }
    // }, [location, navigate]);



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



    // console.log(SelectedCategories)
    return (
        <>
            <div className='flex h-screen'>
                <div className='md:w-[30%] flex flex-col justify-between md:justify-start left py-4'>
                    <div className='flex md:justify-start ml-5 md:ml-0 gap-2 items-center'>
                        <Link to='/'>
                            <img className='md:pl-10 md:w-72 w-52' src={logo} alt="Logo" />
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
                                <span className='text-[#399AF3]'>{phoneNumber}</span>
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
                                placeholder='0 0 0 0 0 0'
                                className='text-center mt-3 text-xl bg-[#1C1C1C14] p-2 rounded-full'
                            />
                        </div>
                        {/* <div>
                            <button onClick={handleAccount} className='bg-black w-full text-white p-3 rounded-3xl mt-6'>Verify</button>
                        </div> */}
                        <div>
                            <button
                                disabled={isLoading}
                                onClick={handleVerifyOTP}
                                className='bg-black w-full text-white p-3 rounded-3xl mt-6'
                            >
                                {isLoadingV ? (
                                    <div className='flex justify-center items-center gap-1'>
                                        <ImSpinner2 className='animate-spin' />
                                        <span>Verifying</span>
                                    </div>
                                ) : ("Verify")}
                            </button>
                        </div>
                    </div>
                    <div className="last px-5 md:px-10 mt-20 md:mt-52">
                        <p><span className='text-gray-500'>by</span> <span className='font-bold'>Signing In</span>, <span className='text-gray-500'>you agree with the </span><span className='text-[#399AF3] font-bold'><Link to="/terms"> Terms & Conditions</Link> </span> <span className='text-gray-500'>of CineTroop</span></p>
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
                                        <label className='font-semibold' htmlFor="firstName">
                                            First Name <span className='text-red-500' aria-hidden="true">*</span>
                                            <span className='sr-only'>required</span>
                                        </label>
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
                                        <label className='font-semibold' htmlFor="country">
                                            Country <span className='text-red-500' aria-hidden="true">*</span>
                                            <span className='sr-only'>required</span>
                                        </label>
                                        <Select
                                            id="country"
                                            options={countryOptions}
                                            value={selectedCountry}
                                            onChange={handleCountryChange}
                                            placeholder="Select Country"
                                            className="react-select-container"
                                            classNamePrefix="react-select"
                                            styles={{
                                                control: (base) => ({
                                                    ...base,
                                                    borderRadius: '9999px', // for rounded full
                                                    backgroundColor: 'rgba(28, 28, 28, 0.08)', // matches your original bg color
                                                    border: 'none',
                                                    padding: '4px 8px',
                                                    '&:hover': {
                                                        border: 'none'
                                                    }
                                                }),
                                                menu: (base) => ({
                                                    ...base,
                                                    zIndex: 9999
                                                })
                                            }}
                                        />
                                    </div>
                                    <div className='flex flex-col mt-2 md:mt-0 gap-2 w-full'>
                                        <label className='font-semibold' htmlFor="city">
                                            City <span className='text-red-500' aria-hidden="true">*</span>
                                            <span className='sr-only'>required</span>
                                        </label>
                                        <input
                                            type="text"
                                            className='px-3 mt-1 py-2 rounded-full bg-[#1C1C1C14]'
                                            value={city}
                                            onChange={(e) => setCity(e.target.value)}
                                            placeholder='Enter City'
                                            name="city"
                                            id="city"
                                        />
                                    </div>
                                </div>

                                <div className='flex md:mb-0 mb-8 flex-col gap-2 mt-2 '>
                                    <label className='font-semibold' htmlFor="bio">Short Bio</label>
                                    <textarea
                                        placeholder='Enter Bio'
                                        className='bg-[#1C1C1C14] px-3 py-2 rounded-xl min-h-32'
                                        value={bio}
                                        onChange={(e) => setBio(e.target.value)}
                                        name="bio"
                                        id="bio"
                                    ></textarea>
                                </div>
                            </div>
                            <div className='absolute bottom-0 right-0 p-4  w-full flex gap-2 justify-between bg-white'>
                                <button
                                    onClick={() => {
                                        handleCloseModal(false);
                                        handleCreateProfile(true);
                                    }}

                                    className='px-4 py-2 rounded-full bg-[#399AF31A] hover:bg-gray-300 text-[#399AF3] font-semibold transition duration-300'>Back</button>
                                <div className='flex gap-2 items-center'>
                                    <button onClick={handleCloseModal} className='px-4 py-2 rounded-full bg-[#E2E2E2] hover:bg-gray-300 transition duration-300'>Skip For Now</button>
                                    <button disabled={isLoading} onClick={handleComplete} className='px-4 py-2 rounded-full text-white font-semibold bg-black'>
                                        {
                                            isLoading ? (
                                                <div className='flex justify-center items-center gap-1'>
                                                    <ImSpinner2 className='animate-spin' />
                                                    Submitting
                                                </div>
                                            ) : (
                                                'Submit'
                                            )
                                        }
                                    </button>
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