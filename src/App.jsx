import React from 'react';
import { Routes, Route, Outlet, Navigate } from 'react-router-dom';
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
import Profilee from './components/SeperateProfile/Profile';
import UserActivity from './components/SeperateProfile/UserActivity';
import UserAbout from './components/SeperateProfile/UserAbout';
import UserMywork from './components/SeperateProfile/UserMywork';
import PostDetail from './components/PostDetail';
import AllCategories from './pages/AllCategories';
import UserList from './pages/UserList';
import Content from './pages/Content';

const MainLayout = () => (
  <div className='routing flex bg-white'>
    <div className='min-w-[19%] max-w-[19%] hidden md:block sticky top-0 h-screen overflow-y-auto'>
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

const VisibleLayout = () => (
  <div className='routing flex bg-white'>
    <div className='min-w-[19%] max-w-[19%] hidden md:block sticky top-0 h-screen overflow-y-auto'>
      <Sidebar />
    </div>
    <div className='flex-grow w-auto'>
      <Outlet />
    </div>
  </div>
)

const App = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route element={<AuthLayout />}>
        <Route path='/' element={<Landingpage />} />
        <Route path='/login' element={<Login />} />
        <Route path='/content' element={<Content />} />
        <Route path='/verify' element={<Verify />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/terms' element={<Public_terms />} />
        <Route path="/post/:postID" element={<PostDetail />} />
        <Route path="/categories" element={<AllCategories />} />
        <Route path="/users/:categoryName" element={<UserList />} />
        <Route path='*' element={<NotFound />} />
        <Route path="/userprofile/:id/*" element={<Profilee />}>
        {/* Default Route Redirect */}
        <Route index element={<Navigate to="userprofileactivity" replace />} />

        {/* Sub-routes */}
        <Route path="userprofileactivity" element={<UserActivity />} />
        <Route path="userprofileabout" element={<UserAbout />} />
        <Route path="userprofilemywork" element={<UserMywork />} />
      </Route>
      </Route>

      {/* Public Routes with Sidebar */}
      <Route element={<VisibleLayout />}>
        <Route path="/talent" element={<Talent />} />
        <Route path="/casting" element={<Casting />}>
          <Route path="calls" element={<Calls />} />
          <Route path="applied" element={<Applied />} />
          <Route path="mycalls/:callId?" element={<MyCasting />}>
            <Route path="received" element={<ReceivedCasting />} />
            <Route path="rejected" element={<RejectedCasting />} />
            <Route path="wishlist" element={<WishlistCasting />} />
          </Route>
        </Route>
      </Route>

      {/* Protected Routes */}
      <Route
        element={
          <ProtectedRoute>
            <MainLayout />
          </ProtectedRoute>
        }
      >
        <Route path='/home' element={<Home />} />
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
      </Route>
    </Routes>
  );
};
export default App;
