import React from 'react';

const UserDummy = () => {
    const users = [
        {
          userImg: "https://randomuser.me/api/portraits/men/1.jpg", // Random user image URL
          username: "JohnDoe",
          text: "Actor | Director | Producer"
        },
        {
          userImg: "https://picsum.photos/150?random=2",
          username: "JaneSmith",
          text: "Director | Producer | Screenwriter"
        },
        {
          userImg: "https://picsum.photos/150?random=3",
          username: "MikeJohnson",
          text: "Producer | Actor | Screenwriter"
        },
        {
          userImg: "https://picsum.photos/150?random=4",
          username: "EmilyClark",
          text: "Actor | Screenwriter | Director"
        },
        {
          userImg: "https://picsum.photos/150?random=5",
          username: "ChrisBrown",
          text: "Director | Actor | Producer"
        },
        
      ];

    return (
        <div>
            {
                users.map((data, index) => (
                    <div key={index} className='flex mt-4 justify-start items-center mb-4'>
                        <div className=''>
                            <img src={data.userImg} alt={data.username} className='w-12 h-12 rounded-full' />
                        </div>
                        <div className='flex flex-col ml-4'>
                            <h2 className='text-lg font-semibold'>{data.username}</h2>
                            <p className='text-sm text-gray-600'>{data.text}</p>
                        </div>
                    </div>
                ))
            }
        </div>
    );
}

export default UserDummy;
