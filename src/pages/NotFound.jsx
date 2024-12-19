import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-4">
      <div className="max-w-md w-full space-y-8 text-center">
        <div className="bg-white shadow-lg rounded-lg p-8">
          <h1 className="text-9xl font-bold text-gray-300">404</h1>
          <h2 className="text-3xl font-semibold text-gray-800 mt-4">Page Not Found</h2>
          <p className="text-gray-600 mt-4">
            Oops! The page you are looking for doesn't exist or has been moved.
          </p>
          <div className="mt-6 flex justify-center space-x-4">
            <Link 
              to="/" 
              className="px-6 py-3 bg-black text-white rounded-full hover:bg-gray-800 transition duration-300"
            >
              Go to Home  
            </Link>
            <Link 
              to="/signup" 
              className="px-6 py-3 bg-gray-200 text-black rounded-full hover:bg-gray-300 transition duration-300"
            >
              Sign Up
            </Link>
          </div>
        </div>
        <div className="mt-4 text-center text-gray-500">
          <p>Need help? Contact our support team.</p>
        </div>
      </div>
    </div>
  );
};

export default NotFound;