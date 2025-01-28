// Signup.jsx
import React, { useState, useEffect } from 'react';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { Link, useNavigate } from 'react-router-dom';
import { ImSpinner2 } from 'react-icons/im';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
    auth,
    RecaptchaVerifier,
    signInWithPhoneNumber,
    db
} from '../../Services/Firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import loginPageimg from '../../assets/Icons SVG/loginPageimg.png';
import logo from '../../assets/Icons SVG/clogob.png';

const Signup = () => {
    const [phoneNumber, setPhoneNumber] = useState('');
    const [valid, setValid] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    // Cleanup reCAPTCHA on unmount
    useEffect(() => {
        return () => {
            const recaptchaElements = document.querySelectorAll('.grecaptcha-badge');
            recaptchaElements.forEach(element => {
                element.remove();
            });
        };
    }, []);

    // Validate phone number format
    const validatePhoneNumber = (input) => {
        const phonePattern = /^\+?[1-9]\d{9,14}$/;
        return phonePattern.test(input);
    };

    // Handle phone number input change
    const handleChange = (value) => {
        setPhoneNumber(value);
        setValid(validatePhoneNumber('+' + value));
    };

    // Handle OTP sending
    const handleSendOTP = async () => {
        if (!valid) {
            toast.error('Please enter a valid phone number');
            return;
        }

        try {
            setIsLoading(true);
            const formatPhoneNumber = '+' + phoneNumber;

            // Check for existing user
            const usersRef = collection(db, 'userCollection');
            const q = query(usersRef, where('phoneNumber', '==', formatPhoneNumber));
            const querySnapshot = await getDocs(q);

            if (!querySnapshot.empty) {
                toast.error('Phone number already registered');
                setIsLoading(false);
                return;
            }

            // Create new RecaptchaVerifier instance
            const recaptchaVerifier = new RecaptchaVerifier(auth, 'send-otp-button', {
                size: 'invisible',
                callback: async (response) => {
                    console.log('reCAPTCHA verified');
                },
                'expired-callback': () => {
                    toast.error('Please try again.');
                    setIsLoading(false);
                }
            });

            // Render reCAPTCHA
            await recaptchaVerifier.render();

            // Send OTP
            const confirmationResult = await signInWithPhoneNumber(
                auth,
                formatPhoneNumber,
                recaptchaVerifier
            );

            // Navigate to verification page
            navigate('/verify', {
                state: {
                    phoneNumber: formatPhoneNumber,
                    verificationId: confirmationResult.verificationId
                }
            });

        } catch (error) {
            console.error("Error sending OTP:", error ,error.code, error.message);
            toast.error('Failed to send OTP');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <div className='flex h-screen'>
                <ToastContainer />
                <div className='md:w-[30%] flex flex-col justify-between md:justify-start left py-4'>
                    <div className='flex md:justify-start ml-5 md:ml-0 gap-2 items-center'>
                        <Link to='/'>
                            <img className='md:pl-10 md:w-72 w-52' src={logo} alt="Logo" />
                        </Link>
                    </div>

                    <div className="middle px-5 md:px-10 mt-32 md:mt-64">
                        <div>
                            <h1 className='font-bold text-2xl'>Create Account</h1>
                            <h2 className='mt-6 font-semibold'>Contact Number</h2>
                        </div>
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
                                id="send-otp-button"
                                onClick={handleSendOTP}
                                disabled={!valid || isLoading}
                                className={`w-full text-white p-3 rounded-3xl mt-6 ${
                                    valid && !isLoading ? 'bg-black hover:bg-gray-800' : 'bg-gray-400 cursor-not-allowed'
                                }`}
                            >
                                {isLoading ? (
                                    <div className='flex items-center justify-center gap-1'>
                                        <ImSpinner2 className='animate-spin' />
                                        Sending OTP...
                                    </div>
                                ) : (
                                    'Send OTP'
                                )}
                            </button>
                        </div>
                        <div>
                            <h1 className='text-[#262626] text-xl mt-4'>
                                Already have an account?
                                <Link to="/login">
                                    <span className='text-[#399AF3] font-bold'> Login</span>
                                </Link>
                            </h1>
                        </div>
                    </div>

                    <div className="last px-5 md:px-10 mt-20 md:mt-52">
                        <p>
                            <span className='text-gray-500'>By </span>
                            <span className='font-bold'>Signing In</span>,
                            <span className='text-gray-500'> you agree with the </span>
                            <span className='text-[#399AF3] font-bold'>
                                <Link to="/terms"> Terms & Conditions </Link>
                            </span>
                            <Link to="/">
                                <span className='text-gray-500'>of CineTroop</span>
                            </Link>
                        </p>
                    </div>
                </div>

                <div className="right hidden md:block w-[70%] m-5">
                    <img src={loginPageimg} alt="Login Page" />
                </div>
            </div>
        </>
    );
};

export default Signup;