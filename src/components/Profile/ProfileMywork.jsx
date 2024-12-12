import React from 'react';
import MyWorkCard from '../../Cards/ProfileCards/MyWorkVideos';
import image from '../../assets/Icons SVG/land2.png';
import MyWorkPictures from '../../Cards/ProfileCards/MyWorkPictures';
import useAuthor from '../../Hooks/useAuthor';
import Loader from '../Loader/Load'
const ProfileMyWork = () => {
  // const videos = [
  //   {
  //     title: "Exploring the Beauty of Nature",
  //     thumbnail: image,
  //     videoLink: "https://example.com/video/1",
  //   },
  //   {
  //     title: "Exploring the Beauty of Nature",
  //     thumbnail: image,
  //     videoLink: "https://example.com/video/1",
  //   }
  //   , {
  //     title: "Exploring the Beauty of Nature",
  //     thumbnail: image,
  //     videoLink: "https://example.com/video/1",
  //   }

  // ];
  const pictures = [
    {
      title: "Exploring the Beauty of Nature",
      thumbnail: image,
      pictureLink: "https://example.com/picture/1",
    },
    {
      title: "Exploring the Beauty of Nature",
      thumbnail: image,
      pictureLink: "https://example.com/picture/1",
    }, {
      title: "Exploring the Beauty of Nature",
      thumbnail: image,
      pictureLink: "https://example.com/picture/1",
    },
  ];

  const { authorInfo } = useAuthor();
  const {videos,images , loading} = authorInfo;
  

  if (loading){
    return <Loader/>
  }
  return (
    <>
      <div className="containerVideos pl-1 md:w-auto w-screen ">
        <MyWorkCard videos={videos}  />
      </div>
      <div className="containerPictures pl-1 md:w-auto w-screen ">
        <MyWorkPictures pictures={images} />
      </div>
    </>

  );
};

export default ProfileMyWork;

