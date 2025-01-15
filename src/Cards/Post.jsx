import React, { useContext, useEffect, useState } from 'react';
import { HiOutlineDotsVertical } from "react-icons/hi";
import { FaHeart, FaRegComment } from "react-icons/fa6";
import { FaRegHeart } from "react-icons/fa6";
import { TbShare3 } from "react-icons/tb";
import UserDummy from './Like';
import MobileComments from './MobileComments';
import { PostData } from '../Context/PostContext';
import { addDoc, arrayRemove, arrayUnion, collection, doc, getDocs, query, serverTimestamp, updateDoc, where } from 'firebase/firestore';
import { db } from '../Services/Firebase';
import { ImSpinner2 } from 'react-icons/im';
import { useAuth } from '../Context/AuthContext';
import { useNavigate } from 'react-router-dom';
import SharePopup from './SharePopup';
// import Comments from './Comments';
const Post = ({ author, postID, data, image, activity, userDetails, createdAt, likesC, shareCount, postData, Aimage, Aname }) => {
    const { currentUser, userData, logout } = useAuth();
    const navigate = useNavigate();
    const handleProfile = (uid) => {
        navigate(`/userprofile/${uid}`);

    }
    const currentUserId = currentUser.uid;
    const [comments, setComments] = useState([]);
    const [Author, setAuthor] = useState([]);

    const [likeCount, setLikeCount] = useState(likesC?.length || 0);
    const [isLiked, setIsLiked] = useState(likesC?.includes(currentUserId) || false);
    const [newComment, setNewComment] = useState('');
    const [isCommentsOpen, setIsCommentsOpen] = useState(false);

    const [isLoading, setIsLoading] = useState(false);
    const [isLoadingPost, setIsLoadingPost] = useState(false);
    const [error, setError] = useState(null);

    const fetchComments = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const postDocRef = doc(db, 'postCollection', postID);
            const commentsRef = collection(postDocRef, 'commentsCollection');

            const querySnapshot = await getDocs(commentsRef);
            const fetchedComments = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));

            const userSnapshot = await getDocs(collection(db, 'userCollection'));
            const userDoc = userSnapshot.docs.find(doc => doc.id === currentUserId);

            setAuthor(userDoc ? userDoc.data() : null);

            const sortedComments = fetchedComments.sort((a, b) =>
                (b.createdAt?.seconds || 0) - (a.createdAt?.seconds || 0)
            );

            setComments(sortedComments);
        } catch (error) {
            console.error("Error fetching comments:", error);
            setError("Failed to load comments. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    const handlePostComment = async () => {
        const trimmedComment = newComment.trim();
        if (!trimmedComment) {
            setError("Comment cannot be empty");
            return;
        }

        setIsLoadingPost(true);
        setError(null);

        try {
            const postDocRef = doc(db, 'postCollection', postID);
            const commentRef = collection(postDocRef, 'commentsCollection');


            await addDoc(commentRef, {
                comment: trimmedComment,
                userID: currentUserId,
                userName: Author?.firstName || 'Anonymous',
                userImage: Author?.image || '',
                createdAt: serverTimestamp(),
                isDisabled: false
            });
            setNewComment('');
            await fetchComments();
        } catch (error) {
            console.error("Error posting comment:", error);
            setError("Failed to post comment. Please try again.");
        } finally {
            setIsLoadingPost(false);
        }
    };

    useEffect(() => {
        if (isCommentsOpen) {
            fetchComments();
        }
    }, [isCommentsOpen, postID]);

    const formattedDate = createdAt?.toDate().toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
    });
    const [showShare, setShowShare] = useState(false);
    const getPostUrl = () => {
        // Get the base URL of your website
        const baseUrl = window.location.origin;
        // Create the full post URL using postID
        return `${baseUrl}/post/${postID}`;
      };
    
    const handleLike = async () => {
        try {
            const postRef = doc(db, 'postCollection', postID);

            if (isLiked) {
                await updateDoc(postRef, {
                    likes: arrayRemove(currentUserId)
                });
                setLikeCount(prev => prev - 1);
                setIsLiked(false);
            } else {
                await updateDoc(postRef, {
                    likes: arrayUnion(currentUserId)
                });
                setLikeCount(prev => prev + 1);
                setIsLiked(true);
            }
        } catch (error) {
            console.error("Error updating likes:", error);
        }
    };

    const [likes, setlikes] = useState(false);
    const handleLikes = () => {
        setlikes(!likes)
    }
    const handleComments = () => {
        setIsCommentsOpen(!isCommentsOpen)
    }
    const [mobileComments, setMobileComments] = useState(false);
    const handleMobileComments = () => {
        setMobileComments(!mobileComments)
    }
    const handleClick = () => {
        if (window.innerWidth < 640) {
            handleMobileComments();
        } else {
            handleComments();
        }
    };
    const closeLikes = () => {
        setlikes(false);
    }

    const closeComments = () => {
        setComments(false);
    }



    return (
        <div>

            <>

                <div className="main bg-white ">
                    <div className='flex p-3'>
                        <div className='flex justify-between'>
                            <div className='flex gap-2 items-center'>
                                <div className='flex-shrink-0'>
                                    {
                                        activity ? (<img
                                            onClick={() => {
                                                handleProfile(author?.docID)
                                            }} src={author?.image} className='rounded-full cursor-pointer min-w-12  h-12 max-w-12 object-cover' alt="" />) : (
                                            <img onClick={() => {
                                                handleProfile(userDetails?.docID)
                                            }} src={userDetails?.image} className='rounded-full cursor-pointer min-w-12  h-12 object-cover max-w-12' alt="" />

                                        )
                                    }
                                </div>
                                <div className=''>
                                    {
                                        activity ? (
                                            <h1 onClick={() => {
                                                handleProfile(userDetails?.docID)
                                            }} className='font-semibold cursor-pointer'>{author?.firstName}</h1>

                                        ) : (
                                            <h1 onClick={() => {
                                                handleProfile(userDetails?.docID)
                                            }} className='font-semibold cursor-pointer'>{userDetails?.firstName}</h1>

                                        )
                                    }
                                    <h2 className={`text-gray-400 text-nowrap ${activity && 'md:text-base text-xs'}`}>{formattedDate}</h2>
                                </div>
                            </div>
                        </div>
                        {/* <div className='flex font-bold text-2xl w-full justify-end'>
                            <div className='flex px-3 bg-white cursor-pointer rounded-full justify-center items-center'>
                                <HiOutlineDotsVertical className='text-lg' />
                            </div>
                        </div> */}
                    </div>
                    <div className='p-3'>
                        <h2>{data}</h2>
                        {/* <h2 className='font-semibold space-x-3 text-[#227BCD]'>#Tags</h2> */}
                    </div>

                    <div className='bg-gray-100'>
                        {image ? (
                            <img
                                className="object-contain min-w-full max-h-[500px]"
                                src={image}
                                alt="Image"
                            />
                        ) : (
                            '')}
                    </div>
                    <div className='p-3 mt-4 items-center flex gap-5'>
                        <div className='flex gap-1'>
                            {isLiked ? (
                                <FaHeart
                                    onClick={handleLike}
                                    className='text-2xl cursor-pointer text-red-500'
                                />
                            ) : (
                                <FaRegHeart
                                    onClick={handleLike}
                                    className='text-2xl cursor-pointer text-[#227BCD]'
                                />
                            )}
                            <h1
                                onClick={() => setlikes(true)}
                                className='cursor-pointer'
                            >
                                {likeCount}
                            </h1>
                        </div>
                        <div className='flex gap-1'>
                            <FaRegComment onClick={handleClick}
                                className='text-2xl cursor-pointer text-[#227BCD]' />
                        </div>
                        <div
                            onClick={() => setShowShare(true)}
                            className='flex gap-1'>
                            <TbShare3 className='text-2xl cursor-pointer text-[#227BCD]' />
                        </div>
                    </div>
                </div>
            </>

            {showShare && (
                <SharePopup
                    url={getPostUrl()}
                    onClose={() => setShowShare(false)}
                />
            )}

            {likes && (
                <div className='inset-0 bg-black bg-opacity-65 fixed z-30 flex justify-center items-center'>
                    <div className='z-40'>
                        <dialog id="my_modal_3" className="modal " open>
                            <div className="modal-box p-0">
                                <form method="dialog">
                                    <button onClick={() => setlikes(false)} className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                                </form>
                                <div className='border-b px-6 pt-6 border-gray-300'>
                                    <h3 className="font-bold mb-4 text-lg">Post Likes({likeCount})</h3>
                                </div>
                                <UserDummy postID={postID} />
                            </div>
                        </dialog>
                    </div>
                </div>
            )}



            {/* {
            comments && (
                <div className='inset-0 bg-black bg-opacity-65 fixed z-30 flex justify-center items-center'>
                    <dialog id="my_modal_3" className="modal z-40" open>
                        <div
                            className="modal-box h-full 2xl:max-h-[80vh]"
                            style={{
                                boxSizing: "border-box",
                                padding: '0',
                                maxwidth: '80vw',
                                maxWidth: '850px',
                            }}
                        >
                            <form method="dialog">
                                <button onClick={() => setComments(false)} className="btn btn-sm btn-circle z-30 btn-ghost absolute right-2 top-2">✕</button>
                            </form>


                            <div className='flex'>
                                <div className="left hidden md:block fixed top-0 left-0 w-[60%] h-full overflow-y-auto 2xl:overflow-hidden bg-gray-100">
                                    <div className='flex justify-between'>
                                        <div className='flex p-4 gap-2'>
                                            <img className='rounded-full w-16 h-16' src={postData?.userDetails?.image} alt="User Image" />
                                            <div className='flex flex-col justify-center'>
                                                <h2 className='font-bold text-xl'>{postData?.userDetails?.firstName}</h2>
                                                <p className='text-gray-400'>{formattedDate}</p>
                                            </div>
                                        </div>
                                        <div className='flex w-10 h-10 m-4 px-3 border cursor-pointer rounded-full justify-center items-center'>
                                            <HiOutlineDotsVertical className='text-lg' />
                                        </div>
                                    </div>
                                    <div className='p-3'>
                                        <h2 className='text-wrap break-words'>{postData?.data}</h2>
                                    </div>

                                    <div>
                                        {!image ? (
                                            ''
                                        ) : (
                                            <img src={image} className='w-full h-[350px] object-cover' alt="Post Image" />

                                        )}
                                    </div>
                                    <div className='p-3 mt-4 items-center flex gap-5'>
                                        <div className='flex gap-1'>
                                            {isLiked ? (
                                                <FaHeart
                                                    onClick={handleLike}
                                                    className='text-2xl cursor-pointer text-red-500'
                                                />
                                            ) : (
                                                <FaRegHeart
                                                    onClick={handleLike}
                                                    className='text-2xl cursor-pointer text-[#227BCD]'
                                                />
                                            )}
                                            <h1
                                                onClick={() => setlikes(true)}
                                                className='cursor-pointer'
                                            >
                                                {likeCount}
                                            </h1>
                                        </div>
                                        <div className='flex gap-1'>
                                            <FaRegComment onClick={handleClick}
                                                className='text-2xl cursor-pointer text-[#227BCD]' />
                                        </div>
                                        <div className='flex gap-1'>
                                            <TbShare3 className='text-2xl cursor-pointer text-[#227BCD]' />
                                        </div>
                                    </div>
                                </div>

                                <div className='right md:fixed top-0 right-0 md:w-[40%] h-full overflow-y-auto bg-white md:p-4'>
                                    <div className='md:px-0 md:py-0 px-3 py-2 border-b border-gray-400'>
                                        <h3 className="font-bold p-4 text-lg">Post Comments ({commentsData.length})</h3>
                                    </div>
                                    <div className='flex md:p-0 p-4 flex-col'>
                                        <div className='flex-1 md:p-2'>
                                            {commentsData.map((data, index) => (
                                                <div key={index} className='mb-4'>
                                                    <div className='flex items-center font-bold gap-2'>
                                                        <img src={data.userimage} className='w-10 h-10 rounded-full' alt="" />
                                                        <h1 className='text-sm'>{data.username}</h1>
                                                    </div>
                                                    <div>
                                                        <p className='bg-[#B7B8B954] py-1 px-2 my-2 rounded-tr-xl rounded-br-xl rounded-bl-xl'>
                                                            {data.comment}
                                                        </p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                        <div className='flex gap-2 mb-4 p-2 justify-center items-center'>
                                            <input className='bg-[#1C1C1C14] w-[70%] p-2 rounded-2xl' type="text" placeholder='Add a comment...' />
                                            <button className='md:bg-[#A5A5A5] bg-black rounded-3xl p-2 text-white font-bold text-nowrap'>
                                                Post Now
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </dialog>
                </div>
            )} */}

            {isCommentsOpen && (
                <div className='inset-0 bg-black bg-opacity-65 fixed z-30 flex justify-center items-center'>
                    <dialog id="my_modal_3" className="modal z-40" open>
                        <div className="modal-box h-full 2xl:max-h-[80vh]" style={{
                            boxSizing: "border-box",
                            padding: '0',
                            maxWidth: '850px',
                        }}>
                            <form method="dialog">
                                <button
                                    onClick={() => setIsCommentsOpen(false)}
                                    className="btn btn-sm btn-circle z-30 btn-ghost absolute right-2 bg-gray-100 top-2"
                                >
                                    ✕
                                </button>
                            </form>
                            <div className="left hidden md:block fixed top-0 left-0 w-[60%] h-full overflow-y-auto 2xl:overflow-hidden bg-white">
                                <div className='flex justify-between'>
                                    <div className='flex p-4 gap-2'>
                                        <img className='rounded-full w-16 h-16' src={postData?.userDetails?.image ? postData?.userDetails?.image : Aimage} alt="User Image" />
                                        <div className='flex flex-col justify-center'>
                                            <h2 className='font-bold text-xl'>{postData?.userDetails?.firstName ? postData?.userDetails?.firstName : Aname}</h2>
                                            <p className='text-gray-400'>{formattedDate}</p>
                                        </div>
                                    </div>
                                    {/* <div className='flex w-10 h-10 m-4 px-3 border cursor-pointer rounded-full justify-center items-center'>
                                        <HiOutlineDotsVertical className='text-lg' />
                                    </div> */}
                                </div>
                                <div className='p-3'>
                                    <h2 className='text-wrap break-words'>{postData?.data}</h2>
                                </div>

                                <div>
                                    {!image ? (
                                        ''
                                    ) : (
                                        <img src={image} className='w-full h-[350px] object-cover' alt="Post Image" />

                                    )}
                                </div>
                                <div className='p-3 mt-4 items-center flex gap-5'>
                                    <div className='flex gap-1'>
                                        {isLiked ? (
                                            <FaHeart
                                                onClick={handleLike}
                                                className='text-2xl cursor-pointer text-red-500'
                                            />
                                        ) : (
                                            <FaRegHeart
                                                onClick={handleLike}
                                                className='text-2xl cursor-pointer text-[#227BCD]'
                                            />
                                        )}
                                        <h1
                                            onClick={() => setlikes(true)}
                                            className='cursor-pointer'
                                        >
                                            {likeCount}
                                        </h1>
                                    </div>
                                    <div className='flex gap-1'>
                                        <FaRegComment onClick={handleClick}
                                            className='text-2xl cursor-pointer text-[#227BCD]' />
                                    </div>
                                    <div onClick={() => setShowShare(true)} className='flex gap-1'>
                                        <TbShare3 className='text-2xl cursor-pointer text-[#227BCD]' />
                                    </div>
                                </div>
                            </div>

                            {/* Comments section */}
                            <div className='right md:fixed top-0 right-0 md:w-[40%] h-full overflow-y-auto bg-white overflow-hidden'>
                                <div className='md:px-0 md:py-0 px-3 py-2 border-b border-gray-400'>
                                    <h3 className="font-bold p-4 text-lg">
                                        Post Comments ({comments.length})
                                    </h3>
                                </div>


                                {error && (
                                    <div className="alert alert-error m-2">
                                        <span>{error}</span>
                                    </div>
                                )}

                                {/* {isLoading && (
                                    <div className="flex justify-center items-center p-4">
                                        <span className="loading loading-spinner loading-md"></span>
                                    </div>
                                )} */}

                                {/* Comments list */}
                                <div className='flex md:p-0 p-4 flex-col'>
                                    <div className='flex-1 md:p-2'>
                                        {comments.map((commentData) => (
                                            <div key={commentData.id} className='mb-4'>
                                                <div className='flex items-center font-bold gap-2'>
                                                    <img
                                                        src={commentData.userImage || '/default-avatar.png'}
                                                        className='w-10 h-10 rounded-full object-cover'
                                                        alt={commentData.userName}
                                                    />
                                                    <h1 className='text-sm'>{commentData.userName}</h1>
                                                </div>
                                                <div>
                                                    <p className='bg-[#B7B8B954] py-1 px-2 my-2 rounded-tr-xl rounded-br-xl rounded-bl-xl'>
                                                        {commentData.comment}
                                                    </p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Comment input */}
                                    <div className='flex gap-2 mb-4 p-2 justify-center items-center'>
                                        <input
                                            className='bg-[#1C1C1C14] w-[70%] p-2 rounded-2xl'
                                            type="text"
                                            placeholder='Add a comment...'
                                            value={newComment}
                                            onChange={(e) => {
                                                setNewComment(e.target.value);
                                                setError(null);
                                            }}
                                            disabled={isLoading}
                                        />
                                        <button
                                            className={`rounded-3xl p-2 text-white font-bold text-nowrap ${isLoading || !newComment.trim() || !comments ? 'bg-gray-700' : 'bg-black'
                                                }`}
                                            onClick={handlePostComment}
                                            disabled={isLoading || !newComment.trim() || !comments}
                                        >
                                            {isLoadingPost ? (
                                                <div className='flex justify-center items-center gap-1'>
                                                    <ImSpinner2 className='animate-spin' />
                                                    Posting...
                                                </div>
                                            ) : 'Post Now'}
                                        </button>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </dialog>
                </div>
            )}

            {/* Mobile Comments */}
            {mobileComments && (
                <MobileComments
                    isLoading={isLoading}
                    isLoadingPost={isLoadingPost}
                    setNewComment={setNewComment}
                    newComment={newComment}
                    comments={comments}
                    handlePostComment={handlePostComment}
                    mobileComments={mobileComments}
                    setMobileComments={setMobileComments}
                    error={error}
                    setError={setError}
                    fetchComments={fetchComments} // Add this
                    Author={Author} // Add this
                />
            )}

        </div>
    );
};

export default Post;
