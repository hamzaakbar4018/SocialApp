import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Landingpage from './pages/Landingpage';
import Login from './pages/Login/Login';
import Verify from './pages/Login/Verify';
import Home from './pages/Home';
import './CSS/App.css';

const App = () => {
  return (
    <div className='root'>
      <Routes>
        <Route path='/' element={<Landingpage />} />
        <Route path='/login' element={<Login />} />
        <Route path='/verify' element={<Verify />} />
        <Route path='/home' element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;
