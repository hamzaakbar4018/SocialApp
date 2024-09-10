import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Landingpage from './pages/Landingpage';
import Login from './pages/Login/Login';
import Verify from './pages/Login/Verify';
import Home from './pages/Home';
import './CSS/App.css';
import Talent from './pages/Talent';
import Transacction from './pages/Transaction';
import Support from './pages/Support';
import About from './pages/About';
import Term from './pages/Term';
import Privacy from './pages/Privacy';
import Network from './pages/Network';
import Profile from './pages/Profile';
import ProfileActivity from './components/ProfileActivity';
import ProfileAbout from './components/ProfileAbout';
import ProfileMywork from './components/ProfileMywork';
import Casting from './pages/Casting';
import Calls from './components/Casting/Calls';
import Applied from './components/Casting/Applied';
import MyCasting from './components/Casting/MyCasting';
import Chat from './pages/Chat';
import Sidebar from './components/Sidebar';

const App = () => {
  const location = useLocation();
  
  const isLandingPage = location.pathname === '/';

  return (
    <div className='routing flex bg-white'>
      {!isLandingPage && (
        <div className='min-w-[19%] hidden md:block sticky top-0 h-screen overflow-y-auto'>
          <Sidebar />
        </div>
      )}
      <div className={`flex-grow ${isLandingPage ? 'w-full' : 'w-auto'}`}>
        <Routes>
          <Route path='/' element={<Landingpage />} />
          <Route path='/login' element={<Login />} />
          <Route path='/verify' element={<Verify />} />
          <Route path='/home' element={<Home />} />
          <Route path='/talent' element={<Talent />} />
          <Route path='/network' element={<Network />} />
          <Route path='/transaction' element={<Transacction />} />
          <Route path='/support' element={<Support />} />
          <Route path='/about' element={<About />} />
          <Route path='/term-policy' element={<Term />} />
          <Route path='/privacy' element={<Privacy />} />
          <Route path='/chat' element={<Chat />} />

          <Route path='/profile' element={<Profile />}>
            <Route path='profileactivity' element={<ProfileActivity />} />
            <Route path='profileabout' element={<ProfileAbout />} />
            <Route path='profilemywork' element={<ProfileMywork />} />
          </Route>

          <Route path='/casting' element={<Casting />}>
            <Route path='calls' element={<Calls />} />
            <Route path='applied' element={<Applied />} />
            <Route path='mycalls' element={<MyCasting />} />
          </Route>
        </Routes>
      </div>
    </div>
  );
};

export default App;
