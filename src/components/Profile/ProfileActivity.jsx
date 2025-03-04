import React from 'react'
import postpic from '../../assets/Icons SVG/postpic.png';
import Post from '../../Cards/Post'
import useAuthor from '../../Hooks/useAuthor';
import Load from '../Loader/Load';

const activity = true;
const ProfileActivity = () => {
    const {authorInfo} = useAuthor();
    const { author, posts, loading, error } = authorInfo;
    console.log(author);

    if (loading) {
        return <Load />;
    }

    if (posts.length === 0) {
        return <h1 className='font-bold m-2'>No Post found :</h1>;
    }
    return (
        <div className='flex flex-col gap-2 p-[2px]'>
            {posts.map((data) => (
                <Post key={data.id} author={author} Aimage={author?.image} Aname={author?.firstName} postID={data.id} activity={activity} {...data} likesC={data.likes}  />
            ))}
        </div>
    )
}

export default ProfileActivity