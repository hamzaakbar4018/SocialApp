import React, { useContext, useEffect, useRef, useState } from 'react';
import searchi from '../../assets/Icons SVG/Search.svg'
import Notifications from '../../assets/Icons SVG/Notifications.svg'
import Arrow from '../../assets/Icons SVG/Arrow.svg'
import Rightbar from '../Rightbar';
import photoadmin from '../../assets/Icons SVG/photoadmin.svg';
import textadmin from '../../assets/Icons SVG/textadmin.svg';
import tag from '../../assets/Icons SVG/Tag.svg';
import Post from '../../Cards/Post';
import '../../CSS/Connections.css';
import { IoIosSearch } from "react-icons/io";
import { IoMdArrowBack } from "react-icons/io";
import postpic from '../../assets/Icons SVG/postpic.png';
import Sidebar from '../Sidebar.jsx'
import { FiMenu } from 'react-icons/fi';
import { NotificatinData } from '../../Context/NotificatinContext.jsx';
import { format } from 'date-fns';
import { PostData } from '../../Context/PostContext.jsx';
import Loader from '../Loader/Loader.jsx';
import { app, db } from '../../Services/Firebase.jsx'
import { getDownloadURL, getStorage, uploadBytes } from 'firebase/storage';
import { ref } from 'firebase/storage';
import { addDoc, collection, deleteDoc, doc, getDocs, query, where } from 'firebase/firestore';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from '../../Context/AuthContext.jsx';
import SearchBar from '../SearchBar.jsx';
import NoData from '../Loader/NoData.jsx'
const Main = () => {
    const { currentUser, userData, logout } = useAuth();
    const dummyID = currentUser.uid;
    const [author, setAuthor] = useState('');
    const [postLoading, setPostLoading] = useState(false);
    const [loading, setloading] = useState(false);
    const fetchAuthor = async () => {
        try {
            setloading(true);
            const userQuery = query(
                collection(db, "userCollection"),
                where("docID", "==", dummyID)
            );
            const querySnapShot = await getDocs(userQuery);
            const data = querySnapShot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setAuthor(data);
            setloading(false);
        } catch (error) {
            console.log("Author Error", error);
        } finally {
            setloading(false);
        }
    }
    useEffect(() => {
        fetchAuthor();
    }, [])

    const postRef = useRef();

    const handlePostRef = () => {
        postRef.current.click();
    }
    const [uploading, setUploading] = useState(false);
    const [PostImage, setPostImage] = useState(null);
    const handleImageChange = async (e) => {
        const image = e.target.files[0];
        if (image) {
            try {
                setUploading(true);
                const storage = getStorage(app);
                const storageRef = ref(storage, `YooTooArt/userModule/${image.name}`);
                await uploadBytes(storageRef, image);
                const downloadedURL = await getDownloadURL(storageRef);
                setPostImage(downloadedURL);
            } catch (error) {
                console.error("Error while uploading image to Firestore:", error);
            } finally {
                setUploading(false);
            }
        }
    };



    const [thoughts, setThoughts] = useState('');
    const handlePosts = async (authorID) => {
        try {
            setPostLoading(true);
            console.log("Attempting to create post with authorID:", authorID);

            if (!authorID) {
                console.error("Missing Data:");
                return;
            }

            const postsCollectionRef = collection(db, 'postCollection');

            const newPost = {
                authorID: authorID,
                createdAt: new Date(),
                data: thoughts,
                image: PostImage || "",
                isDisabled: postData.isDisabled || false,
                tags: postData.tags || [],
                likes: postData.likes || [],
                shareCount: postData.shareCount || 0,
            };

            const docRef = await addDoc(postsCollectionRef, newPost);
            console.log('Post created successfully with ID: ', docRef.id);
            console.log(newPost);
            setPostModel(false);
            toast.success("Post uploaded successfully!");
            // window.location.reload();
            setPostModel(false);
            setTextModel(false);
            fetchPostsAndUsers();
            setPostLoading(false);
        } catch (error) {
            console.error('Error creating post: ', error);
            toast.error("Error uploading post. Please try again."); // Log any errors
        } finally {
            setPostLoading(false);
        }
    };
    const { notifyData } = useContext(NotificatinData);
    console.log("notifyData", notifyData)
    const postData = useContext(PostData) || [];
    const { fetchPostsAndUsers, fetchUsersWhoLikedPost } = postData;

    const [popup, setpopup] = useState(false);
    const handlePopup = () => {
        setpopup(!popup)
    }
    const [showSidebar, setShowSidebar] = useState(false);
    const handleSidebarToggle = () => {
        setShowSidebar(!showSidebar);
    };
    const [showRightbar, setShowRightbar] = useState(false);
    const [postModel, setPostModel] = useState(false);
    const [textModel, setTextModel] = useState(false);
    const [tagPeople, setTagPeople] = useState(false);
    const [search, setSearch] = useState(false);

    const searchRef = useRef(null);
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (searchRef.current && !searchRef.current.contains(event.target)) {
                setSearch(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [searchRef]);

    const handleTagPeople = () => {
        setTagPeople(!tagPeople);
        setPostModel(false);
    }
    const handleBar = () => {
        setShowRightbar(!showRightbar);
    };

    const handlePostModel = () => {
        setPostModel(!postModel);
        setTagPeople(false);
    };

    const handleTextModel = () => {
        setTextModel(!textModel);
    }

    const admin = [
        {
            image: "https://randomuser.me/api/portraits/men/1.jpg",
            username: "michael_scott",
            description: "Actor"
        }
    ];


    const postingData = [
        {
            "userimage": "https://randomuser.me/api/portraits/men/1.jpg",
            "username": "Hamza",
            "title": "Creating Post"
        }
    ]



    const handleSearch = () => {
        // console.log("Search button clicked");
        setSearch(!search);
    }



    return (
        <div className='flex'>
            <div className='flex-grow p-[2px] bg-gray-100'>
                <div className='flex px-0 bg-white justify-between items-center border-b py-4'>

                    {
                        loading ? (<header className="flex items-center justify-between p-4 animate-pulse">
                            <h1 className="flex items-center gap-2">
                                <span className="md:hidden block">
                                    <div className="w-12 h-12 bg-gray-300 rounded"></div>
                                </span>
                                <div className="w-24 h-6 bg-gray-300 rounded"></div>
                            </h1>

                        </header>) : (<h1 onClick={handleSidebarToggle} className={`${search ? 'hidden' : 'text-xl text-nowrap font-bold items-center p-3 flex gap-2'}`}> <span className='md:hidden block'><FiMenu className='text-3xl' /></span>{author && author[0] && author[0].firstName ? `Hi ${author[0].firstName}!` : "Hi there!"}</h1>)
                    }



                    {showSidebar && (
                        <dialog id="my_modal_3" className="modal" open>
                            <div className="w-full h-full ">
                                <form method="dialog">
                                    <button className="btn btn-sm btn-circle btn-ghost absolute right-5 top-5 border-gray-300">✕</button>
                                </form>
                                <Sidebar />
                            </div>
                        </dialog>
                    )}
                    {search && (
                        <div className='fixed inset-0 top-0 left-0 w-full h-full bg-black opacity-50 z-10'></div>
                    )}
                    <div className={`flex ${search && 'm-3'} justify-end gap-2 md:gap-5 items-center w-full z-20`}>
                        {/* <div
                            ref={searchRef}
                            className={`relative flex border-gray-300 border justify-end items-center md:bg-[#F5F5F5] rounded-3xl px-3 md:py-2 py-3 space-x-2 transition-all duration-300 ease-in-out ${search ? 'w-full rounded-xl bg-[#F5F5F5]' : 'md:w-[300px]'}`}
                        >
                            <img onClick={handleSearch} src={searchi} className='w-5 h-5 md:w-6 md:h-6 cursor-pointer' alt="Search" />

                            <input
                                onClick={handleSearch}
                                type="search"
                                placeholder='Search'
                                className={`outline-none flex bg-transparent rounded px-2 py-1 w-full transition-all duration-300 ease-in-out ${search ? 'block' : 'hidden md:flex'}`}
                            />

                            {search && (
                                <img src={Arrow} onClick={handleSearch} className='w-9 p-1 h-9 bg-black rounded-full cursor-pointer' />
                            )}

                            {search && (
                                <div className='bg-white absolute md:right-2 right-0 top-full mt-3 w-full md:w-[98%] rounded-lg p-4'>
                                    <div className="recent flex items-center justify-between mx-1">
                                        <div>
                                            <h2 className='text-gray-400 text-sm'>Recent</h2>
                                        </div>
                                        <div>
                                            <button className='text-[#399AF3] text-sm'>Clear all</button>
                                        </div>
                                    </div>
                                    <div className="users flex justify-between items-center m-1">
                                        <h1>Hamza Akbar</h1>
                                        <h1 className='cursor-pointer'>✕</h1>
                                    </div>
                                </div>
                            )}
                        </div> */}
                        <SearchBar search={search} setSearch={setSearch} />
                        <div
                            onClick={() => {
                                if (window.innerWidth <= 640) {
                                    handlePopup();
                                } else {
                                    handleBar();
                                }
                            }}
                            className={`${search ? 'hidden' : 'rounded-full cursor-pointer p-3 mr-4 border border-gray-300'}`}
                        >
                            <img src={Notifications} alt="Notifications" />
                        </div>
                        {
                            popup && (
                                <div className='bg-black bg-opacity-50 inset-0 fixed top-0'>
                                    <dialog className="modal" open>
                                        <div className="bg-white h-screen w-full p-0">
                                            <button
                                                className="btn btn-sm btn-circle btn-ghost absolute right-4 top-5 border border-gray-300"
                                                onClick={handlePopup}
                                            >
                                                ✕
                                            </button>
                                            <div className="border-b mb-3 px-6 pt-6 border-gray-300">
                                                <h3 className="font-bold mb-4 text-lg">Notifications</h3>
                                            </div>
                                            <div className="px-6 flex mb-2 flex-col justify-center gap-3">
                                                {notifyData.length > 0 ? (
                                                    notifyData.map((data, index) => (
                                                        <div className="flex items-center gap-2" key={index}>
                                                            <img
                                                                className="w-14 h-14 rounded-full"
                                                                src={data.fromImage}
                                                                alt="image"
                                                            />
                                                            <div className="flex flex-col justify-center">
                                                                <h1 className="font-semibold">
                                                                    {data.fromName} <span className="font-light">{data.title}</span>
                                                                </h1>
                                                                <p className="text-[#9B9B9B] text-sm">
                                                                    {data.relativeTime}
                                                                </p>
                                                            </div>
                                                        </div>
                                                    ))
                                                ) : (
                                                    <div className="text-center text-gray-400 text-sm">
                                                        No notifications available
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </dialog>
                                </div>
                            )
                        }

                    </div>


                </div>
                <div className={`transition-all ${showRightbar ? 'm-[]' : 'mr-[2px]'}`}>
                    <div className='p-[2px]'>
                        <div className='bg-white p-4'>
                            <div>
                                <div className='flex gap-4 items-center'>
                                    {
                                        loading ? (
                                            <div className="flex w-12 bg-gray-300 h-12 rounded-full items-center gap-2 animate-pulse"></div>
                                        ) : (
                                            <img
                                                src={author && author[0] ? author[0].image : ''}
                                                className="rounded-full w-12 h-12"
                                                alt={author && author[0] ? author[0].firstName : 'User'}
                                            />
                                        )
                                    }
                                    <p className='text-[#808080]'>Have You Something to Share?</p>
                                </div>
                                <div className='flex items-center mt-5 gap-5 p-2'>
                                    <div onClick={handlePostModel} className='flex bg-[#399AF31A] px-3 py-2 rounded-3xl gap-2 cursor-pointer items-center'>
                                        <img src={photoadmin} className='w-5 mb-1 mt-1' alt="photo" />
                                        <button className='' onClick={handlePostModel}>Photo</button>
                                    </div>
                                    <div onClick={handleTextModel} className='flex bg-[#FF602E1A] px-3 py-2 rounded-3xl cursor-pointer gap-1 justify-center items-center'>
                                        <img src={textadmin} className='w-5 mb-1' alt="text" />
                                        <button onClick={handleTextModel}>Text</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='rounded mt-2'>

                            {
                                postData.posts ? (
                                    postData.posts.length > 0 ? (
                                        <div>
                                            {postData.posts.map((data, indx) => (
                                                <Post
                                                    {...data}
                                                    postData={data}
                                                    postId={postData.docs}
                                                    key={data.docID}
                                                    likesC={data.likes}
                                                />
                                            ))}
                                        </div>
                                    ) : (
                                        <NoData />
                                    )
                                ) : (
                                    <Loader />
                                )
                            }

                        </div>
                    </div>
                </div>
                <ToastContainer position="top-right" autoClose={3000} />
            </div>

            {/* Models */}



            {showRightbar && (
                <div className='w-[26%]'>
                    <Rightbar />
                </div>
            )}

            {textModel && (
                <div className="fixed inset-0 bg-black bg-opacity-65 z-40 flex justify-center items-center">
                    <dialog id="my_modal_3" className="modal z-90 " open>
                        <div className="modal-box">
                            <form method="dialog">
                                <button
                                    className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                                    onClick={handleTextModel}
                                >
                                    ✕
                                </button>
                            </form>
                            <div>
                                {postingData.map((data, index) => (
                                    <div key={index}>
                                        <div className="content flex gap-2">
                                            <img
                                                src={author && author[0] ? author[0].image : ''}
                                                className="rounded-full w-12 h-12"
                                                alt={author && author[0] ? author[0].firstName : 'User'}
                                            />
                                            <div className="items-center">
                                                <h1 className="font-semibold">{author && author[0] ? author[0].firstName : 'Anonymous'}</h1>
                                                <h1 className="text-gray-400">Creating Post</h1>
                                            </div>
                                        </div>
                                        <div className={`mt-5 ${!PostImage && 'h-20'}`}>
                                            <input onChange={(e) => {
                                                setThoughts(e.target.value
                                                    , console.log(e.target.value)
                                                )
                                            }} type='text' placeholder='Write your thoughts here...' className="text-gray-400 outline-none w-full text-wrap" />
                                            {/* {PostImage && (
                                                <div className='mt-3 flex-shrink-0'>
                                                    <img src={PostImage} alt="Post" className="w-full object-contain" />
                                                </div>
                                            )
                                            }
                                            <input
                                                type="file"
                                                className="hidden"
                                                onChange={handleImageChange}
                                                ref={postRef}
                                            /> */}
                                        </div>
                                        <div className="flex mt-4 flex-wrap md:flex-row gap-3">
                                            {/* <div className="flex bg-[#399AF31A] px-3 py-2 rounded-3xl gap-1">
                                                <img className="w-5" src={photoadmin} alt="Photo Icon" />
                                                <button disabled={uploading} onClick={handlePostRef}>
                                                    {uploading ? "Uploading..." : "Photo"}
                                                </button>
                                            </div> */}
                                            <div className="flex bg-[#FF602E1A] px-3 py-2 rounded-3xl gap-1">
                                                <img className="w-5" src={tag} alt="Tag Icon" />
                                                <button>Tag People</button>
                                            </div>
                                            <div className="flex-grow flex md:justify-end">
                                                <button
                                                    disabled={!(PostImage || thoughts)}
                                                    onClick={() => handlePosts(dummyID)}
                                                    className={`p-3 rounded-3xl w-full md:w-auto text-white ${PostImage || thoughts ? 'bg-black' : 'bg-gray-600'}`}
                                                >
                                                    {
                                                        postLoading ? "Posting..." : "Post Now"
                                                    }
                                                </button>

                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </dialog>
                </div>
            )}

            {postModel && (
                <div className="fixed inset-0 bg-black bg-opacity-65 z-40 flex justify-center items-center">
                    <dialog id="my_modal_3" className="modal z-90 " open>
                        <div className="modal-box">
                            <form method="dialog">
                                <button
                                    className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                                    onClick={handlePostModel}
                                >
                                    ✕
                                </button>
                            </form>
                            <div>
                                {postingData.map((data, index) => (
                                    <div key={index}>
                                        <div className="content flex gap-2">
                                            <img
                                                src={author && author[0] ? author[0].image : ''}
                                                className="rounded-full w-12 h-12"
                                                alt={author && author[0] ? author[0].firstName : 'User'}
                                            />
                                            <div className="items-center">
                                                <h1 className="font-semibold">{author && author[0] ? author[0].firstName : 'Anonymous'}</h1>
                                                <h1 className="text-gray-400">Creating Post</h1>
                                            </div>
                                        </div>
                                        <div className={`mt-5 ${!PostImage && 'h-20'}`}>
                                            <input onChange={(e) => {
                                                setThoughts(e.target.value
                                                    , console.log(e.target.value)
                                                )
                                            }} type='text' placeholder='Write your thoughts here...' className="text-gray-400 outline-none w-full text-wrap" />
                                            {PostImage && (
                                                <div className='mt-3 flex-shrink-0'>
                                                    <img src={PostImage} alt="Post" className="w-full object-contain" />
                                                </div>
                                            )
                                            }
                                            <input
                                                type="file"
                                                className="hidden"
                                                onChange={handleImageChange}
                                                ref={postRef}
                                            />
                                        </div>
                                        <div className="flex mt-4 flex-wrap md:flex-row gap-3">
                                            <div className="flex bg-[#399AF31A] px-3 py-2 rounded-3xl gap-1">
                                                <img className="w-5" src={photoadmin} alt="Photo Icon" />
                                                <button disabled={uploading} onClick={handlePostRef}>
                                                    {uploading ? "Uploading..." : "Photo"}
                                                </button>
                                            </div>
                                            <div className="flex bg-[#FF602E1A] px-3 py-2 rounded-3xl gap-1">
                                                <img className="w-5" src={tag} alt="Tag Icon" />
                                                <button>Tag People</button>
                                            </div>
                                            <div className="flex-grow flex md:justify-end">
                                                <button
                                                    disabled={!(PostImage || thoughts)}
                                                    onClick={() => handlePosts(dummyID)}
                                                    className={`p-3 rounded-3xl w-full md:w-auto text-white ${PostImage || thoughts ? 'bg-black' : 'bg-gray-600'}`}
                                                >
                                                    {
                                                        postLoading ? "Posting..." : "Post Now"
                                                    }
                                                </button>

                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </dialog>
                </div>
            )}

            {tagPeople &&
                <div className='bg-black bg-opacity-50 z-40 inset-0 fixed top-0 right-0'>
                    <dialog id="my_modal_3" className="modal" open>
                        <div className="modal-box h-80 w-96">
                            <form method="dialog">
                                <button onClick={handleTagPeople} className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                            </form>
                            <div className='flex gap-1'>
                                <button onClick={handlePostModel}>
                                    <IoMdArrowBack className='text-2xl' />
                                </button>
                                <h3 className="font-bold text-lg">Tag People</h3>
                            </div>
                            <div className='flex justify-start mt-2 bg-gray-100  rounded-xl items-center'>
                                <IoIosSearch className='ml-3' />
                                <input className='outline-none w-full bg-transparent p-2' type="search" name="" placeholder='Search' id="" />
                            </div>

                        </div>
                    </dialog>
                </div>
            }
        </div>
    );
};

export default Main;