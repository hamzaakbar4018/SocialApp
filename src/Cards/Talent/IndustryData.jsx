import TalentCards from "./TalentCards";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "../../CSS/Connections.css";
import { useContext } from "react";
import { IndustryData } from "../../Context/IndustryContext";
const SwipingData = ({ landingtalent }) => {


const talentData = useContext(IndustryData);
  return (
    <>
      <Swiper
        slidesPerView={1}
        breakpoints={{
          640: {
            slidesPerView: 3,
          },
          768: {
            slidesPerView: 2,
          },
          1024: {
            slidesPerView: 4,
          },
          1280 : {
            slidesPerView : 6,
          }
        }}
        spaceBetween={20}
        draggable={true}
        pagination={false}
        modules={[Pagination]}
        className={`mySwiper md:mx-20  ${landingtalent && 'min-w-[300px] mx-0'}`}
      >
        {talentData.map((talent) => (
          <SwiperSlide className={`${landingtalent ? 'py-4 min-w-min hover:scale-105 duration-300 transition-all': 'min-w-min'}`} key={talent.id}>
            <TalentCards {...talent} landingtalent={landingtalent}/>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

export default SwipingData;
