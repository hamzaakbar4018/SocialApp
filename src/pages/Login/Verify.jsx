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
import { collection, getDocs, doc, setDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL, getStorage } from 'firebase/storage';
import { PhoneAuthProvider, signInWithCredential } from 'firebase/auth';
import { ImSpinner2 } from 'react-icons/im';

const Verify = () => {
    const [otpCode, setOtpCode] = useState('');
    const [complete, setComplete] = useState(false);
    const [createProfile, setCreateProfile] = useState(false);
    const [createProfile2, setCreateProfile2] = useState(false);
    const [phoneNumber, setPhoneNumber] = useState('');
    const [verificationId, setVerificationId] = useState('');
    const [actorProfilePicWarningShown, setActorProfilePicWarningShown] = useState(false);

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
    const [height, setheight] = useState('');
    const [bio, setBio] = useState('');
    const [profileImage, setProfileImage] = useState(null);

    const [countryOptions, setCountryOptions] = useState([]);
    const [selectedCountry, setSelectedCountry] = useState(null);
    const [errors, setErrors] = useState({ firstName: '', country: '', city: '' }); // Added errors state

    // Default profile image URL
    const defaultProfileImage = "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y";
    const [verificationCredential, setVerificationCredential] = useState(null);
    const handleBasicProfile = async () => {
        try {
            setIsLoading(true);

            // Sign in with credential first
            if (!verificationCredential) {
                throw new Error("Verification credential not found");
            }

            const userCredential = await signInWithCredential(auth, verificationCredential);
            const user = userCredential.user;

            if (!user) {
                throw new Error("Failed to create user account");
            }

            // Create basic profile
            const basicProfileData = {
                firstName: "User",
                lastName: "",
                country: "Not Specified",
                docID: user.uid,
                city: "Not Specified",
                bio: "",
                categoryName: [],
                phoneNumber,
                image: defaultProfileImage,
                isVerified: true,
                isProductionHouse: false,
                canPost: true,
                height: "",
                experience: "",
                website: "",
                blockedUsers: [],
                follow: [],
                friends: [],
                received: [],
                requested: [],
                sent: [],
                blocked: [],
                createdAt: new Date()
            };

            const userDocRef = doc(db, 'userCollection', user.uid);
            await setDoc(userDocRef, basicProfileData);

            setCreateProfile2(false);
            setComplete(true);

        } catch (error) {
            console.error("Error saving basic profile:", error);
            alert("Failed to save profile. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleSkipForNow = () => {
        if (createProfile) {
            // If we're in the first modal, go to the second modal
            setCreateProfile(false);
            setCreateProfile2(true);
        } else if (createProfile2) {
            // Check if required fields are filled
            if (!firstName.trim() || !country.trim() || !city.trim()) {
                alert("Please fill in the required fields: First Name, Country, and City.");
                return;
            }
            // Proceed to complete without saving profile
            setCreateProfile2(false);
            setComplete(true);
        }
    };

    // Validation function
    // const validateForm = () => {
    //     const newErrors = {

    //         firstName: '',
    //         country: '',
    //         city: ''
    //     };

    //     if(SelectedCategories == 'Actor' && !profileImage){
    //             alert('It will be good to have the image as actor!')
    //     }

    //     let isValid = true;

    //     if (!firstName.trim()) {
    //         newErrors.firstName = 'First Name is required';
    //         isValid = false;
    //     }

    //     if (!country.trim()) {
    //         newErrors.country = 'Country is required';
    //         isValid = false;
    //     }

    //     if (!city.trim()) {
    //         newErrors.city = 'City is required';
    //         isValid = false;
    //     }

    //     setErrors(newErrors);
    //     return isValid;
    // };


    const [warningShown, setWarningShown] = useState(false);

    const validateForm = () => {
        const newErrors = {
            firstName: '',
            country: '',
            city: '',
            height: ''
        };

        let isValid = true;

        const isActor = SelectedCategories.includes('Actor');

        if (isActor && !height.trim()) {
            newErrors.height = 'Height is required for actors';
            isValid = false;
        }

        if (isActor && !profileImage && !actorProfilePicWarningShown) {
            alert('It\'s recommended to have a profile picture for actors to be noticed!');
            setActorProfilePicWarningShown(true);
            return; 
        }
        

        if (!firstName.trim()) {
            newErrors.firstName = 'First Name is required';
            isValid = false;
        }

        if (!country.trim()) {
            newErrors.country = 'Country is required';
            isValid = false;
        }

        if (!city.trim()) {
            newErrors.city = 'City is required';
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };


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
        setCity('');
        if (selectedOption) {
            setErrors(prev => ({ ...prev, country: '' }));
        }
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
        } catch (error) {
            console.error("Error in fetching categories:", error);
            setError("Failed to load categories");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    // Upload profile image to Firebase Storage
    const uploadProfileImage = async (file) => {
        if (!file) return defaultProfileImage; // Return default image URL if no file
        try {
            const storage = getStorage(app);
            const uniqueFileName = `YooTooArt/userModule/${Date.now()}-${file.name}`;
            const storageRef = ref(storage, uniqueFileName);

            const metadata = {
                contentType: file.type,
                customMetadata: {
                    'uploadedBy': 'user'
                }
            };

            const snapshot = await uploadBytes(storageRef, file, metadata);
            const downloadURL = await getDownloadURL(snapshot.ref);
            return downloadURL;
        } catch (error) {
            console.error("Error uploading profile image:", error);
            return defaultProfileImage; // Return default image URL if upload fails
        }
    };

    const saveUserProfile = async () => {
        try {
            setIsLoading(true);

            // Validate required fields
            if (!firstName || !country || !city) {
                alert("Please fill in all required fields");
                return false;
            }

            // Sign in with credential
            if (!verificationCredential) {
                throw new Error("Verification credential not found");
            }

            const userCredential = await signInWithCredential(auth, verificationCredential);
            const user = userCredential.user;

            if (!user) {
                throw new Error("Failed to create user account");
            }

            // Upload profile image or use default
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
                image: imageUrl,
                isVerified: true,
                isProductionHouse: false,
                canPost: true,
                experience: '',
                website: '',
                height: '',
                blockedUsers: [],
                follow: [],
                friends: [],
                received: [],
                requested: [],
                sent: [],
                blocked: [],
                createdAt: new Date()
            };

            // Save to Firestore
            const userDocRef = doc(db, 'userCollection', user.uid);
            await setDoc(userDocRef, userProfileData);

            return true;
        } catch (error) {
            console.error("Error saving user profile:", error);
            alert("Failed to save profile. Please try again.");
            return false;
        } finally {
            setIsLoading(false);
        }
    };


    useEffect(() => {
        if (location.state && location.state.phoneNumber) {
            setPhoneNumber(location.state.phoneNumber);
            if (location.state.verificationId) {
                setVerificationId(location.state.verificationId);
            }
        } else {
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
            if (!verificationId) {
                throw new Error('No verification session found. Please restart the process.');
            }

            const credential = PhoneAuthProvider.credential(verificationId, otpCode);
            // Store credential instead of signing in
            setVerificationCredential(credential);
            setCreateProfile(true);
            setError(null);

        } catch (error) {
            console.error("Verification Error:", error);
            if (error.code) {
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
            } else {
                setError(`Verification failed: ${error.message}`);
            }
        } finally {
            setIsLoadingV(false);
        }
    };



    const handleComplete = async () => {
        if (!validateForm()) {
            return;
        }

        try {
            setIsLoading(true);
            const profileSaved = await saveUserProfile();
            if (profileSaved) {
                setComplete(true);
                setCreateProfile2(false);
            }
        } catch (error) {
            console.error("Error completing profile:", error);
            alert("Failed to complete profile. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setProfileImage(file);
    };

    const handleImageClick = () => {
        document.getElementById('fileInput').click();
    };

    const handleToggleCategory = (categoryName) => {
        setSelectedCategories(prev =>
            prev.includes(categoryName)
                ? prev.filter(cat => cat !== categoryName)
                : [...prev, categoryName]
        );
    };

    const handleCreateProfile2 = () => {
        setCreateProfile2(true);
        setCreateProfile(false);
    };

    const handleCloseModal = () => {
        setComplete(false);
        setCreateProfile(false);
        setCreateProfile2(false);
    };

    return (
        <>
            <div className='flex h-screen'>
                <div className='md:w-[30%] flex flex-col justify-between py-4'>
                    <div className='flex justify-start ml-5 md:ml-0 gap-2 items-center'>
                        <Link to='/'>
                            <img className='md:pl-10 md:w-72 w-52' src={logo} alt="Logo" />
                        </Link>
                    </div>

                    <div className="middle px-5 relative md:px-10 md:mt-48">
                        <div>
                            <Link to='/login'>
                                <h1 className='font-bold text-2xl'>
                                    <IoMdArrowRoundBack className='mb-6' aria-hidden="true" />
                                </h1>
                            </Link>
                            <h1 className='text-xl font-bold mt-3'>Verify Your Account</h1>
                            <h2 className='mt-3 font-light'>
                                Please enter the 6-digit OTP you received on your registered phone{' '}
                                <span className='text-[#399AF3]'>{phoneNumber}</span>
                            </h2>
                        </div>
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
                        <div>
                            <button
                                disabled={isLoadingV}
                                onClick={handleVerifyOTP}
                                className='bg-black w-full text-white p-3 rounded-3xl mt-6 disabled:opacity-50 disabled:cursor-not-allowed'
                            >
                                {isLoadingV ? (
                                    <div className='flex justify-center items-center gap-1'>
                                        <ImSpinner2 className='animate-spin' />
                                        <span>Verifying</span>
                                    </div>
                                ) : ("Verify")}
                            </button>
                        </div>
                        {error && (
                            <p className="text-red-500 mt-2 text-sm">{error}</p>
                        )}
                    </div>
                    <div className="last px-5 md:px-10 mt-20 md:mt-52">
                        <p>
                            <span className='text-gray-500'>By</span> <span className='font-bold'>Signing In</span>,{' '}
                            <span className='text-gray-500'>you agree with the </span>
                            <span className='text-[#399AF3] font-bold'>
                                <Link to="/terms">Terms & Conditions</Link>
                            </span> <span className='text-gray-500'>of CineTroop</span>
                        </p>
                    </div>
                </div>

                <div className="right hidden md:block w-[70%] m-5">
                    <img src={loginPageimg} alt="Login Page" />
                </div>
            </div>

            {/* Profile Creation Modal */}
            {createProfile && (
                <dialog className="modal modal-open">
                    <div className="modal-box overflow-y-auto p-0 h-[90%] sm:h-[80%] md:min-h-[70%] lg:h-[60%] xl:h-[50%] w-[90%] sm:w-[80%] md:w-[80%] lg:w-[70%] xl:min-w-[45%] overflow-hidden relative">
                        <button
                            type="button"
                            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                            onClick={handleCloseModal}
                            aria-label="Close Modal"
                        >
                            ✕
                        </button>
                        <h3 className="font-bold px-4 sm:px-6 pt-4 text-lg">Complete Profile</h3>
                        <div className="pb-2 border-b border-gray-300">
                            <h1 className="px-4 sm:px-6 text-sm text-[#399AF3]">Step 1 of 2</h1>
                        </div>
                        <div className='overflow-y-auto h-full pb-2'>
                            <div className="px-4 sm:px-6 py-2">
                                <h1 className="font-semibold">Choose Categories (Multiple Selection)</h1>
                            </div>
                            <div className="px-4 sm:px-6 py-2 grid grid-cols-1 sm:grid-cols-2 gap-2">
                                {isLoading ? (
                                    <div className="flex justify-center items-center col-span-2">
                                        <ImSpinner2 className='animate-spin' />
                                    </div>
                                ) : allCategories.length > 0 ? (
                                    allCategories.map((data) => (
                                        <div
                                            key={data.id}
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
                                                id={`category-${data.id}`}
                                                checked={SelectedCategories.includes(data.name)}
                                                onChange={() => handleToggleCategory(data.name)}
                                                onClick={(e) => e.stopPropagation()}
                                            />
                                            <label
                                                htmlFor={`category-${data.id}`}
                                                className="cursor-pointer font-semibold flex-grow"
                                            >
                                                {data.name}
                                            </label>
                                        </div>
                                    ))
                                ) : (
                                    <p className="col-span-2 text-center text-red-500">No categories available.</p>
                                )}
                            </div>
                        </div>
                        <div className="sticky bottom-0 left-0 p-4 w-full flex md:flex-row gap-2 justify-center md:justify-end bg-white">
                            <button
                                type="button"
                                onClick={handleSkipForNow}
                                className="px-4 py-2 rounded-full bg-[#E2E2E2] hover:bg-gray-300 transition duration-300"
                            >
                                Skip For Now
                            </button>
                            <button
                                type="button"
                                onClick={handleCreateProfile2}
                                disabled={SelectedCategories.length === 0}
                                className={`px-4 py-2 rounded-full text-white font-semibold ${SelectedCategories.length > 0
                                    ? 'bg-black hover:bg-gray-800'
                                    : 'bg-gray-400 cursor-not-allowed'
                                    } transition duration-300`}
                            >
                                Save and Next
                            </button>
                        </div>
                    </div>
                </dialog>
            )}

            {/* Profile Creation Step 2 Modal */}
            {createProfile2 && (
                <dialog className="modal modal-open">
                    <div className="modal-box p-0 h-[80%] 2xl:h-[80%] 2xl:min-w-[50%] overflow-hidden relative">
                        <button
                            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                            onClick={handleCloseModal}
                            aria-label="Close Modal"
                        >
                            ✕
                        </button>
                        <h3 className="font-bold px-6 pt-4 text-lg">Complete Profile</h3>
                        <div className='pb-2 border-b border-gray-300'>
                            <h1 className='px-6 text-sm text-[#399AF3]'>Step 2 of 2</h1>
                        </div>
                        <div className='px-6 overflow-y-auto max-h-[70%] py-2'>
                            <div className='py-2'>
                                <h1 className='font-semibold'>Upload Your Image</h1>
                            </div>
                            <div className="flex bg-[#399AF31A] py-5 rounded flex-col items-center justify-center gap-2">
                                <img
                                    className="w-[18%] h-[18%] cursor-pointer"
                                    src={upload}
                                    alt="Upload"
                                    onClick={handleImageClick}
                                />
                                <p className='text-sm'>
                                    Drag and Drop or <span className='text-[#399AF3]'>Browse</span> an image
                                </p>
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
                            <div className='flex flex-wrap gap-2 mt-2'>
                                <div className='flex flex-col gap-2 w-full'>
                                    <label className='font-semibold' htmlFor="firstName">
                                        First Name <span className='text-red-500' aria-hidden="true">*</span>
                                        <span className='sr-only'>required</span>
                                    </label>
                                    <input
                                        className={`px-3 mt-1 py-2 rounded-full bg-[#1C1C1C14] ${errors.firstName ? 'border-2 border-red-500' : ''
                                            }`}
                                        type="text"
                                        placeholder='Enter First Name'
                                        value={firstName}
                                        onChange={(e) => {
                                            setFirstName(e.target.value);
                                            if (e.target.value.trim()) {
                                                setErrors(prev => ({ ...prev, firstName: '' }));
                                            }
                                        }}
                                        name="firstName"
                                        id="firstName"
                                        required
                                    />
                                    {errors.firstName && (
                                        <span className="text-red-500 text-sm ml-2">{errors.firstName}</span>
                                    )}
                                </div>
                                <div className='flex flex-col gap-2 w-full'>
                                    <label className='font-semibold' htmlFor="lastName">
                                        Last Name
                                    </label>
                                    <input
                                        className='px-3 mt-1 py-2 rounded-full bg-[#1C1C1C14]'
                                        type="text"
                                        placeholder='Enter Last Name'
                                        value={lastName}
                                        onChange={(e) => setLastName(e.target.value)}
                                        name="lastName"
                                        id="lastName"
                                    />
                                </div>
                            </div>

                            <div className='md:flex gap-2 mt-2'>
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
                                                borderRadius: '9999px',
                                                backgroundColor: 'rgba(28, 28, 28, 0.08)',
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
                                    {errors.country && (
                                        <span className="text-red-500 text-sm ml-2">{errors.country}</span>
                                    )}
                                </div>
                                <div className='flex flex-col mt-2 md:mt-0 gap-2 w-full'>
                                    <label className='font-semibold' htmlFor="city">
                                        City <span className='text-red-500' aria-hidden="true">*</span>
                                        <span className='sr-only'>required</span>
                                    </label>
                                    <input
                                        type="text"
                                        className={`px-3 mt-1 py-2 rounded-full bg-[#1C1C1C14] ${errors.city ? 'border-2 border-red-500' : ''
                                            }`}
                                        value={city}
                                        onChange={(e) => {
                                            setCity(e.target.value);
                                            if (e.target.value.trim()) {
                                                setErrors(prev => ({ ...prev, city: '' }));
                                            }
                                        }}
                                        placeholder='Enter City'
                                        name="city"
                                        id="city"
                                        required
                                    />
                                    {errors.city && (
                                        <span className="text-red-500 text-sm ml-2">{errors.city}</span>
                                    )}
                                </div>
                            </div>

                            {SelectedCategories.includes('Actor') && (
                                <div className='flex flex-col mt-2 md:mt-2 gap-2 w-full'>
                                    <label className='font-semibold' htmlFor="height">
                                        Height <span className='text-red-500' aria-hidden="true">*</span>
                                        <span className='sr-only'>required</span>
                                    </label>
                                    <input
                                        type="number"
                                        className={`px-3 mt-1 py-2 rounded-full bg-[#1C1C1C14] ${errors.height ? 'border-2 border-red-500' : ''}`}
                                        value={height}
                                        onChange={(e) => {
                                            setheight(e.target.value);
                                            if (e.target.value.trim()) {
                                                setErrors(prev => ({ ...prev, height: '' }));
                                            }
                                        }}
                                        placeholder='Enter Height'
                                        name="height"
                                        id="height"
                                        required
                                    />
                                    {errors.height && (
                                        <span className="text-red-500 text-sm ml-2">{errors.height}</span>
                                    )}
                                </div>
                            )}

                            <div className='flex md:mb-0 mb-8 flex-col gap-2 mt-2'>
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
                        <div className='absolute bottom-0 right-0 p-4 w-full flex gap-2 justify-between bg-white'>
                            <button
                                type="button"
                                onClick={() => {
                                    setCreateProfile2(false);
                                    setCreateProfile(true);
                                }}
                                className='px-4 py-2 rounded-full bg-[#399AF31A] hover:bg-gray-300 text-[#399AF3] font-semibold transition duration-300'
                            >
                                Back
                            </button>
                            <div className='flex gap-2 items-center'>
                                <button
                                    type="button"
                                    onClick={handleSkipForNow}
                                    className='px-4 py-2 rounded-full bg-[#E2E2E2] hover:bg-gray-300 transition duration-300'
                                >
                                    Skip For Now
                                </button>
                                <button
                                    disabled={isLoading}
                                    onClick={handleComplete}
                                    className={`px-4 py-2 rounded-full text-white font-semibold ${isLoading
                                        ? 'bg-gray-400 cursor-not-allowed'
                                        : 'bg-black hover:bg-gray-800'
                                        } transition duration-300`}
                                >
                                    {isLoading ? (
                                        <div className='flex justify-center items-center gap-1'>
                                            <ImSpinner2 className='animate-spin' />
                                            <span>Submitting</span>
                                        </div>
                                    ) : (
                                        'Submit'
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                </dialog>
            )}

            {/* Complete Modal */}
            {complete && (
                <dialog className="modal modal-open">
                    <div className="modal-box md:w-1/3">
                        <button
                            type="button"
                            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                            onClick={() => setComplete(false)}
                            aria-label="Close Modal"
                        >
                            ✕
                        </button>
                        <div className='flex flex-col items-center mt-5'>
                            <img src={verifyTick} alt="Profile Completed" />
                            <h1 className='text-xl font-bold mt-4'>Profile Completed!</h1>
                            <p className='text-center font-semibold mt-2'>Congrats! You have successfully completed your profile.</p>
                            <div className='flex justify-center w-full mt-8'>
                                <Link to="/home" className='w-full'>
                                    <button className='bg-black w-full text-white p-3 rounded-3xl hover:bg-gray-800 transition duration-300'>
                                        Proceed to Home
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </dialog>
            )}
        </>
    );

};

export default Verify;


