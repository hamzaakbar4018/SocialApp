import React, { useRef, useState } from 'react';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { collection, addDoc, updateDoc, doc, deleteDoc } from 'firebase/firestore';
import Edit from '../../assets/Icons SVG/Edit.svg';
import Add from '../../assets/Icons SVG/Add.svg';
import { RiDeleteBinLine } from "react-icons/ri";
import { db } from '../../Services/Firebase';
import { ToastContainer, toast } from 'react-toastify';


const Spinner = () => (
    <div className="flex justify-center items-center">
        <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-white"></div>
    </div>
);

const MyWorkPictures = ({ pictures, refreshPictures, userId, fetchAuthorAndPosts,seperate }) => {
    const [title, setTitle] = useState('');
    const [pictureLink, setPictureLink] = useState('');
    const [image, setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [loading, setLoading] = useState(false);
    const [deleting, setDeleting] = useState(null);
    const [error, setError] = useState(null);
    const [addPicture, setAddPicture] = useState(false);
    const [editingPicture, setEditingPicture] = useState(null);

    const fileInputRef = useRef(null);
    const clearForm = () => {
        setTitle('');
        setPictureLink('');
        setImage(null);
        setImagePreview(null);
        setError(null);
      }
    const handleImageChange = (event) => {
        const selectedFile = event.target.files[0];
        if (selectedFile) {
            const previewUrl = URL.createObjectURL(selectedFile);
            setImage(selectedFile);
            setImagePreview(previewUrl);
        }
    };

    const handleImageClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const handleDelete = async (pictureId) => {
        try {
            setDeleting(pictureId);
            const pictureDocRef = doc(db, 'userCollection', userId, 'imageCollection', pictureId);

            // Delete the document
            await deleteDoc(pictureDocRef);

            // Optionally, refresh the pictures list
            if (refreshPictures) {
                refreshPictures();
            }
            toast.success("Deleted Successfully !")
            fetchAuthorAndPosts();

        } catch (err) {
            toast.error("Please try again !")
            console.error('Error deleting picture:', err);
            setError('Failed to delete picture');
        } finally {
            setDeleting(null);
        }
    };

    const handleEditStart = (picture) => {
        setEditingPicture(picture);
        setTitle(picture.title);
        setPictureLink(picture.pictureLink || '');
        setImagePreview(picture.image);
        setAddPicture(true);
    };

    const resetForm = () => {
        setTitle('');
        setPictureLink('');
        setImage(null);
        setImagePreview(null);
        setAddPicture(false);
        setEditingPicture(null);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate inputs
        if (!title || (!editingPicture && !image)) {
            setError('Please add a title and an image');
            return;
        }

        try {
            setLoading(true);
            setError(null);

            let imageUrl = editingPicture ? editingPicture.image : null;

            if (image) { // Only upload if a new image is selected
                // Upload image
                const storage = getStorage();
                const imageName = `${Date.now()}_${image.name}`;
                const storageRef = ref(storage, `YooTooArt/userModule/${imageName}`);

                const snapshot = await uploadBytes(storageRef, image);
                imageUrl = await getDownloadURL(snapshot.ref);
            }

            // Reference to the user's imageCollection
            const userDocRef = doc(db, 'userCollection', userId);
            const imageCollectionRef = collection(userDocRef, 'imageCollection');

            if (editingPicture) {
                // Update existing picture
                const pictureDocRef = doc(db, 'userCollection', userId, 'imageCollection', editingPicture.docID);
                await updateDoc(pictureDocRef, {
                    title,
                    pictureLink: pictureLink || '',
                    image: imageUrl,
                    updatedAt: new Date()
                });
            } else {
                // Add new picture
                const docRef = await addDoc(imageCollectionRef, {
                    title,
                    pictureLink: pictureLink || '',
                    image: imageUrl,
                    createdAt: new Date(),
                    docID: null,
                    userID: userId
                });

                // Update the document with its own ID
                await updateDoc(docRef, {
                    docID: docRef.id
                });
            }

            // Reset form and state
            resetForm();
            fetchAuthorAndPosts();
            toast.success(editingPicture ? "Updated Successfully!" : "Added Successfully!");

            // Refresh pictures if callback is provided
            if (refreshPictures) {
                refreshPictures();
            }

        } catch (err) {
            toast.error("Please try again!");
            console.error('Error:', err);
            setError(err.message);
        } finally {
            resetForm();
            setLoading(false);
        }
    };

    return (
        <div className='alldata w-full bg-white m-[2px] md:p-6'>
            <div className="pictures">
                <div className='flex justify-between items-center mb-4'>
                    <div className='flex-1 md:p-0 py-3 px-2'>
                        <h1 className='text-xl font-semibold'>Pictures ({pictures.length})</h1>
                        {/* <p className='text-sm text-gray-400'>1 Hour ago</p> */}
                    </div>
                    <div className='flex gap-2 md:p-0 py-3 px-4'>
                        <div className={`bg-[#B3FCE2] rounded-full flex justify-center items-center p-3 ${seperate && 'hidden'}`}>
                            <img
                                onClick={() => {
                                    setEditingPicture(null);
                                    setAddPicture(true);
                                    clearForm();
                                }}
                                src={Add}
                                className='w-7 h-7 cursor-pointer'
                            />
                        </div>
                    </div>
                </div>

                <div className="carousel flex gap-4 overflow-x-auto">
                    {pictures.length > 0 ? (
                        pictures.map((picture, index) => (
                            <div
                                key={index}
                                className="carousel-item relative border rounded-lg md:w-1/2 lg:w-1/3 p-2 flex-shrink-0"
                            >
                                <div className='text-blue-500 cursor-pointer absolute top-4 right-4'>
                                    <div className={`flex gap-2 md:p-0 py-3 px-4 ${seperate && 'hidden'}`}>
                                        <div
                                            className='rounded-full flex justify-center items-center p-3 bg-[#D6EBFF]'
                                            onClick={() => handleEditStart(picture)}
                                        >
                                            <img src={Edit} className='w-7 h-7' />
                                        </div>
                                        <div
                                            className='bg-[#f4c0c0e4] rounded-full flex justify-center items-center p-3'
                                            onClick={() => handleDelete(picture.docID)}
                                        >
                                            {deleting === picture.docID ? (
                                                <Spinner />
                                            ) : (
                                                <RiDeleteBinLine className='w-7 h-7 text-red-500' />
                                            )}
                                        </div>
                                    </div>
                                </div>
                                <div className='flex w-full flex-col items-start'>
                                    <img
                                        src={picture.image}
                                        alt={picture.title}
                                        className='w-full h-40 max-h-48 md:h-auto object-cover rounded mb-4'
                                    />
                                    <div>
                                        <h2 className='text-lg 2xl:text-xl font-semibold mb-2'>{picture.title}</h2>
                                        {picture.pictureLink && (
                                            <a
                                                href={picture.pictureLink}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className='text-blue-400 underline 2xl:text-xl'
                                            >
                                                {picture.pictureLink}
                                            </a>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className='flex flex-col gap-4 justify-center'>

                            <p>No pictures available.</p>
                        </div>
                    )}
                </div>
            </div>

            {addPicture && (
                <div className='fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-40'>
                    <div className="modal-box bg-white p-6 rounded-lg max-w-md w-full relative">
                        <button
                            onClick={() => {
                                setAddPicture(false);
                                setEditingPicture(null);
                            }}
                            className="absolute top-4 right-4 text-gray-600 hover:text-gray-900"
                        >
                            ✕
                        </button>
                        <h3 className="font-bold text-lg mb-4">
                            {editingPicture ? 'Edit Picture' : 'Add Picture'}
                        </h3>
                        <form onSubmit={handleSubmit}>
                            <div className='flex flex-col mb-4'>
                                <label htmlFor="image" className='font-bold mb-2'>Image</label>
                                <div
                                    className='border-2 mt-3 border-black border-dotted min-h-40 rounded-xl flex flex-col justify-center items-center cursor-pointer'
                                    onClick={handleImageClick}
                                >
                                    <input
                                        ref={fileInputRef}
                                        type="file"
                                        name="image"
                                        id="image"
                                        accept="image/*"
                                        className='hidden'
                                        onChange={handleImageChange}
                                    />
                                    {imagePreview ? (
                                        <img
                                            src={imagePreview}
                                            alt="Selected"
                                            className='w-full h-full object-cover rounded-xl'
                                        />
                                    ) : (
                                        <p className='font-bold'>Click to add Image here!</p>
                                    )}
                                </div>
                            </div>

                            <div className='mb-4'>
                                <label htmlFor="title" className='font-bold block mb-2'>Title</label>
                                <input
                                    type="text"
                                    id="title"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    className='w-full border rounded p-2'
                                    placeholder='Enter picture title'
                                    required
                                />
                            </div>

                            <div className='mb-4'>
                                <label htmlFor="pictureLink" className='font-bold block mb-2'>Picture Link (Optional)</label>
                                <input
                                    type="url"
                                    id="pictureLink"
                                    value={pictureLink}
                                    onChange={(e) => setPictureLink(e.target.value)}
                                    className='w-full border rounded p-2'
                                    placeholder='Enter picture link'
                                />
                            </div>

                            {error && (
                                <div className='text-red-500 mb-4'>{error}</div>
                            )}

                            <button
                                type="submit"
                                disabled={loading}
                                className='w-full bg-black text-white py-2 rounded-xl flex justify-center items-center'
                            >
                                {loading ? (
                                    <>
                                        <Spinner />
                                        <span className='ml-2'>
                                            {editingPicture ? 'Updating...' : 'Adding...'}
                                        </span>
                                    </>
                                ) : (
                                    editingPicture ? 'Update Picture' : 'Add Picture'
                                )}
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MyWorkPictures;