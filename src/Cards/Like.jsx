import React, { useContext, useEffect, useState } from 'react';
import { PostData } from '../Context/PostContext';
import Load from '../components/Loader/Load';

const UserDummy = ({ postID }) => {
    const { fetchUsersWhoLikedPost, posts } = useContext(PostData);
    const [likedUsers, setLikedUsers] = useState([]);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        const fetchLikedUsers = async () => {
            setLoading(true);
            const post = posts.find((p) => p.postID === postID);

            console.log("Post Likes: ", post?.likes);

            if (post?.likes && post.likes.length > 0) {
                const users = await fetchUsersWhoLikedPost(post.likes);
                console.log("Users who liked this post: ", users);
                setLikedUsers(users);
            } else {
                setLikedUsers([]);
            }

            setLoading(false);
        };

        fetchLikedUsers();
    }, [postID, posts, fetchUsersWhoLikedPost]);

    if (loading) {
        return <p className="text-center h-32 flex justify-center items-center"><Load/></p>;
    }

    if (likedUsers.length === 0) {
        return <h1 className="text-center">No users liked this post.</h1>;
    }

    return (
        <div className="px-6">
            {likedUsers.map((user, index) => (
                <div key={index} className="flex mt-4 justify-start items-center mb-4">
                    <div>
                        <img 
                            src={user.image} 
                            alt={user.name || 'User'} 
                            className="min-w-12 h-12 object-fill rounded-full" 
                        />
                    </div>
                    <div className="flex flex-col ml-4">
                        <h2 className="text-lg font-semibold">{user.firstName}</h2>
                        <p className="text-sm text-gray-600">{user.bio}</p>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default UserDummy;
