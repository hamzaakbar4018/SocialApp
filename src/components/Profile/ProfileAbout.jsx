import React from 'react';
import useAuthor from '../../Hooks/useAuthor';

const ProfileAbout = () => {
    const { authorInfo } = useAuthor();
    const { author, loading, error } = authorInfo;

    if (loading) {
        return (
            <div className='m-[2px] bg-white'>
                <div>
                    <div className='border-b border-gray-300 p-4'>
                        <div className='h-5 w-16 bg-gray-200 animate-pulse rounded mb-2' />
                        <div className='h-6 w-3/4 bg-gray-200 animate-pulse rounded' />
                    </div>
                    <div className='border-b border-gray-300 p-4'>
                        <div className='h-5 w-32 bg-gray-200 animate-pulse rounded mb-2' />
                        <div className='h-6 w-1/2 bg-gray-200 animate-pulse rounded' />
                    </div>
                    <div className='border-b border-gray-300 p-4'>
                        <div className='h-5 w-24 bg-gray-200 animate-pulse rounded mb-2' />
                        <div className='h-6 w-2/3 bg-gray-200 animate-pulse rounded' />
                    </div>
                    <div className='p-4'>
                        <div className='h-5 w-20 bg-gray-200 animate-pulse rounded mb-2' />
                        <div className='h-6 w-1/3 bg-gray-200 animate-pulse rounded' />
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className='m-[2px] bg-white'>
            <div className=''>
                <div className='border-b border-gray-300 p-4'>
                    <h2 className='text-gray-400'>Bio</h2>
                    <h1>{author?.bio}</h1>
                </div>
                <div className='border-b border-gray-300 p-4'>
                    <h2 className='text-gray-400'>Personal Website</h2>
                    <h1>{author?.website ? author?.website : "N/A"}</h1>
                </div>
                <div className='border-b border-gray-300 p-4'>
                    <h2 className='text-gray-400'>Experience</h2>
                    <h1>{author?.experience ? author?.experience : "N/A"}</h1>
                </div>
                <div className='p-4'>
                    <h2 className='text-gray-400'>Location</h2>
                    <h1>{author?.location ? author?.location : "N/A"}</h1>
                </div>
            </div>
        </div>
    );
};

export default ProfileAbout;