// import React from 'react';
// import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
// import { Swiper, SwiperSlide } from "swiper/react";
// import "swiper/css";
// import "swiper/css/navigation";
// import "swiper/css/pagination";
// import "swiper/css/scrollbar";
// import MyWorkCard from '../Cards/MyWorkCard';
// import image from '../assets/Images/land2.png';
// const MyWork = () => {

//   const  videos= [
//       {
//         title: "Exploring the Beauty of Nature",
//         thumbnail: image,
//         videoLink: "https://example.com/video/1",
//       },
//       {
//         title: "Exploring the Beauty of Nature",
//         thumbnail: image,
//         videoLink: "https://example.com/video/1",
//       },
//       // Add more video objects here
//     ],


//   return (
//     <div className="container mx-auto px-4">
//       {/* <Swiper
//         modules={[Navigation, Pagination, Scrollbar, A11y]}
//         spaceBetween={10}
//         slidesPerView="auto"
//         navigation
//         pagination={{ clickable: true }}
//         scrollbar={{ draggable: true }}
//         breakpoints={{
//           640: {
//             slidesPerView: 1,
//           },
//           768: {
//             slidesPerView: 2,
//           },
//           1024: {
//             slidesPerView: 3,
//           },
//           1280: {
//             slidesPerView: 4,
//           },
//         }}
//         className="swiper-container bg-red-950 w-full"
//       >
//         {WorkData.map((data, index) => (
//           <SwiperSlide key={index} className="w-full flex justify-center">
//           </SwiperSlide> 
//           ))}
//           </Swiper> */}
//           <div >
//             <MyWorkCard {...data} />
//           </div>
//     </div>
//   );
// };

// export default MyWork;


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

