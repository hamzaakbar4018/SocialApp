import { collection, doc, getDocs, getDoc } from "firebase/firestore";
import React, { createContext, useEffect, useState } from "react";
import { db } from "../Services/Firebase";

export const PostData = createContext();

const PostContext = ({ children }) => {
  const [posts, setPosts] = useState([]); // To store posts with user details
  const [users, setUsers] = useState([]); // To store all user data if needed

  const fetchPostsAndUsers = async () => {
    try {
      // Fetch all posts from the postCollection
      const postSnapshot = await getDocs(collection(db, "postCollection"));
      const postList = postSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      // Use Promise.all to fetch user details for each post asynchronously
      const fetchUserPromises = postSnapshot.docs.map(async (postDoc) => {
        const postData = postDoc.data();
        const postWithUser = { ...postData, postID: postDoc.id }; // Add postID to the post object

        if (postData.authorID) {
          try {
            // Fetch the corresponding user using the authorID
            const userRef = doc(db, "userCollection", postData.authorID);
            const userSnap = await getDoc(userRef);

            if (userSnap.exists()) {
              postWithUser.userDetails = userSnap.data(); // Attach user details
            } else {
              postWithUser.userDetails = null; // If user is not found
            }
          } catch (error) {
            console.error(`Error fetching user with ID ${postData.authorID}:`, error);
            postWithUser.userDetails = null; // Handle error gracefully
          }
        } else {
          postWithUser.userDetails = null; // No authorID in the post
        }

        return postWithUser; // Return the post with user details
      });

      // Wait for all user details to be fetched and set the combined data
      const allPostsWithUsers = await Promise.all(fetchUserPromises);
      setPosts(allPostsWithUsers);

      console.log("Posts with User Details:", allPostsWithUsers);
    } catch (error) {
      console.error("Error fetching posts and user details:", error);
    }
  };

  useEffect(() => {
    fetchPostsAndUsers();
  }, []);

  return (
    <PostData.Provider value={{ posts, users }}>
      {children}
    </PostData.Provider>
  );
};

export default PostContext;
