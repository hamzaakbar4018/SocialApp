import React from "react";
import TalentCards from "./TalentCards";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import '../../CSS/Connections.css';


const ProductionData = ({ productionData }) => {
    if (!productionData || !Array.isArray(productionData)) {
        console.error("productionData is not a valid array.");
        return <p>No data available</p>;
    }

    return (
        <div className="container overflow-x-hidden">
            <div className="swiper-grid-container">
                <Swiper
                    modules={[Navigation, Pagination, Scrollbar, A11y]}
                    spaceBetween={10}
                    scrollbar={{ draggable: true }}
                    loop={true}
                    loopFillGroupWithBlank={false}
                    navigation ={false}
                    onSwiper={(swiper) => console.log("Swiper initialized:", swiper)}
                    onSlideChange={() => console.log("Slide changed")}
                    className="swiper-container w-full overflow-hidden"
                    breakpoints={{
                        640: {
                            slidesPerView: 1,
                        },
                        768: {
                            slidesPerView: 2,
                        },
                        1024: {
                            slidesPerView: 3,
                        },
                        1280: {
                            slidesPerView: 6,
                        },
                    }}
                >
                    {productionData.map((data) => (
                        <SwiperSlide
                            key={data.id}
                            className="!w-auto max-w-[17%] min-w-[260px]"
                        >
                            <TalentCards {...data} />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    );
};

export default ProductionData;
