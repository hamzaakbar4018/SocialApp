import React from 'react'
import postpic from '../../assets/Icons SVG/postpic.png';
import Post from '../../Cards/Post'
const postData = [
    {
        userimage: "https://randomuser.me/api/portraits/men/1.jpg",
        lastActiveTime: "2024-08-20T14:30:00Z",
        username: "Hamza",
        title: "Hi Guys! Something interesting is on it’s way! 3 Days to Go.",
        hashtags: ["#travel", " #adventure"],
        postimage: postpic,
        likesCount: 120,
        commentCount: 35,
        shareCount: 22
    },
    {
        "userimage": "https://randomuser.me/api/portraits/women/2.jpg",
        "lastActiveTime": "2024-08-19T09:15:00Z",
        "username": "jane_smith",
        "hashtags": ["#foodie", "#recipe"],
        "postimage": postpic,
        "likesCount": 98,
        "commentCount": 42,
        "shareCount": 18
    },
    {
        "userimage": "https://randomuser.me/api/portraits/men/3.jpg",
        "lastActiveTime": "2024-08-18T11:45:00Z",
        "username": "mark_twain",
        "hashtags": ["#fitness", "#health"],
        "postimage": postpic,
        "likesCount": 150,
        "commentCount": 50,
        "shareCount": 30
    },
    {
        "userimage": "https://randomuser.me/api/portraits/women/4.jpg",
        "lastActiveTime": "2024-08-17T16:00:00Z",
        "username": "emily_rose",
        "hashtags": ["#fashion", "#style"],
        "postimage": postpic,
        "likesCount": 200,
        "commentCount": 60,
        "shareCount": 40
    },
    {
        "userimage": "https://randomuser.me/api/portraits/men/5.jpg",
        "lastActiveTime": "2024-08-16T08:30:00Z",
        "username": "alexander_hamilton",
        "hashtags": ["#tech", "#innovation"],
        "postimage": postpic,
        "likesCount": 85,
        "commentCount": 20,
        "shareCount": 15
    }
];
const ProfileActivity = () => {
  return (
    <div className='flex flex-col gap-2 p-[2px]'>
        {postData.map((data,index)=>(
            <Post key={index} {...data}/>
        ))}
    </div>
  )
}

export default ProfileActivity