import React,{useContext} from 'react';
import TalentCards from './Talent/TalentCards';
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import '../CSS/Connections.css';
const SwipingData = ({landingtalent}) => {
    const talentData = [
        {
            id: 1,
            userpic: "https://randomuser.me/api/portraits/men/1.jpg",
            name: "John Doe",
            text: "Actor | Model",
            landingtalent
        },
        {
            id: 2,
            userpic: "https://randomuser.me/api/portraits/men/14.jpg",
            name: "Jane Smith",
            text: "Model | Director",
            landingtalent
        },
        {
            id: 3,
            userpic: "https://randomuser.me/api/portraits/men/12.jpg",
            name: "Michael Johnson",
            text: "Actor | Director",
            landingtalent
        },
        {
            id: 4,
            userpic: "https://randomuser.me/api/portraits/women/13.jpg",
            name: "Emily Davis",
            text: "Model",
            landingtalent
        },
        {
            id: 5,
            userpic: "https://randomuser.me/api/portraits/men/14.jpg",
            name: "Chris Brown",
            text: "Actor",
            landingtalent
        },
        {
            id: 6,
            userpic: "https://randomuser.me/api/portraits/women/15.jpg",
            name: "Sophia Wilson",
            text: "Director",
            landingtalent
        },
        {
            id: 7,
            userpic: "https://randomuser.me/api/portraits/men/16.jpg",
            name: "David Miller",
            text: "Actor | Model | Director",
            landingtalent
        },
        {
            id: 8,
            userpic: "https://randomuser.me/api/portraits/women/17.jpg",
            name: "Olivia Taylor",
            text: "Model | Actor",
            landingtalent
        },
        
    ];

    

    return (
        <div className="container min-w-full overflow-x-hidden">
            <div className="swiper-grid-container">
                <Swiper
                    modules={[Navigation, Pagination, Scrollbar, A11y]}
                    spaceBetween={`${landingtalent ? '-100' : '10'}`}
                    scrollbar={{ draggable: true }}
                    onSwiper={(swiper) => console.log(swiper)}
                    onSlideChange={() => console.log("slide change")}
                    className="swiper-container w-full overflow-hidden"
                    breakpoints={{
                        640: {
                            slidesPerView: 2,
                        },
                        768: {
                            slidesPerView: 2,
                        },
                        1024: {
                            slidesPerView: 3,
                        },
                        1280: {
                            slidesPerView: 4,
                        },
                    }}
                >
                    {talentData.map((data) => (
                        <SwiperSlide key={data.id} className="max-w-[27%]">
                            <TalentCards {...data} />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    );
};

export default SwipingData;
