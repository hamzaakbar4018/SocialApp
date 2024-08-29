import React from 'react';
import Sidebar from '../components/Sidebar';
import AboutMain from '../components/AboutMain';

const Home = () => {
    return (
        <div className='flex'>
            <div className='min-w-[19%] sticky top-0 h-screen overflow-y-auto scrollbar-hide'>
                <Sidebar />
            </div>
            <div className='flex-grow'>
                <AboutMain/>
            </div>
        </div>
    );
};

export default Home;
