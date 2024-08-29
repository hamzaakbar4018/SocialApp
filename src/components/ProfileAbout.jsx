import React from 'react';

const ProfileAbout = () => {
    return (
        <div className='m-1 rounded  bg-gray-100'>
            <div className=''>
                <div className='border-b border-gray-400 p-4'>
                    <h2 className='text-gray-400'>Bio</h2>
                    <h1>Passionate web developer with a knack for creating interactive and user-friendly interfaces.</h1>
                </div>
                <div className='border-b border-gray-400 p-4'>
                    <h2 className='text-gray-400 '>Personal Website</h2>
                    <h1>https://yourpersonalwebsite.com</h1>
                </div>
                <div className='border-b border-gray-400 p-4'>
                    <h2 className='text-gray-400'>Experience</h2>
                    <h1>2 years of experience in front-end development, specializing in React.js and modern JavaScript frameworks.</h1>
                </div>
                <div className=' p-4'>
                    <h2 className='text-gray-400'>Location</h2>
                    <h1>Islamabad,Pakistan</h1>
                </div>
            </div>
        </div>
    )
}

export default ProfileAbout;
