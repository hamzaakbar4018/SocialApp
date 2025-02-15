import React from 'react';
import Main from '../components/Mainpages/Main';
import BottomBar from '../components/BottomBar';

const Home = () => {
    return (
        <div className='w-full'>
            <div className='flex-grow'>
                <Main />
            </div>
                {/* <BottomBar /> */}
        </div>
    );
};

export default Home;
