import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { collection, query, where, getDocs } from 'firebase/firestore';
import MyWorkCard from '../../Cards/ProfileCards/MyWorkVideos';
import MyWorkPictures from '../../Cards/ProfileCards/MyWorkPictures';
import { db } from '../../Services/Firebase';

const ProfileMyWork = () => {
    const { id } = useParams();
    const [author, setAuthor] = useState(null);
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchData = async () => {
        try {
            const userQuery = query(
                collection(db, "userCollection"),
                where("docID", "==", id)
            );
            const userSnapshot = await getDocs(userQuery);
            const authorData = userSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))[0];
            
            if (!authorData) throw new Error("Author not found");
            setAuthor(authorData);

            const postQuery = query(
                collection(db, 'postCollection'),
                where("authorID", "==", id)
            );
            const postSnapshot = await getDocs(postQuery);
            const postsData = postSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setPosts(postsData);
        } catch (err) {
            setError(err.message);
            console.error("Error:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [id]);

    const videos = posts.filter(post => post.type === 'video');
    const images = posts.filter(post => post.type === 'image');
    const seperate = true;
    if (loading) {
        return (
            <>
                <div className="containerVideos pl-1 md:w-auto w-screen">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="bg-white rounded-lg shadow-sm">
                                <div className="h-48 bg-gray-200 animate-pulse rounded-t-lg" />
                                <div className="p-4">
                                    <div className="h-4 bg-gray-200 animate-pulse rounded w-3/4 mb-2" />
                                    <div className="h-4 bg-gray-200 animate-pulse rounded w-1/2" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="containerPictures pl-1 md:w-auto w-screen">
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
                        {[1, 2, 3, 4].map((i) => (
                            <div key={i} className="bg-gray-200 animate-pulse rounded-lg h-48" />
                        ))}
                    </div>
                </div>
            </>
        );
    }

    if (error) {
        return <div className="text-red-500 p-4">Error: {error}</div>;
    }

    return (
        <>
            <div className="containerVideos pl-1 md:w-auto w-screen">
                <MyWorkCard 
                    videos={videos} 
                    userId={id} 
                    fetchAuthorAndPosts={fetchData} 
                    seperate={seperate}
                />
            </div>
            <div className="containerPictures pl-1 md:w-auto w-screen">
                <MyWorkPictures 
                    pictures={images} 
                    fetchAuthorAndPosts={fetchData} 
                    userId={id} 
                    seperate={seperate}
                />
            </div>
        </>
    );
};

export default ProfileMyWork;