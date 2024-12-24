import React from 'react';
import { RiFileWarningLine, RiSearchLine, RiDatabase2Line } from 'react-icons/ri';
import { BiLoader } from 'react-icons/bi';

const NoDataFound = ({ message = "No data found", description = "We couldn't find any data to display" }) => {
  return (
    <div className="min-h-[500px]  flex flex-col items-center justify-center m-[2px] p-8 bg-white rounded">
      <div className="relative mb-8">
        <div className="absolute -left-12 top-0 animate-bounce delay-100">
          <RiFileWarningLine size={32} className="text-blue-300" />
        </div>
        <div className="absolute -right-12 top-4 animate-bounce delay-300">
          <RiDatabase2Line size={32} className="text-purple-300" />
        </div>
        <div className="relative animate-pulse">
          <RiSearchLine size={80} className="text-gray-300" />
        </div>
        <div className="absolute left-1/2 -translate-x-1/2 -bottom-6">
          <BiLoader size={24} className="text-gray-400 animate-spin" />
        </div>
      </div>
      
      <h3 className="text-2xl font-semibold text-gray-800 mb-2">{message}</h3>
      <p className="text-gray-500 text-center max-w-md mb-6">{description}</p>
      
      <div className="flex gap-2">
        <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" />
        <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce delay-150" />
        <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce delay-300" />
      </div>
    </div>
  );
};

export default NoDataFound;