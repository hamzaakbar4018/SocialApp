import React from 'react';
import MyWorkCard from '../Cards/MyWorkVideos';
import image from '../assets/Images/land2.png';
import MyWorkPictures from '../Cards/MyWorkPictures';

const ProfileMyWork = () => {
  const videos = [
    {
      title: "Exploring the Beauty of Nature",
      thumbnail: image,
      videoLink: "https://example.com/video/1",
    },
    {
      title: "Exploring the Beauty of Nature",
      thumbnail: image,
      videoLink: "https://example.com/video/1",
    }
    ,{
      title: "Exploring the Beauty of Nature",
      thumbnail: image,
      videoLink: "https://example.com/video/1",
    }
    
  ];
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

  return (
    <>
      <div className="containerVideos ">
        <MyWorkCard videos={videos} />
      </div>
      <div className="containerPictures ">
        <MyWorkPictures pictures={pictures} />
      </div>
    </>

  );
};

export default ProfileMyWork;

