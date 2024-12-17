// import React from "react";
// import TalentCards from "./TalentCards";
// import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
// import { Swiper, SwiperSlide } from "swiper/react";
// import "swiper/css";
// import "swiper/css/navigation";
// import "swiper/css/pagination";
// import "swiper/css/scrollbar";
// import '../../CSS/Connections.css';


// const ProductionData = ({ productionData,
//     onFollow,
//     connectionStatus }) => {
//     if (!productionData || !Array.isArray(productionData)) {
//         console.error("productionData is not a valid array.");
//         return <p>No data available</p>;
//     }
//     console.log(connectionStatus)
//     const production = true;
//     return (
//         <div className="container overflow-x-hidden">
//             <div className="swiper-grid-container">
//                 <Swiper
//                     modules={[Navigation, Pagination, Scrollbar, A11y]}
//                     spaceBetween={10}
//                     scrollbar={{ draggable: true }}
//                     loop={true}
//                     loopFillGroupWithBlank={false}
//                     navigation={false}
//                     className="swiper-container w-full overflow-hidden"
//                     breakpoints={{
//                         640: {
//                             slidesPerView: 1,
//                         },
//                         768: {
//                             slidesPerView: 2,
//                         },
//                         1024: {
//                             slidesPerView: 3,
//                         },
//                         1280: {
//                             slidesPerView: 6,
//                         },
//                     }}
//                 >
//                     {productionData.map((data) => (
//                         <SwiperSlide
//                             key={data.id}
//                             className="!w-auto max-w-[17%] min-w-[260px]"
//                         >
//                             <TalentCards
//                                 production={production}
//                                 {...data}
//                                 onFollow={onFollow}
//                                 connectionStatus={connectionStatus}
//                             />
//                         </SwiperSlide>
//                     ))}
//                 </Swiper>
//             </div>
//         </div>
//     );
// };

// export default ProductionData;
import React from "react";
import TalentCards from "./TalentCards";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import '../../CSS/Connections.css';

const ProductionData = ({ 
  productionData, 
  onFollow, 
  connectionStatus 
}) => {
  // Validate input data
  if (!productionData || !Array.isArray(productionData)) {
    console.error("productionData is not a valid array.");
    return <p>No data available</p>;
  }

  const production = true;

  return (
    <div className="container overflow-x-hidden">
      <div className="swiper-grid-container">
        <Swiper
          modules={[Navigation, Pagination, Scrollbar, A11y]}
          spaceBetween={10}
          scrollbar={{ draggable: true }}
          loop={true}
          loopFillGroupWithBlank={false}
          navigation={false}
          className="swiper-container w-full overflow-hidden"
          breakpoints={{
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
            1280: { slidesPerView: 6 },
          }}
        >
          {productionData.map((data) => {
            // Determine the connection status for this specific production house
            const status = typeof connectionStatus === 'object' 
              ? connectionStatus[data.docID] || 'Follow'
              : 'Follow';

            return (
              <SwiperSlide
                key={data.docID}
                className="!w-auto max-w-[17%] min-w-[260px]"
              >
                <TalentCards
                  production={production}
                  {...data}
                  onFollow={() => onFollow(data)}
                  connectionStatus={status}
                />
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </div>
  );
};

export default ProductionData;
