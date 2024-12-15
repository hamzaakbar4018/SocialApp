import React, { useRef, useState, useEffect } from 'react';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { Link, useNavigate } from 'react-router-dom';
import loginPageimg from '../../assets/Icons SVG/loginPageimg.png'
import logo from '../../assets/Icons SVG/logo.svg'
import {
    auth,
    RecaptchaVerifier,
    signInWithPhoneNumber
} from '../../Services/Firebase';

const Signup = () => {
    const [phoneNumber, setPhoneNumber] = useState('');
    const [valid, setValid] = useState(false);
    const [isRecaptchaReady, setIsRecaptchaReady] = useState(false);
    const recaptchaContainerRef = useRef(null);
    const [recaptchaVerifier, setRecaptchaVerifier] = useState(null);
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
        // Ensure reCAPTCHA is only initialized on client-side
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
            const formatPhoneNumber = '+' + phoneNumber;

            const confirmationResult = await signInWithPhoneNumber(
                auth,
                formatPhoneNumber,
                recaptchaVerifier
            );

            window.confirmationResult = confirmationResult;

            //  to verification page
            navigate('/verify', {
                state: {
                    phoneNumber: formatPhoneNumber
                }
            });
        } catch (error) {
            console.error("Error sending OTP:", error);
        }
    };

    return (
        <>
            {/* Hide captcha */}
            <div ref={recaptchaContainerRef} style={{ visibility: 'hidden' }}></div> 

            <div className='flex h-screen'>
                <div className='md:w-[30%] flex flex-col justify-between md:justify-start left py-4'>
                    <div className='flex md:justify-start md:ml-0 ml-5 gap-2 items-center'>
                        <Link to='/'>
                            <img className='md:pl-10 md:w-60 w-52' src={logo} alt="Logo" />
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
                                onClick={handleSendOTP}
                                disabled={!valid || !isRecaptchaReady}
                                className={`w-full text-white p-3 rounded-3xl mt-6 ${valid && isRecaptchaReady
                                    ? 'bg-black'
                                    : 'bg-gray-400 cursor-not-allowed'
                                    }`}
                            >
                                {isRecaptchaReady ? 'Send OTP' : 'Loading...'}
                            </button>
                        </div>
                        <div>
                            <h1 className='text-[#262626] text-xl mt-4'>Already have an account yet?<Link to="/login">
                                <span className='text-[#399AF3] font-bold'> Login</span>
                            </Link></h1>
                        </div>
                    </div>
                    <div className="last px-5 md:px-10 mt-20 md:mt-52">
                        <p><span className='text-gray-500'>by</span> <span className='font-bold'>Signing In</span>, <span className='text-gray-500'>you agree with the </span><span className='text-[#399AF3] font-bold'>Terms & Conditions </span> <span className='text-gray-500'>of You2Art</span></p>
                    </div>
                </div>
                <div className="right hidden md:block w-[70%] m-5">
                    <img className='' src={loginPageimg} alt="" />
                </div>
            </div>
        </>
    );
}

export default Signup;