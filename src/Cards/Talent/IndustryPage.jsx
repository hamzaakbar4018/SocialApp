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

const IndustryPage = ({ image, network,reqData }) => {
    const talentData = useContext(IndustryData);

    return (
        <div className="container overflow-x-hidden">
            <div className="swiper-grid-container">
                <Swiper
                    modules={[Navigation, Pagination, Scrollbar, A11y]}
                    spaceBetween={10}
                    scrollbar={{ draggable: true }}
                    onSwiper={(swiper) => console.log(swiper)}
                    onSlideChange={() => console.log("slide change")}
                    className="swiper-container w-full overflow-hidden"
                    breakpoints={{
                        640: { slidesPerView: 1 },
                        768: { slidesPerView: 2 },
                        1024: { slidesPerView: 3 },
                        1280: { slidesPerView: 6 },
                    }}
                >
                    {
                        network ? (
                            reqData.map((data, index) => (
                                <SwiperSlide key={index} className="max-w-[17%] min-w-[260px]">
                                    <Conneections image={data.image} username={data.username} description={data.description} network={network} />
                                </SwiperSlide>
                            ))
                        ) : (
                            talentData.map((data) => (
                                <SwiperSlide key={data.id} className="max-w-[17%] min-w-[260px]">
                                    <TalentCards {...data} />
                                </SwiperSlide>
                            ))
                        )
                    }
                </Swiper>
            </div>
        </div>
    );
};

export default IndustryPage;
