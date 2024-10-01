import React, { useState } from 'react';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { Link } from 'react-router-dom';
import loginPageimg from '../../assets/Images/loginPageimg.png'
import logo from '../../assets/Images/logo.svg'

const Login = () => {
    const [phoneNumber, setPhoneNumber] = useState('');
    const [valid, setValid] = useState(true);

    const handleChange = (value) => {
        setPhoneNumber(value);
        setValid(validatePhoneNumber(value));
    };

    const validatePhoneNumber = (input) => {
        const phoneNumberPattern = /^\d{10}$/;
        const digitsOnly = input.replace(/\D/g, '');
        return phoneNumberPattern.test(digitsOnly);
    };

    return (
        <>
            <div className='flex h-screen'>
                <div className='md:w-[30%] left py-4'>
                    <div className='flex md:justify-start justify-center gap-2 items-center'>
                        <img className='md:pl-10 w-60' src={logo} alt="" />
                        {/* <h1 className='text-2xl bg-gradient-to-r from-[#000000] to-[#656565] text-transparent bg-clip-text'>
                            YOUTOOART
                        </h1> */}
                    </div>

                    <div className="middle px-10 mt-32 md:mt-64">
                        <div>
                            <h1 className='font-bold text-2xl'>Create Account</h1>
                            <h2 className='mt-6 font-semibold'>Contact Number</h2>
                        </div>
                        <div className=' mt-2 '>
                            <PhoneInput
                                country={'us'}
                                value={phoneNumber}
                                onChange={handleChange}
                                placeholder='Enter Contact'
                                inputStyle={{ borderColor: valid ? 'black' : 'red' }}
                                className='bg-[#1C1C1C14] '
                            />
                            {!valid && <p style={{ color: 'red' }}>Please enter a valid 10-digit phone number.</p>}
                        </div>
                        <div>
                            <Link to='/verify'>
                                <button className='bg-black w-full text-white p-3 rounded-3xl mt-6'>Send OTP</button>
                            </Link>
                        </div>
                        <div>
                            <h1 className='text-[#262626] text-xl mt-4'>Already have an account yet?<Link to="/login">
                            <span className='text-[#399AF3] font-bold'> Login</span>
                            </Link></h1>
                        </div>
                    </div>
                    <div className="last px-10 mt-20 md:mt-52">
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

export default Login;
