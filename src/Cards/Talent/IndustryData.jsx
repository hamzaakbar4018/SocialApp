// import TalentCards from "./TalentCards";
// import { Swiper, SwiperSlide } from "swiper/react";
// import { Pagination } from "swiper/modules";
// import "swiper/css";
// import "swiper/css/pagination";
// import "../../CSS/Connections.css";
// import { useContext } from "react";
// import { IndustryData } from "../../Context/IndustryContext";
// const SwipingData = ({ landingtalent }) => {


//   const talentData = useContext(IndustryData);
//   return (
//     <>
//       <Swiper
//         slidesPerView={1}
//         breakpoints={{
//           640: {
//             slidesPerView: 3,
//             spaceBetween: 20, // Space between cards for tablet and larger screens
//           },
//           768: {
//             slidesPerView: 2,
//             spaceBetween: 20,
//           },
//           1024: {
//             slidesPerView: 4,
//             spaceBetween: 20,
//           },
//           1280: {
//             slidesPerView: 6,
//             spaceBetween: 20,
//           }
//         }}
//         spaceBetween={0}  // Remove space between cards for mobile
//         draggable={true}
//         pagination={false}
//         modules={[Pagination]}
//         className={`mySwiper ${landingtalent && 'md:pl-20 md:min-w-[300px]'}`} // Apply left padding only on md screens and up
//       >
//         {talentData.map((talent) => (
//           <SwiperSlide
//             className={`${landingtalent ? 'py-4 min-w-min hover:scale-105 duration-300 transition-all md:min-w-min' : 'min-w-min'
//               }`}
//             key={talent.id}
//           >
//             <TalentCards {...talent} landingtalent={landingtalent} />
//           </SwiperSlide>
//         ))}
//       </Swiper>

//     </>
//   );
// };

// export default SwipingData;

import React, { useContext } from 'react';
import { IndustryData } from '../../Context/IndustryContext';
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import '../../CSS/Connections.css';
import TalentCards from './TalentCards';
import Conneections from '../Conneections';

const SwipingData = ({ landingtalent }) => {
  const talentData = useContext(IndustryData);

  return (
    <div className="container min-w-full overflow-x-hidden">
      <div className="swiper-grid-container">
        <Swiper
          modules={[Navigation, Pagination, Scrollbar, A11y]}
          spaceBetween={10}
          scrollbar={{ draggable: true }}
          onSwiper={(swiper) => console.log(swiper)}
          onSlideChange={() => console.log("slide change")}
          className="swiper-container  py-4 pl-3 md:pl-20 w-full overflow-hidden"
          breakpoints={{
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
            1280: { slidesPerView: 6 },
          }}
        >
          {
            talentData.map((talent) => (
              <SwiperSlide
                className=" max-w-[20%] min-w-[300px] md:min-w-[300px] 2xl:min-w-[350px] hover:scale-105 duration-300 transition-all"
                key={talent.id}
              >
                <TalentCards {...talent} landingtalent={landingtalent} />
              </SwiperSlide>
            ))
          }
        </Swiper>
      </div>
    </div>
  );
};

export default SwipingData;

