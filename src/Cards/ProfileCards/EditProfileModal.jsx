import React, { useState, useMemo } from 'react';
import Select from 'react-select';
import countryList from 'react-select-country-list';
import { updateDoc, doc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL, getStorage } from 'firebase/storage';
import { app, db } from '../../Services/Firebase';

const EditProfileModal = ({ author, onClose, handleProfileUpdate }) => {
  const [formData, setFormData] = useState({
    firstName: author?.firstName || '',
    lastName: author?.lastName || '',
    bio: author?.bio || '',
    city: author?.city || '',
    country: author?.country || '',
    image: author?.image || '',
    experience: author?.experience || ''
  });
  const [imageFile, setImageFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(author?.image || '');
  const [loading, setLoading] = useState(false);

  const countries = useMemo(() => countryList().getData(), []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleClose = () => {
    const modal = document.getElementById('edit_modal');
    modal?.close();
    onClose();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      let imageUrl = formData.image;

      if (imageFile) {
        const storage = getStorage(app);
        const storageRef = ref(storage, `YooTooArt/userModule/${author.id}/${imageFile.name}`);
        const snapshot = await uploadBytes(storageRef, imageFile);
        imageUrl = await getDownloadURL(snapshot.ref);
      }

      const updatedData = {
        ...formData,
        image: imageUrl,
      };

      const userRef = doc(db, 'userCollection', author.id);
      await updateDoc(userRef, updatedData);
      handleProfileUpdate();
      setFormData('');
      handleClose();
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  return (
    <dialog id="edit_modal" className="modal">
      <div className="modal-box">
        <form onSubmit={handleSubmit}>
          <div className="flex justify-center mb-4">
            <div className="avatar">
              <div className="w-24 rounded-full">
                <img src={previewUrl} alt="Profile" />
              </div>
            </div>
          </div>

          <div className="flex justify-center mb-4">
            {/* Hidden file input */}
            <input
              type="file"
              id="profilePicInput"
              className="hidden" // Hides the default file input
              accept="image/*"
              onChange={handleImageChange}
            />

            {/* Custom Button */}
            <label
              htmlFor="profilePicInput"
              className="cursor-pointer bg-black text-white  py-2 px-4 rounded-full hover:bg-gray-700"
            >
              Change Profile Picture
            </label>
          </div>

          <div className="space-y-4">
            <input
              type="text"
              placeholder="First Name"
              className="input input-bordered w-full"
              value={formData.firstName}
              onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
            />

            <input
              type="text"
              placeholder="Last Name"
              className="input input-bordered w-full"
              value={formData.lastName}
              onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
            />

            <textarea
              placeholder="Bio"
              className="textarea textarea-bordered w-full"
              value={formData.bio}
              onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
            />

            <input
              type="text"
              placeholder="City"
              className="input input-bordered w-full"
              value={formData.city}
              onChange={(e) => setFormData({ ...formData, city: e.target.value })}
            />

            <Select
              options={countries}
              value={countries.find(country => country.value === formData.country)}
              onChange={(option) => setFormData({ ...formData, country: option.value })}
              placeholder="Select Country"
            />

            <textarea
              placeholder="Experience"
              className="textarea textarea-bordered w-full"
              value={formData.experience}
              onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
            />
          </div>

          <div className="modal-action">
            <button type="button" className="btn rounded-3xl px-5" onClick={handleClose}>Cancel</button>
            <button type="submit" className="btn bg-black rounded-3xl px-5 btn-primary" disabled={loading}>
              {loading ? <span className="loading loading-spinner"></span> : 'Save'}
            </button>
          </div>
        </form>
      </div>
    </dialog>
  );
};

export default EditProfileModal;