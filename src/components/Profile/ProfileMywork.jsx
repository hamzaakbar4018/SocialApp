import React from 'react';
import MyWorkCard from '../../Cards/ProfileCards/MyWorkVideos';
import image from '../../assets/Icons SVG/land2.png';
import MyWorkPictures from '../../Cards/ProfileCards/MyWorkPictures';
import useAuthor from '../../Hooks/useAuthor';
import Loader from '../Loader/Load'
const ProfileMyWork = () => {


  const { authorInfo } = useAuthor();
  const { videos, images, loading } = authorInfo;
  const userID = "GFPNB660GaVlJfnmbMdzFIjba4A3"
  if (loading) {
    return <Loader />
  }
  return (
    <>
      <div className="containerVideos pl-1 md:w-auto w-screen ">
        <MyWorkCard videos={videos} userId={userID} />
      </div>
      <div className="containerPictures pl-1 md:w-auto w-screen ">
        <MyWorkPictures pictures={images} userId={images[0]?.userID} />
      </div>
    </>

  );
};

export default ProfileMyWork;

