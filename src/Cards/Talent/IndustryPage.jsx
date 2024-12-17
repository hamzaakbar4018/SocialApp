import React, { useContext } from 'react';
import { IndustryData } from '../../Context/IndustryContext';
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import '../../CSS/Connections.css';
import DramaCards from './DramaCards';
import Conneections from '../Conneections';
const IndustryPage = ({ network, reqData, onAccept, onReject, onConnect, connectionStatus , landingtalent }) => {
    const talentData = useContext(IndustryData);
    const dummyId = "YTHetwednqeLYoraizuJ4PLFFlp2";
    const getConnectionStatus = (user) => {
        // If network prop is true, use reqData
        const dataToUse = network ? reqData : talentData;

        // Check if the current user's ID is in the targeted user's requested array
        if (user.received && user.received.includes(dummyId)) {
            return 'requested';
        }

        // Check if the current user's ID is in the targeted user's connected array
        if (user.connected && user.connected.includes(dummyId)) {
            return 'connected';
        }

        return 'connect';
    };

    return (
        <div className="container overflow-x-hidden ">
            <div className="swiper-grid-container">
                <Swiper
                    modules={[Navigation, Pagination, Scrollbar, A11y]}
                    spaceBetween={10}
                    navigation={false}
                    loop={true}
                    loopFillGroupWithBlank={true}
                    scrollbar={{ draggable: true }}
                    className={`swiper-container w-full overflow-hidden`}
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
                                <SwiperSlide key={index} className="!w-auto max-w-[17%] min-w-[260px]">
                                    <Conneections
                                        image={data.image}
                                        username={data.username}
                                        description={data.description}
                                        network={network}
                                        user={data.user}
                                        onAccept={onAccept}
                                        onReject={onReject}
                                        connectionStatus={connectionStatus}

                                    />
                                </SwiperSlide>
                            ))
                        ) : (
                            <div>
                                {
                                    talentData.map((data) => (
                                        <SwiperSlide key={data.id} className={`!w-auto max-w-[17%] min-w-[260px] ${
                                            landingtalent ? '!w-auto max-w-[30%] min-w-[260px] hove:scale-[1.1] transition-transform duration-300 ease-in-out ' : ''
                                          }`}>
                                            <DramaCards
                                            image={data.image}
                                            firstName={data.firstName}
                                            categoryName={data.categoryName}
                                            docID={data.docID}
                                            onConnect={onConnect}
                                            connectionStatus={getConnectionStatus(data)}
                                            network={network}
                                            landingtalent={landingtalent}
                                            // landingtalent={!network}
                                        />
                                        </SwiperSlide>
                                    ))

                                }
                                {/* {(network ? reqData : talentData).map((data) => (
                                    <SwiperSlide key={data.docID}>
                                        <TalentCards
                                            image={data.image}
                                            firstName={data.firstName}
                                            categoryName={data.categoryName}
                                            docID={data.docID}
                                            onConnect={onConnect}
                                            connectionStatus={getConnectionStatus(data)}
                                            network={network}
                                            landingtalent={!network}
                                        />
                                    </SwiperSlide>
                                ))} */}
                            </div>
                        )
                    }
                </Swiper>
            </div>
        </div>
    );
};

export default IndustryPage;
