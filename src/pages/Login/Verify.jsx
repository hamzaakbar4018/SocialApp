import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import loginPageimg from '../../assets/Images/loginPageimg.png';
import logo from '../../assets/Images/logo.svg';
import verifyTick from '../../assets/Images/verifytick.svg'
import { IoMdArrowRoundBack } from "react-icons/io";

const Verify = () => {
    const [verified, setVerified] = useState(false);

    const handleVerify = () => {
        setVerified(true);
    }

    const handleCloseModal = () => {
        setVerified(false);
    }

    return (
        <>
            <div className='flex h-screen'>
                <div className='md:w-[30%] left py-4'>
                    <div className='flex md:justify-start justify-center gap-2 items-center'>
                        <img className='md:pl-10' src={logo} alt="Logo" />
                        <h1 className='text-2xl bg-gradient-to-r from-[#000000] to-[#656565] text-transparent bg-clip-text'>
                            YOUTOOART
                        </h1>
                    </div>

                    <div className="middle relative px-10 md:mt-48">
                        <div>
                            <Link to='/login'>
                                <h1 className='font-bold text-2xl'><IoMdArrowRoundBack className='mb-6' /></h1>
                            </Link>
                            <h1 className='text-xl font-bold mt-3'>Verify Your Account</h1>
                            <h2 className='mt-3 font-light'>Please enter 6 digits OTP you received on your registered phone <span className='text-[#399AF3]'>+91325*****41</span></h2>
                        </div>
                        <div className='mt-6 flex flex-col'>
                            <label htmlFor="otp" className='font-bold'>Enter OTP</label>
                            <input type="number" name="otp" id="otp" placeholder='0 0 0 0' className='text-center mt-3 text-xl' />
                        </div>
                        <div>
                            <button onClick={handleVerify} className='bg-black w-full text-white p-3 rounded-3xl mt-6'>Verify</button>
                        </div>
                    </div>
                    <div className="last px-10 mt-20 md:mt-52">
                        <p><span className='text-gray-500'>by</span> <span className='font-bold'>Signing In</span>, <span className='text-gray-500'>you agree with the </span><span className='text-[#399AF3] font-bold'>Terms & Conditions </span> <span className='text-gray-500'>of You2Art</span></p>
                    </div>
                </div>

                <div className="right hidden md:block w-[70%] m-5">
                    <img className='' src={loginPageimg} alt="Login Page" />
                </div>
            </div>

            {/* Modal */}
            {verified && (
                <dialog id="my_modal_3" className="modal modal-open">
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
                            <img src={verifyTick} alt="" />
                            <h1 className='text-xl font-bold'>Account Created</h1>
                            <h1 className='text-center'>Your account was created, you can now start exploring Talent and post Casting Calls.</h1>
                            <div className='flex gap-10 mt-8'>
                                <button className=' p-3 rounded-3xl bg-[#E2E2E2]'>SkipFor Now</button>
                                <button className='bg-black text-white p-3 rounded-3xl'>Create Profile</button>
                            </div>
                        </div>
                    </div>
                </dialog>
            )}
        </>
    )
}

export default Verify;
