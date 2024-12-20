import React from 'react'
import postpic from '../../assets/Icons SVG/postpic.png';
import Post from '../../Cards/Post'
import useAuthor from '../../Hooks/useAuthor';
import Loader from '../Loader/Loader';

const activity = true;
const ProfileActivity = () => {
    const {authorInfo} = useAuthor();
    const { author, posts, loading, error } = authorInfo;


    if (loading) {
        return <Loader />;
    }

    if (posts.length === 0) {
        return <h1 className='font-bold m-2'>No Post found :</h1>;
    }
    return (
        <div className='flex flex-col gap-2 p-[2px]'>
            {posts.map((data) => (
                <Post key={data.id} author={author} postId={data.id} activity={activity} {...data} likesC={data.likes} />
            ))}
        </div>
    )
}

export default ProfileActivity