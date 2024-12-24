import React from 'react';
import MyWorkCard from '../../Cards/ProfileCards/MyWorkVideos';
import useAuthor from '../../Hooks/useAuthor';
import MyWorkPictures from '../../Cards/ProfileCards/MyWorkPictures';
const ProfileMyWork = () => {
  const { authorInfo , fetchAuthorAndPosts } = useAuthor();
  const { videos, images, loading , author } = authorInfo;
  const userID= author?.id;
  if (loading) {
    return (
      <>
        <div className="containerVideos pl-1 md:w-auto w-screen">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white rounded-lg shadow-sm">
                <div className="h-48 bg-gray-200 animate-pulse rounded-t-lg" />
                <div className="p-4">
                  <div className="h-4 bg-gray-200 animate-pulse rounded w-3/4 mb-2" />
                  <div className="h-4 bg-gray-200 animate-pulse rounded w-1/2" />
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="containerPictures pl-1 md:w-auto w-screen">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-gray-200 animate-pulse rounded-lg h-48" />
            ))}
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="containerVideos pl-1 md:w-auto w-screen">
        <MyWorkCard videos={videos} userId={userID} fetchAuthorAndPosts={fetchAuthorAndPosts} />
      </div>
      <div className="containerPictures pl-1 md:w-auto w-screen">
        <MyWorkPictures pictures={images} fetchAuthorAndPosts={fetchAuthorAndPosts} userId={userID} />
      </div>
    </>
  );
};

export default ProfileMyWork;