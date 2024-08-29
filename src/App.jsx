import React from 'react';
import { Routes, Route } from 'react-router-dom';
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
import Profile from './pages/Profile';  // Import Profile page
import ProfileActivity from './components/ProfileActivity';
import ProfileAbout from './components/ProfileAbout';
import ProfileMywork from './components/ProfileMywork';

const App = () => {
  return (
    <div className='routing'>
      <Routes>
        <Route path='/' element={<Landingpage />} />
        <Route path='/login' element={<Login />} />
        <Route path='/verify' element={<Verify />} />
        <Route path='/home' element={<Home />} />
        <Route path='/talent' element={<Talent />} />
        <Route path='/transaction' element={<Transacction />} />
        <Route path='/support' element={<Support />} />
        <Route path='/about' element={<About />} />
        <Route path='/term-policy' element={<Term />} />
        <Route path='/privacy' element={<Privacy />} />

        <Route path='/profile' element={<Profile />}>
          <Route path='profileactivity' element={<ProfileActivity />} />
          <Route path='profileabout' element={<ProfileAbout />} />
          <Route path='profilemywork' element={<ProfileMywork />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
