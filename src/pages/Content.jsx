import React from 'react';

const Content = () => {
  return (
    <div className="w-full h-screen bg-white">
      <div className="w-full h-full">
        <iframe
          src="https://www.youtube.com/@dhruvrathee/videos"
          className="w-full h-full border-none"
          title="YouTube Channel"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        />
      </div>
    </div>
  );
};

export default Content;