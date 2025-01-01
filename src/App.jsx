// import React from 'react';
// import { Routes, Route, useLocation } from 'react-router-dom';
// import Landingpage from './pages/Landingpage';
// import Login from './pages/Login/Login';
// import Verify from './pages/Login/Verify';
// import Home from './pages/Home';
// import './CSS/App.css';
// import Talent from './pages/Talent';
// import Transacction from './pages/Transaction';
// import Support from './pages/Support';
// import About from './pages/About';
// import Term from './pages/Term';
// import Privacy from './pages/Privacy';
// import Network from './pages/Network';
// import Profile from './pages/Profile';
// import ProfileActivity from './components/Profile/ProfileActivity';
// import ProfileAbout from './components/Profile/ProfileAbout';
// import ProfileMywork from './components/Profile/ProfileMywork';
// import Casting from './pages/Casting';
// import Calls from './components/Casting/Calls';
// import Applied from './components/Casting/Applied';
// import MyCasting from './components/Casting/MyCasting';
// import Chat from './pages/Chat';
// import Sidebar from './components/Sidebar';
// import Signup from './pages/Signup/Signup';
// import ReceivedCasting from './components/Casting/ReceivedCasting';
// import RejectedCasting from './components/Casting/RejectedCasting';
// import WishlistCasting from './components/Casting/WishlistCasting';
// import ProtectedRoute from './pages/ProtectedRoute';
// import NotFound from './pages/NotFound';

// const App = () => {
//   const location = useLocation();

//   const isLandingPage = location.pathname === '/';
//   const isNotFoundPage = location.pathname === '*' || location.pathname.includes('/not-found');
//   const isLog = location.pathname === '/login' || location.pathname === '/verify' || location.pathname === '/signup';

//   return (
//     <div className='routing flex bg-white'>
//     {!(isLandingPage || isLog || isNotFoundPage) && (
//       <div className='min-w-[19%] hidden md:block sticky top-0 h-screen overflow-y-auto'>
//         <Sidebar />
//       </div>
//     )}
//       {/* <div className={`flex-grow ${isLandingPage ? 'w-full' : 'w-auto'}`}>
//         <Routes>
//           <Route path='/' element={

//             <Landingpage />} />
//           <Route path='/login' element={<Login />} />
//           <Route path='/verify' element={<Verify />} />
//           <Route path='/signup' element={<Signup />} />
//           <Route path='/home' element={
//             <ProtectedRoute>

//               <Home />
//             </ProtectedRoute>
//           } />
//           <Route path='/talent' element={
//             <ProtectedRoute>
//               <Talent />

//             </ProtectedRoute>
//           } />
//           <Route path='/network' element={<Network />} />
//           <Route path='/transaction' element={<Transacction />} />
//           <Route path='/support' element={<Support />} />
//           <Route path='/about' element={<About />} />
//           <Route path='/term-policy' element={<Term />} />
//           <Route path='/privacy' element={<Privacy />} />
//           <Route path='/chat' element={<Chat />} />

//           <Route path='/profile' element={<Profile />}>
//             <Route path='profileactivity' element={<ProfileActivity />} />
//             <Route path='profileabout' element={<ProfileAbout />} />
//             <Route path='profilemywork' element={<ProfileMywork />} />
//           </Route>

//           <Route path='/casting' element={<Casting />}>
//             <Route path='calls' element={<Calls />} />

//             <Route path='applied' element={<Applied />} />
//             <Route path='mycalls' element={<MyCasting />} >
//               <Route path='received' element={<ReceivedCasting />} />
//               <Route path='rejected' element={<RejectedCasting />} />
//               <Route path='wishlist' element={<WishlistCasting />} />
//             </Route>

//           </Route>
//         </Routes>
//       </div> */}
//       <div className={`flex-grow ${isLandingPage ? 'w-full' : 'w-auto'}`}>
//         <Routes>
//           <Route path='/' element={<Landingpage />} />
//           <Route path='/login' element={<Login />} />
//           <Route path='/verify' element={<Verify />} />
//           <Route path='/signup' element={<Signup />} />

//           <Route path='/home' element={
//             <ProtectedRoute>
//               <Home />
//             </ProtectedRoute>
//           } />

//           <Route path='/talent' element={
//             <ProtectedRoute>
//               <Talent />
//             </ProtectedRoute>
//           } />

//           <Route path='/network' element={
//             <ProtectedRoute>
//               <Network />
//             </ProtectedRoute>
//           } />

//           <Route path='/transaction' element={
//             <ProtectedRoute>
//               <Transacction />
//             </ProtectedRoute>
//           } />

//           <Route path='/support' element={
//             <ProtectedRoute>
//               <Support />
//             </ProtectedRoute>
//           } />

//           <Route path='/about' element={
//             <ProtectedRoute>
//               <About />
//             </ProtectedRoute>
//           } />

//           <Route path='/term-policy' element={
//             <ProtectedRoute>
//               <Term />
//             </ProtectedRoute>
//           } />

//           <Route path='/privacy' element={
//             <ProtectedRoute>
//               <Privacy />
//             </ProtectedRoute>
//           } />

//           <Route path='/chat' element={
//             <ProtectedRoute>
//               <Chat />
//             </ProtectedRoute>
//           } />

//           <Route path='/profile' element={
//             <ProtectedRoute>
//               <Profile />
//             </ProtectedRoute>
//           }>
//             <Route path='profileactivity' element={<ProfileActivity />} />
//             <Route path='profileabout' element={<ProfileAbout />} />
//             <Route path='profilemywork' element={<ProfileMywork />} />
//           </Route>

//           <Route path='/casting' element={
//             <ProtectedRoute>
//               <Casting />
//             </ProtectedRoute>
//           }>
//             <Route path='calls' element={<Calls />} />
//             <Route path='applied' element={<Applied />} />
//             <Route path='mycalls' element={<MyCasting />}>
//               <Route path='received' element={<ReceivedCasting />} />
//               <Route path='rejected' element={<RejectedCasting />} />
//               <Route path='wishlist' element={<WishlistCasting />} />
//             </Route>
//           </Route>
//           <Route path='*' element={<NotFound />} />
//         </Routes>
//       </div>
//     </div>
//   );
// };

// export default App;
// src/App.js
import React from 'react';
import { Routes, Route, Outlet } from 'react-router-dom';
import Landingpage from './pages/Landingpage';
import Login from './pages/Login/Login';
import Verify from './pages/Login/Verify';
import Signup from './pages/Signup/Signup';
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
import ProfileActivity from './components/Profile/ProfileActivity';
import ProfileAbout from './components/Profile/ProfileAbout';
import ProfileMywork from './components/Profile/ProfileMywork';
import Casting from './pages/Casting';
import Calls from './components/Casting/Calls';
import Applied from './components/Casting/Applied';
import MyCasting from './components/Casting/MyCasting';
import Chat from './pages/Chat';
import Sidebar from './components/Sidebar';
import ReceivedCasting from './components/Casting/ReceivedCasting';
import RejectedCasting from './components/Casting/RejectedCasting';
import WishlistCasting from './components/Casting/WishlistCasting';
import ProtectedRoute from './pages/ProtectedRoute';
import Public_terms from './pages/Public_terms';
import NotFound from './pages/NotFound';
import Profilee from './components/SeperateProfile/Profile'
import UserActivity from './components/SeperateProfile/UserActivity'
import UserAbout from './components/SeperateProfile/UserAbout'
import UserMywork from './components/SeperateProfile/UserMywork'

const MainLayout = () => (
  <div className='routing flex bg-white'>
    <div className='min-w-[19%]  hidden md:block sticky top-0 h-screen overflow-y-auto'>
      <Sidebar />
    </div>
    <div className='flex-grow w-auto'>
      <Outlet />
    </div>
  </div>
);

// Layout without Sidebar
const AuthLayout = () => (
  <div className='flex-grow w-full'>
    <Outlet />
  </div>
);

const App = () => {
  return (
    <Routes>
      {/* Routes without Sidebar */}
      <Route element={<AuthLayout />}>
        <Route path='/' element={<Landingpage />} />
        <Route path='/login' element={<Login />} />
        <Route path='/verify' element={<Verify />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/terms' element={<Public_terms />} />
        {/* Not Found Route */}
        <Route path='*' element={<NotFound />} />
      </Route>

      {/* Protected Routes with Sidebar */}
      <Route element={<MainLayout />}>
        <Route
          path='/home'
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path='/talent'
          element={
            <ProtectedRoute>
              <Talent />
            </ProtectedRoute>
          }
        />
        <Route
          path='/network'
          element={
            <ProtectedRoute>
              <Network />
            </ProtectedRoute>
          }
        />
        <Route
          path='/transaction'
          element={
            <ProtectedRoute>
              <Transacction />
            </ProtectedRoute>
          }
        />
        <Route
          path='/support'
          element={
            <ProtectedRoute>
              <Support />
            </ProtectedRoute>
          }
        />
        <Route
          path='/about'
          element={
            <ProtectedRoute>
              <About />
            </ProtectedRoute>
          }
        />
        <Route
          path='/term-policy'
          element={
            <ProtectedRoute>
              <Term />
            </ProtectedRoute>
          }
        />
        <Route
          path='/privacy'
          element={
            <ProtectedRoute>
              <Privacy />
            </ProtectedRoute>
          }
        />
        <Route
          path='/chat'
          element={
            <ProtectedRoute>
              <Chat />
            </ProtectedRoute>
          }
        />
        <Route
          path='/profile'
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        >
          <Route path='profileactivity' element={<ProfileActivity />} />
          <Route path='profileabout' element={<ProfileAbout />} />
          <Route path='profilemywork' element={<ProfileMywork />} />
        </Route>
        <Route path="/userprofile/:id/*" element={<Profilee />}>
          <Route path="userprofileactivity" element={<UserActivity />} />
          <Route path="userprofileabout" element={<UserAbout />} />
          <Route path="userprofilemywork" element={<UserMywork />} />
          {/* Add more nested routes as needed */}
        </Route>
        <Route
          path='/casting'
          element={
            <ProtectedRoute>
              <Casting />
            </ProtectedRoute>
          }
        >
          <Route path='calls' element={<Calls />} />
          <Route path='applied' element={<Applied />} />
          <Route path='mycalls' element={<MyCasting />}>
            <Route path='received' element={<ReceivedCasting />} />
            <Route path='rejected' element={<RejectedCasting />} />
            <Route path='wishlist' element={<WishlistCasting />} />
          </Route>
        </Route>
      </Route>
    </Routes>
  );
};

export default App;
