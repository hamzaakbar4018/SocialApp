import React from 'react';
import useAuthor from '../../Hooks/useAuthor';

const ProfileAbout = () => {

    const {authorInfo} = useAuthor();
    const { author, posts, loading, error } = authorInfo;

    return (
        <div className='m-[2px] bg-white'>
            <div className=''>
                <div className='border-b border-gray-300 p-4'>
                    <h2 className='text-gray-400'>Bio</h2>
                    <h1>{author?.bio}</h1>
                </div>
                <div className='border-b border-gray-300 p-4'>
                    <h2 className='text-gray-400 '>Personal Website</h2>
                    <h1>{author?.website ? author?.website : "N/A"}</h1>
                </div>
                <div className='border-b border-gray-300 p-4'>
                    <h2 className='text-gray-400'>Experience</h2>
                    <h1>{author?.experience ? author?.experience : "N/A"}</h1>
                </div>
                <div className=' p-4'>
                    <h2 className='text-gray-400'>Location</h2>
                    <h1>{author?.location ? author?.location : "N/A"}</h1>
                </div>
            </div>
        </div>
    )
}

export default ProfileAbout;
