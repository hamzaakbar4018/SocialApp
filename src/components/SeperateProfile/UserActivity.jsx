// UserActivity.js (Assuming ProfileActivity is renamed to UserActivity)
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Post from '../../Cards/Post';
import Load from '../Loader/Load';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../../Services/Firebase';
import NoDataFound from '../Loader/NoData';

const UserActivity = () => {
  const { id } = useParams();
  const [author, setAuthor] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const activity = true; // Assuming this is a flag used in the Post component

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch author data
        const userQuery = query(
          collection(db, "userCollection"),
          where("docID", "==", id)
        );
        const userSnapshot = await getDocs(userQuery);
        const authorData = userSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))[0] || null;
        if (!authorData) {
          throw new Error("Author not found");
        }
        setAuthor(authorData);

        // Fetch posts data
        const postQuery = query(
          collection(db, 'postCollection'),
          where("authorID", "==", id)
        );
        const postSnapshot = await getDocs(postQuery);
        const postsData = postSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setPosts(postsData);

        setLoading(false);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) {
    return <Load />;
  }

  if (error) {
    return <div className='font-bold m-2 text-red-500'>Error: {error}</div>;
  }

  if (posts.length === 0) {
    return <NoDataFound/>
  }

  return (
    <div className='flex flex-col gap-2 p-[2px]'>
      {posts.map((data) => (
        <Post
          key={data.id}
          author={author}
          Aimage={author?.image} Aname={author?.firstName}
          postID={data.id}
          activity={activity}
          {...data}
          likesC={data.likes}
        />
      ))}
    </div>
  );
};

export default UserActivity;
