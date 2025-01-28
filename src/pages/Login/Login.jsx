import React, { useRef, useState, useEffect } from 'react';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { Link, useNavigate } from 'react-router-dom';
import loginPageimg from '../../assets/Icons SVG/loginPageimg.png';
import logo from '../../assets/Icons SVG/clogob.png';
import {
    auth,
    db,
    RecaptchaVerifier,
    signInWithPhoneNumber
} from '../../Services/Firebase';
import { doc, getDoc } from 'firebase/firestore';
import { ImSpinner2 } from 'react-icons/im';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Login = () => {
    const [IsLoading, setIsLoading] = useState(false);
    const [phoneNumber, setPhoneNumber] = useState('');
    const [otp, setOtp] = useState('');
    const [valid, setValid] = useState(false);
    const [isOtpSent, setIsOtpSent] = useState(false);
    const [isRecaptchaReady, setIsRecaptchaReady] = useState(false);
    const recaptchaContainerRef = useRef(null);
    const [recaptchaVerifier, setRecaptchaVerifier] = useState(null);
    const [confirmationResult, setConfirmationResult] = useState(null);
    const [otpError, setOtpError] = useState('');
    const navigate = useNavigate();

    const validatePhoneNumber = (input) => {
        const phonePattern = /^\+?[1-9]\d{9,14}$/;
        return phonePattern.test(input);
    };

    const handleChange = (value) => {
        setPhoneNumber(value);
        setValid(validatePhoneNumber(value));
    };

    useEffect(() => {
        if (!recaptchaVerifier && recaptchaContainerRef.current) {
            try {
                const verifier = new RecaptchaVerifier(auth,
                    recaptchaContainerRef.current,
                    {
                        'size': 'invisible',
                        'callback': (response) => {
                            setIsRecaptchaReady(true);
                        },
                        'expired-callback': () => {
                            setIsRecaptchaReady(false);
                        }
                    }
                );
                verifier.render()
                    .then(() => {
                        setRecaptchaVerifier(verifier);
                        setIsRecaptchaReady(true);
                    })
                    .catch((error) => {
                        console.error("reCAPTCHA render error:", error);
                        setIsRecaptchaReady(false);
                    });
            } catch (error) {
                console.error("reCAPTCHA initialization error:", error);
                setIsRecaptchaReady(false);
            }
        }

        return () => {
            if (recaptchaVerifier) {
                recaptchaVerifier.clear();
            }
        };
    }, []);

    const handleSendOTP = async () => {
        if (!valid) {
            alert('Please enter a valid phone number');
            return;
        }
        if (!recaptchaVerifier || !isRecaptchaReady) {
            alert('Verification system not ready. Please wait or refresh the page.');
            return;
        }

        try {
            setIsLoading(true);
            const formatPhoneNumber = '+' + phoneNumber;

            const result = await signInWithPhoneNumber(
                auth,
                formatPhoneNumber,
                recaptchaVerifier
            );

            setConfirmationResult(result);
            setIsOtpSent(true);
            setIsLoading(false);
        } catch (error) {
            console.error("Error sending OTP:", error);

            if (error.code === 'auth/invalid-phone-number') {
                alert('Invalid phone number. Please check and try again.');
            } else if (error.code === 'auth/too-many-requests') {
                alert('Too many attempts. Please try again later.');
            } else {
                alert('An error occurred. Please try again.');
            }
            setIsLoading(false);
        } finally {
            setIsLoading(false);
        }
    };

    // const handleVerifyOTP = async () => {
    //     // Additional validation before verification
    //     if (otp.length !== 6) {
    //         setOtpError('OTP must be exactly 6 digits.');
    //         toast.error('OTP must be exactly 6 digits.');
    //         return;
    //     }

    //     try {
    //         setIsLoading(true);
    //         const result = await confirmationResult.confirm(otp);
    //         const user = result.user;

    //         console.log("Full User Object:", user);
    //         console.log("User UID:", user.uid);
    //         console.log("User Phone Number:", user.phoneNumber);

    //         // Check Firestore document
    //         const userDocRef = doc(db, 'userCollection', user.uid);
    //         const userDoc = await getDoc(userDocRef);

    //         console.log("Firestore User Document:", {
    //             exists: userDoc.exists(),
    //             data: userDoc.exists() ? userDoc.data() : "No document"
    //         });
    //         setIsLoading(false);

    //         navigate('/home');
    //         toast.success('Login Successful');
    //     } catch (error) {
    //         console.error("Detailed OTP Verification Error:", error);
    //         if (error.code === 'auth/invalid-verification-code') {
    //             setOtpError('Invalid OTP. Please try again.');
    //         } else {
    //             setOtpError('An error occurred during verification. Please try again.');
    //         }
    //     } finally {
    //         setIsLoading(false);
    //     }
    // };

    const handleVerifyOTP = async () => {
        // Additional validation before verification
        if (otp.length !== 6) {
            setOtpError('OTP must be exactly 6 digits.');
            toast.error('OTP must be exactly 6 digits.');
            return;
        }
    
        try {
            setIsLoading(true);
            const result = await confirmationResult.confirm(otp);
            const user = result.user;
    
            // Check Firestore document
            const userDocRef = doc(db, 'userCollection', user.uid);
            const userDoc = await getDoc(userDocRef);
    
            if (!userDoc.exists()) {
                // If user document doesn't exist, sign out the user and show error
                await auth.signOut();
                toast.error('Please sign up first to continue.');
                setIsLoading(false);
                // Optionally redirect to signup page
                navigate('/signup');
                return;
            }
    
            // If document exists, proceed with login
            console.log("User authenticated successfully:", {
                uid: user.uid,
                phoneNumber: user.phoneNumber,
                userData: userDoc.data()
            });
    
            setIsLoading(false);
            navigate('/home');
            toast.success('Login Successful');
            
        } catch (error) {
            console.error("Detailed OTP Verification Error:", error);
            setIsLoading(false);
            
            if (error.code === 'auth/invalid-verification-code') {
                setOtpError('Invalid OTP. Please try again.');
                toast.error('Invalid OTP. Please try again.');
            } else {
                setOtpError('An error occurred during verification. Please try again.');
                toast.error('An error occurred during verification. Please try again.');
            }
        }
    };
    return (
        <>
            <div ref={recaptchaContainerRef} style={{ visibility: 'hidden' }}></div>

            <div className='flex h-screen max-w-screen'>
                <ToastContainer />
                <div className='md:w-[30%] flex flex-col justify-between md:justify-start left py-4'>
                    <div className='flex md:justify-start ml-5 md:ml-0 gap-2 items-center'>
                        <Link to='/'>
                            <img className=' md:w-72 w-52' src={logo} alt="Logo" />
                        </Link>
                    </div>

                    <div className="middle px-5 md:px-10 md:mt-64">
                        <div>
                            <h1 className='font-bold text-2xl'>Login</h1>
                            <h2 className='mt-6 font-semibold'>Contact Number</h2>
                        </div>

                        {!isOtpSent ? (
                            <>
                                <div className="mt-2 flex w-full items-center bg-[#EDEDED] rounded-full px-4 py-2">
                                    <PhoneInput
                                        country={'in'}
                                        value={phoneNumber}
                                        onChange={handleChange}
                                        placeholder="Enter Contact"
                                        inputStyle={{
                                            backgroundColor: 'transparent',
                                            border: 'none',
                                            outline: 'none',
                                            boxShadow: 'none',
                                            width: '100%',
                                            fontSize: '16px',
                                        }}
                                        buttonStyle={{
                                            backgroundColor: 'transparent',
                                            border: 'none',
                                            paddingLeft: '0',
                                        }}
                                    />
                                </div>
                                <div>
                                    <button
                                        onClick={handleSendOTP}
                                        disabled={!valid || !isRecaptchaReady}
                                        className={`w-full text-white p-3 rounded-3xl mt-6 ${valid && isRecaptchaReady
                                            ? 'bg-black cursor-pointer'
                                            : 'bg-gray-400 cursor-not-allowed'
                                            }`}
                                    >
                                        {isRecaptchaReady ? (IsLoading ? (
                                            <div className='flex gap-1 justify-center items-center'>
                                                <ImSpinner2 className='animate-spin' />
                                                Sending OTP...
                                            </div>
                                        ) : ('Send OTP')) : ('Loading...')}
                                    </button>
                                </div>
                            </>
                        ) : (
                            <>
                                <div className="mt-2">
                                    <input
                                        type="text"
                                        value={otp}
                                        onChange={(e) => {
                                            const value = e.target.value;
                                            // Allow only digits and limit to 6 characters
                                            if (/^\d{0,6}$/.test(value)) {
                                                setOtp(value);
                                                setOtpError('');
                                            } else {
                                                setOtpError('OTP must be a 6-digit number.');
                                            }
                                        }}
                                        placeholder="Enter 6-digit OTP"
                                        className="w-full bg-[#EDEDED] rounded-full px-4 py-2"
                                    />
                                    {otpError && <p className="text-red-500 text-sm mt-1">{otpError}</p>}
                                </div>
                                <div>
                                    <button
                                        onClick={handleVerifyOTP}
                                        disabled={otp.length !== 6 || IsLoading}
                                        className={`w-full bg-black text-white p-3 rounded-3xl mt-6 ${otp.length === 6 && !IsLoading
                                            ? 'cursor-pointer'
                                            : 'bg-gray-400 cursor-not-allowed'
                                            }`}
                                    >
                                        {IsLoading ? (
                                            <div className='flex gap-1 justify-center items-center'>
                                                <ImSpinner2 className='animate-spin' />
                                                <span>Verifying</span>
                                            </div>
                                        ) : (
                                            'Verify OTP'
                                        )}
                                    </button>
                                    <button
                                        onClick={() => {
                                            setIsOtpSent(false);
                                            setOtp('');
                                            setOtpError('');
                                        }}
                                        className="w-full text-black p-3 rounded-3xl mt-2 border border-black"
                                    >
                                        Change Number
                                    </button>
                                </div>
                            </>
                        )}

                        <div>
                            <h1 className='text-[#262626] text-xl mt-4'>
                                Don't have an account yet?
                                <Link to="/signup">
                                    <span className='text-[#399AF3] font-bold'> Create Account</span>
                                </Link>
                            </h1>
                        </div>
                    </div>
                    <div className="last px-5 md:px-10 mt-32 md:mt-52">

                        <p>
                            <span className='text-gray-500'>by</span>
                            <span className='font-bold'> Signing In</span>,
                            <span className='text-gray-500'> you agree with the </span>
                            <span className='text-[#399AF3] font-bold'>
                                <Link to="/terms">Terms & Conditions </Link></span>
                            {/* <span className='text-gray-500'>of YouTooArt</span> */}
                            <Link to="/"><span className='text-gray-500'>of CineTroop</span></Link>

                        </p>

                    </div>
                </div>
                <div className="right hidden md:block w-[70%] m-5">
                    <img className='' src={loginPageimg} alt="Login Page Illustration" />
                </div>
            </div>
        </>
    );
}

export default Login;
