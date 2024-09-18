import React from 'react';
import TalentCards from './Talent/TalentCards';
import land4cardimg from '../assets/Images/land4cardimg.png';

import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import '../CSS/Connections.css';
import UserCard from './CastingCards/UserCard';

const LandingPagetalent = () => {
    const talentData = [
        {
          title: "Short Film",
          img: land4cardimg,
          username: "Hamza Akbar",
          description: "We're looking for the talented actors for our upcoming short film.",
          location: "Islamabad",
          type: "Short Film",
          shoot: "25 Days",
          budget: "$25K",
          age: "12",
          height: "5 ft",
          gender: "Male",
          shootdays: "30",
          crew: "1",
          landingpage: true // Added field
        },
        {
          title: "Short Film",
          img: land4cardimg,
          username: "Sayam",
          description: "We're looking for the talented actors for our upcoming short film.",
          location: "Islamabad",
          type: "Short Film",
          shoot: "25 Days",
          budget: "$25K",
          age: "12",
          height: "5 ft",
          gender: "Male",
          shootdays: "30",
          crew: "1",
          landingpage: true // Added field
        },
        {
          title: "Short Film",
          img: land4cardimg,
          username: "Hamza Akbar",
          description: "We're looking for the talented actors for our upcoming short film.",
          location: "Islamabad",
          type: "Short Film",
          shoot: "25 Days",
          budget: "$25K",
          age: "12",
          height: "5 ft",
          gender: "Male",
          shootdays: "30",
          crew: "1",
          landingpage: true // Added field
        },
        {
          title: "Short Film",
          img: land4cardimg,
          username: "Sayam",
          description: "We're looking for the talented actors for our upcoming short film.",
          location: "Islamabad",
          type: "Short Film",
          shoot: "25 Days",
          budget: "$25K",
          age: "12",
          height: "5 ft",
          gender: "Male",
          shootdays: "30",
          crew: "1",
          landingpage: true // Added field
        },
        {
          title: "Short Film",
          img: land4cardimg,
          username: "Hamza Akbar",
          description: "We're looking for the talented actors for our upcoming short film.",
          location: "Islamabad",
          type: "Short Film",
          shoot: "25 Days",
          budget: "$25K",
          age: "12",
          height: "5 ft",
          gender: "Male",
          shootdays: "30",
          crew: "1",
          landingpage: true // Added field
        },
        {
          title: "Short Film",
          img: land4cardimg,
          username: "Sayam",
          description: "We're looking for the talented actors for our upcoming short film.",
          location: "Islamabad",
          type: "Short Film",
          shoot: "25 Days",
          budget: "$25K",
          age: "12",
          height: "5 ft",
          gender: "Male",
          shootdays: "30",
          crew: "1",
          landingpage: true // Added field
        },
        {
          title: "Short Film",
          img: land4cardimg,
          username: "Sayam",
          description: "We're looking for the talented actors for our upcoming short film.",
          location: "Islamabad",
          type: "Short Film",
          shoot: "25 Days",
          budget: "$25K",
          age: "12",
          height: "5 ft",
          gender: "Male",
          shootdays: "30",
          crew: "1",
          landingpage: true // Added field
        },
        {
          title: "Short Film",
          img: land4cardimg,
          username: "Sayam",
          description: "We're looking for the talented actors for our upcoming short film.",
          location: "Islamabad",
          type: "Short Film",
          shoot: "25 Days",
          budget: "$25K",
          age: "12",
          height: "5 ft",
          gender: "Male",
          shootdays: "30",
          crew: "1",
          landingpage: true // Added field
        }
      ];
      
    return (
        <div className="container min-w-full mb-20 overflow-x-auto">
            <div className="swiper-grid-container w-full">
                <Swiper
                    modules={[Navigation, Pagination, Scrollbar, A11y]}
                    spaceBetween={10}
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
                            slidesPerView: 6,
                        },
                    }}
                >
                    {talentData.map((data) => (
                        <SwiperSlide key={data.id} className="md:min-w-[350px] md:min-h-[300px]">
                            <UserCard {...data} />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    );
};

export default LandingPagetalent;

