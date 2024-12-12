import React, { useEffect, useState } from 'react'
import { collection, getDocs, orderBy, query, where } from 'firebase/firestore';
import { db } from '../Services/Firebase';
export const useAuthor = () => {
    const dummyID = "GFPNB660GaVlJfnmbMdzFIjba4A3";
    const [authorInfo, setAuthorInfo] = useState({
        author: null,
        posts: [],
        videos: [],
        images: [],
        loading: true,
        error: null,
    });

    const fetchAuthorAndPosts = async () => {
        try {
            // Define queries
            const userQuery = query(
                collection(db, "userCollection"),
                where("docID", "==", dummyID)
            );

            const postQuery = query(
                collection(db, 'postCollection'),
                where("authorID", "==", dummyID)
            );

            // Fetch both queries concurrently
            const [userSnapshot, postSnapshot] = await Promise.all([
                getDocs(userQuery),
                getDocs(postQuery)
            ]);

            // Process author data
            const authorData = userSnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }))[0] || null; // Assuming a single author; adjust if multiple authors are possible

            // Process posts data
            const postsData = postSnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data()
            }));

            let videosData = []

            const videoCollectionRef = collection(db, "userCollection", authorData.id, "videoCollection");
            const v = query(videoCollectionRef, orderBy("createdAt", "desc"));
            const videoSnapshot = await getDocs(v);

            videosData = videoSnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));


            let imagesData = []

            const imageCollectionRef = collection(db, "userCollection", authorData.id, "imageCollection");
            const i = query(imageCollectionRef, orderBy("createdAt", "desc"));

            const imageSnapshot = await getDocs(i);

            imagesData = imageSnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));

            // Update state with combined data
            setAuthorInfo({
                author: authorData,
                posts: postsData,
                videos: videosData,
                images: imagesData,
                loading: false,
                error: null,
            });


        } catch (error) {
            console.error("Error fetching author and posts:", error);
            setAuthorInfo({
                author: null,
                posts: [],
                loading: false,
                error: error.message,
            });
        }
    };

    useEffect(() => {
        fetchAuthorAndPosts();
    }, [])
    return { authorInfo }
}

export default useAuthor