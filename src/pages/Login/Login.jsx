import React, { useState } from 'react';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { Link } from 'react-router-dom';
import loginPageimg from '../../assets/Icons SVG/loginPageimg.png'
import logo from '../../assets/Icons SVG/logo.svg'

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
                        <Link to='/'>
                        <img className='md:pl-10 w-60' src={logo} alt="" />
                        </Link>
                    </div>

                    <div className="middle px-10 mt-32 md:mt-64">
                        <div>
                            <h1 className='font-bold text-2xl'>Login</h1>
                            <h2 className='mt-6 font-semibold'>Contact Number</h2>
                        </div>
                        <div className="mt-2 flex items-center gap-2">
    <div className="flex w-full items-center bg-[#EDEDED] rounded-full px-4 py-2">
        <PhoneInput className='w-full'
            country={'in'}  // Set to India (+91) for example
            value={phoneNumber}
            onChange={handleChange}
            placeholder="Enter Contact"
            inputStyle={{
                backgroundColor: 'transparent',  // Transparent so it blends with the parent background
                border: 'none',  // Remove default border
                outline: 'none',  // Remove outline when focused
                boxShadow: 'none',  // Remove shadow
                width: '150px',  // Adjust width
                fontSize: '16px',  // Match text size
            }}
            buttonStyle={{
                backgroundColor: 'transparent',  // Transparent for the flag section
                border: 'none',  // Remove button border
                paddingLeft: '0',  // Remove extra padding
            }}
        />
    </div>
</div>

                        <div>
                            <Link to='/verify'>
                                <button className='bg-black w-full text-white p-3 rounded-3xl mt-6'>Send OTP</button>
                            </Link>
                        </div>
                        <div>
                            <h1 className='text-[#262626] text-xl mt-4'>Don't have an account yet?<Link to="/signup">
                            <span className='text-[#399AF3] font-bold'> Create Account</span>
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
