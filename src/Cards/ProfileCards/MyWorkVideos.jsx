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

const MyWorkCard = ({ videos, refreshVideos, userId, fetchAuthorAndPosts, seperate }) => {
  const [title, setTitle] = useState('');
  const [videoLink, setVideoLink] = useState('');
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [deleting, setDeleting] = useState(null);
  const [error, setError] = useState(null);
  const [addVideo, setAddVideo] = useState(false);
  const [editingVideo, setEditingVideo] = useState(null);


  const fileInputRef = useRef(null);
  const clearForm = () => {
    setTitle('');
    setVideoLink('');
    setImage(null);
    setImagePreview(null);
    setError(null);
    setEditingVideo(null);
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

  const handleDelete = async (videoId) => {
    try {
      setDeleting(videoId);
      // Reference to the specific video document
      const videoDocRef = doc(db, 'userCollection', userId, 'videoCollection', videoId);

      // Delete the document
      await deleteDoc(videoDocRef);

      // Optionally, refresh the videos list
      if (refreshVideos) {
        refreshVideos();
      }
      toast.success("Deleted Successfully !")
      fetchAuthorAndPosts();

    } catch (err) {
      toast.error("Please try again !")
      console.error('Error deleting video:', err);
      setError('Failed to delete video');
    } finally {
      setDeleting(null);
    }
  };

  const handleEditStart = (video) => {
    // Prepare the video for editing
    setEditingVideo(video);
    setTitle(video.title);
    setVideoLink(video.video);
    setImagePreview(video.image);
    setAddVideo(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate inputs
    if (!title || !videoLink) {
      setError('Please fill all fields');
      return;
    }

    try {
      setLoading(true);
      setError(null);

      let imageUrl = editingVideo ? editingVideo.image : null;

      // If a new image is selected, upload it
      if (image) {
        const storage = getStorage();
        const imageName = `${Date.now()}_${image.name}`;
        const storageRef = ref(storage, `YooTooArt/userModule/${imageName}`);

        const snapshot = await uploadBytes(storageRef, image);
        imageUrl = await getDownloadURL(snapshot.ref);
      }

      // Reference to the user's videoCollection
      const userDocRef = doc(db, 'userCollection', userId);
      const videoCollectionRef = collection(userDocRef, 'videoCollection');

      if (editingVideo) {
        // Update existing video
        const videoDocRef = doc(db, 'userCollection', userId, 'videoCollection', editingVideo.docID);
        await updateDoc(videoDocRef, {
          title,
          video: videoLink,
          image: imageUrl,
          updatedAt: new Date()
        });
      } else {
        // Add new video
        const docRef = await addDoc(videoCollectionRef, {
          title,
          video: videoLink,
          image: imageUrl,
          createdAt: new Date(),
          docID: null
        });

        // Update the document with its own ID
        await updateDoc(docRef, {
          docID: docRef.id
        });
      }

      // Reset form and state
      setTitle('');
      setVideoLink('');
      setImage(null);
      setImagePreview(null);
      setAddVideo(false);
      setEditingVideo(null);
      setAddVideo(false);

      // window.location.reload();
      fetchAuthorAndPosts();
      toast.success("Updated Successfully !")

      // Refresh videos if callback is provided
      if (refreshVideos) {
        refreshVideos();
      }

    } catch (err) {
      toast.error("Please try again !")
      console.error('Error:', err);
      setError(err.message);
    } finally {
      setLoading(false);
      setTitle('');
      setVideoLink('');
      setImage(null);
      setImagePreview(null);
      setAddVideo(false);
      setEditingVideo(null);
      setAddVideo(false);
    }
  };

  const handleClearForm = () => {
    clearForm();
  }

  return (
    <div className='alldata w-full bg-white m-[2px] md:p-6'>
      <ToastContainer />
      <div className="videos">
        <div className='flex justify-between items-center mb-4'>
          <div className='flex-1 md:p-0 py-3 px-2'>
            <h1 className='text-xl font-semibold'>Videos ({videos.length})</h1>
            {/* <p className='text-sm text-gray-400'>1 Hour ago</p> */}
          </div>
          <div className='flex gap-2 md:p-0 py-3 px-4'>
            <div className={`bg-[#B3FCE2] rounded-full flex justify-center items-center p-3 ${seperate && 'hidden'}`}>
              <img
                onClick={() => {
                  setEditingVideo(null);
                  setAddVideo(true);
                  clearForm();
                }}
                src={Add}
                className='w-7 h-7 cursor-pointer'
              />
            </div>
          </div>
        </div>

        <div className="carousel flex gap-4 overflow-x-auto">
          {videos.length > 0 ? (
            videos.map((video, index) => (
              <div
                key={index}
                className="carousel-item relative border rounded-lg md:w-1/2 lg:w-1/3 p-2 flex-shrink-0"
              >
                <div className='text-blue-500 cursor-pointer absolute top-4 right-4'>
                  <div className='flex gap-2 md:p-0 py-3 px-4'>
                    <div
                      className={`rounded-full flex justify-center items-center p-3 bg-[#D6EBFF] ${seperate && 'hidden'}`}
                      onClick={() => handleEditStart(video)}
                    >
                      <img src={Edit} className='w-7 h-7' />
                    </div>
                    <div
                      className={`bg-[#f4c0c0e4] rounded-full flex justify-center items-center p-3 ${seperate && 'hidden'}`}
                      onClick={() => handleDelete(video.docID)}
                    >
                      {deleting === video.docID ? (
                        <Spinner />
                      ) : (
                        <RiDeleteBinLine className='w-7 h-7 text-red-500' />
                      )}
                    </div>
                  </div>
                </div>
                <div className='flex w-full flex-col items-start'>
                  <img
                    src={video.image}
                    alt={video.title}
                    className='w-full h-40 max-h-48 md:h-auto object-cover rounded mb-4'
                  />
                  <div>
                    <h2 className='text-lg 2xl:text-xl font-semibold mb-2'>{video.title}</h2>
                    <a
                      href={video.video}
                      target="_blank"
                      rel="noopener noreferrer"
                      className='text-blue-400 underline 2xl:text-xl'
                    >
                      {video.video}
                    </a>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className='flex flex-col gap-4 justify-center'>
              <p>No videos available.</p>
            </div>
          )}
        </div>
      </div>

      {addVideo && (
        <div className='fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-40'>
          <div className="modal-box bg-white p-6 rounded-lg max-w-md w-full relative">
            <button
              onClick={() => {
                setAddVideo(false);
                setEditingVideo(null);
              }}
              className="absolute top-4 right-4 text-gray-600 hover:text-gray-900"
            >
              ✕
            </button>
            <h3 className="font-bold text-lg mb-4">
              {editingVideo ? 'Edit Video' : 'Add Video'}
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
                  placeholder='Enter video title'
                  required
                />
              </div>

              <div className='mb-4'>
                <label htmlFor="videoLink" className='font-bold block mb-2'>Video Link</label>
                <input
                  type="url"
                  id="videoLink"
                  value={videoLink}
                  onChange={(e) => setVideoLink(e.target.value)}
                  className='w-full border rounded p-2'
                  placeholder='Enter video URL'
                  required
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
                      {editingVideo ? 'Updating...' : 'Adding...'}
                    </span>
                  </>
                ) : (
                  editingVideo ? 'Update Video' : 'Add Video'
                )}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyWorkCard;