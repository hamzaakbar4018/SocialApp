import React, { useContext } from 'react';
import { IndustryData } from '../../Context/IndustryContext';
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import '../../CSS/Connections.css';
import "swiper/css/navigation"; 
import TalentCards from './TalentCards';

const SwipingData = ({ landingtalent }) => {
  const talentData = useContext(IndustryData);

  return (
    <div className="container min-w-full overflow-x-hidden">
      <div className="swiper-grid-container">
        <Swiper
          modules={[Navigation, Pagination, Scrollbar, A11y]}
          navigation={true}
          slidesPerView="auto"
          spaceBetween={10}
          scrollbar={{ draggable: true }}
          onSwiper={(swiper) => console.log(swiper)}
          onSlideChange={() => console.log("slide change")}
          loop={true} 
          loopFillGroupWithBlank={true}
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
                className="!w-auto max-w-[20%] min-w-[300px] md:min-w-[300px] 2xl:min-w-[350px] hover:scale-105 duration-300 transition-all"
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

