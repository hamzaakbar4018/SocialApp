import TalentCards from "./Talent/TalentCards";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "../CSS/Connections.css";
import { useContext } from "react";
import { IndustryData } from "../Context/IndustryContext";
const SwipingData = ({ landingtalent }) => {
//   const talentData = [
//     {
//       id: 1,
//       userpic: "https://randomuser.me/api/portraits/men/1.jpg",
//       name: "John Doe",
//       text: "Actor | Model",
//     },
//     {
//       id: 2,
//       userpic: "https://randomuser.me/api/portraits/men/14.jpg",
//       name: "Jane Smith",
//       text: "Model | Director",
//       landingtalent,
//     },
//     {
//       id: 3,
//       userpic: "https://randomuser.me/api/portraits/men/12.jpg",
//       name: "Michael Johnson",
//       text: "Actor | Director",
//       landingtalent,
//     },
//     {
//       id: 4,
//       userpic: "https://randomuser.me/api/portraits/women/13.jpg",
//       name: "Emily Davis",
//       text: "Model",
//       landingtalent,
//     },
//     {
//       id: 5,
//       userpic: "https://randomuser.me/api/portraits/men/14.jpg",
//       name: "Chris Brown",
//       text: "Actor",
//       landingtalent,
//     },
//     {
//       id: 6,
//       userpic: "https://randomuser.me/api/portraits/women/15.jpg",
//       name: "Sophia Wilson",
//       text: "Director",
//       landingtalent,
//     },
//     {
//       id: 7,
//       userpic: "https://randomuser.me/api/portraits/men/16.jpg",
//       name: "David Miller",
//       text: "Actor | Model | Director",
//       landingtalent,
//     },
//     {
//       id: 8,
//       userpic: "https://randomuser.me/api/portraits/women/17.jpg",
//       name: "Olivia Taylor",
//       text: "Model | Actor",
//       landingtalent,
//     },
//   ];


const talentData = useContext(IndustryData);
  return (
    <>
      <Swiper
        slidesPerView={1}
        breakpoints={{
          640: {
            slidesPerView: 2,
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
        spaceBetween={50}
        draggable={true}
        pagination={false}
        modules={[Pagination]}
        className={`mySwiper mx-20 `}
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
