import React from 'react';
import land4cardimg from '../assets/Icons SVG/land4cardimg.png';
import useFetchCastingCall from '../Hooks/useFetchCastingCall'
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import '../CSS/Connections.css';
import UserCard from './CastingCards/UserCard';
import Load from './../components/Loader/Load'

const LandingPagetalent = ({landingpage}) => {
  const { isLoading, allCallsNUsers } = useFetchCastingCall();
        // consol   e.log("data", allCallsNUsers);
      // const landingpage = true;
      return (
        isLoading ? (
          <div className="h-36">
            <Load/>
          </div>
        ) : (
          <div className="container min-w-full mb-20 overflow-x-auto">
            <div className={`swiper-grid-container  ${landingpage && 'min-w-full'} w-full`}>
                <Swiper
                    modules={[Navigation, Pagination, Scrollbar, A11y]}
                    spaceBetween={10}
                    scrollbar={{ draggable: true }}
                    // onSwiper={(swiper) => console.log(swiper)}
                    // onSlideChange={() => console.log("slide change")}
                    className={`swiper-container ${landingpage && 'min-w-[300px] md:pl-[66px]'} w-full overflow-hidden`}
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
                            slidesPerView: 6,
                        },
                    }}
                >
                    {allCallsNUsers.map((data) => (
                        <SwiperSlide key={data.id} className={`md:min-w-[350px] 2xl:min-w-[440px] 2xl:min-h-[400px] md:min-h-[300px] ${landingpage ? 'p-4 hover:scale-105 hover-rounded-2xl transition-transform duration-300' : ''}`}>
                            <UserCard {...data} location={data?.city} day={data?.duration} type={data?.roleTitle} img={data?.user?.image} landingpage={landingpage}/>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
        )
    );
};

export default LandingPagetalent;

