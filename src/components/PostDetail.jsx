import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../Services/Firebase';
import Post from '../Cards/Post';

const PostDetail = () => {
  const { postID } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const postDoc = await getDoc(doc(db, 'postCollection', postID));
        
        if (postDoc.exists()) {
          setPost({
            id: postDoc.id,
            ...postDoc.data()
          });
        } else {
          setError('Post not found');
        }
      } catch (err) {
        setError('Error loading post');
        console.error('Error fetching post:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [postID]);

  if (loading) {
    return <div className="flex justify-center items-center min-h-screen">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
    </div>;
  }

  if (error) {
    return <div className="flex justify-center items-center min-h-screen text-red-500">
      {error}
    </div>;
  }

  return (
    <div className="max-w-2xl mx-auto p-4">
      {post && (
        <Post
          postID={post.id}
          data={post.data}
          image={post.image}
          author={post.author}
          userDetails={post.userDetails}
          createdAt={post.createdAt}
          likesC={post.likes}
          postData={post}
          Aimage={post.Aimage}
          Aname={post.Aname}
        />
      )}
    </div>
  );
};

export default PostDetail;