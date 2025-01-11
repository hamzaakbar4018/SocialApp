// import React from "react";
// import TalentCards from "./TalentCards";
// import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
// import { Swiper, SwiperSlide } from "swiper/react";
// import "swiper/css";
// import "swiper/css/navigation";
// import "swiper/css/pagination";
// import "swiper/css/scrollbar";
// import '../../CSS/Connections.css';
// import { useAuth } from "../../Context/AuthContext";

// const ProductionData = ({
//   productionData,
//   onFollow,
//   connectionStatus
// }) => {
//   // Validate input data
//   if (!productionData || !Array.isArray(productionData)) {
//     console.error("productionData is not a valid array.");
//     return <p>No data available</p>;
//   }
//   const { currentUser } = useAuth();
//   const production = true;

//   return (
//     <div className="container overflow-x-hidden">
//       <div className="swiper-grid-container">
//         <Swiper
//           modules={[Navigation, Pagination, Scrollbar, A11y]}
//           spaceBetween={10}
//           scrollbar={{ draggable: true }}
//           loop={true}
//           loopFillGroupWithBlank={false}
//           navigation={false}
//           className="swiper-container w-full overflow-hidden"
//           breakpoints={{
//             640: { slidesPerView: 1 },
//             768: { slidesPerView: 2 },
//             1024: { slidesPerView: 3 },
//             1280: { slidesPerView: 6 },
//           }}
//         >
//           {productionData.map((data) => {
//             // Determine the connection status for this specific production house
//             const status = typeof connectionStatus === 'object'
//               ? connectionStatus[data.docID] || 'Follow'
//               : 'Follow';

//             return (
//               <SwiperSlide
//                 key={data.docID}
//                 className="!w-auto max-w-[17%] min-w-[260px]"
//               >
//                 <TalentCards
//                   production={production}
//                   currentUser={currentUser}
//                   {...data}
//                   onFollow={() => onFollow(data)}
//                   connectionStatus={status}
//                 />
//               </SwiperSlide>
//             );
//           })}
//         </Swiper>
//       </div>
//     </div>
//   );
// };

// export default ProductionData;
import React from "react";
import TalentCards from "./TalentCards";
import { useAuth } from "../../Context/AuthContext";

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
  
  const { currentUser } = useAuth();
  const production = true;

  return (
    <div className="2xl:w-[80vw] w-[100vw] md:w-[78vw] overflow-x-auto hide-scrollbar">
      <div className="carousel flex gap-4 px-4 py-2 pb-4">
        {productionData.map((data) => {
          // Determine the connection status for this specific production house
          const status = typeof connectionStatus === 'object'
            ? connectionStatus[data.docID] || 'Follow'
            : 'Follow';

          return (
            <div
              key={data.docID}
              className="
                carousel-item flex-shrink-0
                w-[65vw] md:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1rem)] xl:w-[calc(20%-1rem)]
                min-w-[260px] max-w-[300px]
                transition-transform duration-300 ease-in-out
                relative
              "
              style={{
                scrollSnapAlign: 'start'
              }}
            >
              <TalentCards
                production={production}
                currentUser={currentUser}
                {...data}
                onFollow={() => onFollow(data)}
                connectionStatus={status}
              />
            </div>
          );
        })}
        {/* Add empty div at the end to prevent sidebar hiding */}
        <div className="w-4 flex-shrink-0" aria-hidden="true" />
      </div>
    </div>
  );
};

export default ProductionData;