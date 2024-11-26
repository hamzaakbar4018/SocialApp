import { collection, doc, getDocs, getDoc } from "firebase/firestore";
import React, { createContext, useEffect, useState } from "react";
import { db } from "../Services/Firebase";

export const PostData = createContext();

const PostContext = ({ children }) => {
  const [posts, setPosts] = useState([]); // To store posts with user details

  const fetchPostsAndUsers = async () => {
    try {
      // Fetch all posts from the postCollection
      const postSnapshot = await getDocs(collection(db, "postCollection"));
      const postList = postSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      // Fetch user details for each post
      const fetchUserPromises = postSnapshot.docs.map(async (postDoc) => {
        const postData = postDoc.data();
        const postWithUser = { ...postData, postID: postDoc.id }; // Add postID to the post object

        if (postData.authorID) {
          try {
            const userRef = doc(db, "userCollection", postData.authorID);
            const userSnap = await getDoc(userRef);

            if (userSnap.exists()) {
              postWithUser.userDetails = userSnap.data(); // Attach user details
            } else {
              postWithUser.userDetails = null; // If user is not found
            }
          } catch (error) {
            console.error(`Error fetching user with ID ${postData.authorID}:`, error);
            postWithUser.userDetails = null;
          }
        } else {
          postWithUser.userDetails = null; // No authorID in the post
        }

        return postWithUser; // Return the post with user details
      });

      const allPostsWithUsers = await Promise.all(fetchUserPromises);
      setPosts(allPostsWithUsers);
    } catch (error) {
      console.error("Error fetching posts and user details:", error);
    }
  };

  const fetchUsersWhoLikedPost = async (likesArray) => {
    try {
      if (!likesArray || likesArray.length === 0) {
        return [];
      }

      const usersRef = collection(db, "userCollection");
      const userQuery = await Promise.all(
        likesArray.map(async (userID) => {
          const userDoc = doc(usersRef, userID);
          const userSnapshot = await getDoc(userDoc);

          if (userSnapshot.exists()) {
            console.log("User found: ", userSnapshot.id, userSnapshot.data());
            return { id: userSnapshot.id, ...userSnapshot.data() };
          } else {
            console.warn(`User with ID ${userID} not found.`);
            return null;
          }
        })
      );

      return userQuery.filter((user) => user !== null); // Remove null values
    } catch (error) {
      console.error("Error fetching users who liked the post:", error);
      return [];
    }
  };

  useEffect(() => {
    fetchPostsAndUsers();
  }, []);

  return (
    <PostData.Provider value={{ posts, fetchUsersWhoLikedPost }}>
      {children}
    </PostData.Provider>
  );
};

export default PostContext;
