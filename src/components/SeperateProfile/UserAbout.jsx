import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../Services/Firebase';

const ProfileAbout = () => {
    const { id } = useParams();
    const [author, setAuthor] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchAuthor = async () => {
            try {
                const docRef = doc(db, 'userCollection', id);
                const docSnap = await getDoc(docRef);
                
                if (docSnap.exists()) {
                    setAuthor(docSnap.data());
                } else {
                    setError('User not found');
                }
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchAuthor();
    }, [id]);

    if (loading) {
        return (
            <div className="m-[2px] bg-white">
                <div>
                    <div className="border-b border-gray-300 p-4">
                        <div className="h-5 w-16 bg-gray-200 animate-pulse rounded mb-2" />
                        <div className="h-6 w-3/4 bg-gray-200 animate-pulse rounded" />
                    </div>
                    <div className="border-b border-gray-300 p-4">
                        <div className="h-5 w-32 bg-gray-200 animate-pulse rounded mb-2" />
                        <div className="h-6 w-1/2 bg-gray-200 animate-pulse rounded" />
                    </div>
                    <div className="border-b border-gray-300 p-4">
                        <div className="h-5 w-24 bg-gray-200 animate-pulse rounded mb-2" />
                        <div className="h-6 w-2/3 bg-gray-200 animate-pulse rounded" />
                    </div>
                    <div className="p-4">
                        <div className="h-5 w-20 bg-gray-200 animate-pulse rounded mb-2" />
                        <div className="h-6 w-1/3 bg-gray-200 animate-pulse rounded" />
                    </div>
                </div>
            </div>
        );
    }

    if (error) {
        return <div className="m-2 p-4 text-red-500">Error: {error}</div>;
    }

    return (
        <div className="m-[2px] bg-white">
            <div>
                <div className="border-b border-gray-300 p-4">
                    <h2 className="text-gray-400">Bio</h2>
                    <h1>{author?.bio}</h1>
                </div>
                <div className="border-b border-gray-300 p-4">
                    <h2 className="text-gray-400">Personal Website</h2>
                    <h1>{author?.website || "N/A"}</h1>
                </div>
                <div className="border-b border-gray-300 p-4">
                    <h2 className="text-gray-400">Experience</h2>
                    <h1>{author?.experience || "N/A"}</h1>
                </div>
                <div className="p-4">
                    <h2 className="text-gray-400">Location</h2>
                    <h1>{author?.location || "N/A"}</h1>
                </div>
            </div>
        </div>
    );
};

export default ProfileAbout;