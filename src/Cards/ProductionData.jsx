import React from 'react';
import TalentCards from './Talent/TalentCards';
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import '../CSS/Connections.css'
const ProductionData = () => {
    const talentData = [
        {
            id: 1,
            userpic: "https://randomuser.me/api/portraits/men/20.jpg",
            name: "Ethan Hall",
            text: "Actor | Model",
        },
        {
            id: 2,
            userpic: "https://randomuser.me/api/portraits/women/21.jpg",
            name: "Ava Lee",
            text: "Model | Director",
        },
        {
            id: 3,
            userpic: "https://randomuser.me/api/portraits/men/22.jpg",
            name: "Liam Patel",
            text: "Actor | Director",
        },
        {
            id: 4,
            userpic: "https://randomuser.me/api/portraits/women/23.jpg",
            name: "Isabella Garcia",
            text: "Model",
        },
        {
            id: 5,
            userpic: "https://randomuser.me/api/portraits/men/24.jpg",
            name: "Julian Sanchez",
            text: "Actor",
        },
        {
            id: 6,
            userpic: "https://randomuser.me/api/portraits/women/25.jpg",
            name: "Mia Martin",
            text: "Director",
        },
        {
            id: 7,
            userpic: "https://randomuser.me/api/portraits/men/26.jpg",
            name: "Alexander Brooks",
            text: "Actor | Model | Director",
        },
        {
            id: 8,
            userpic: "https://randomuser.me/api/portraits/women/27.jpg",
            name: "Sofia Rodriguez",
            text: "Model | Actor",
        },
    ];

    return (
        <div className="container overflow-x-hidden">
            <div className="swiper-grid-container">
                <Swiper
                    modules={[Navigation, Pagination, Scrollbar, A11y]}
                    spaceBetween={10}
                    slidesPerView={4}
                    // navigation
                    // pagination={{ clickable: false }}
                    scrollbar={{ draggable: true }}
                    onSwiper={(swiper) => console.log(swiper)}
                    onSlideChange={() => console.log("slide change")}
                    className="swiper-container w-full overflow-hidden"
                >
                    {talentData.map((data) => (
                        <SwiperSlide key={data.id}>
                            <TalentCards {...data} className='min-w-min'/>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    );
};

export default ProductionData;