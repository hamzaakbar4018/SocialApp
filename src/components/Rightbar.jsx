import React, { useState } from 'react'
import UserDataCard from '../Cards/UserDataCard'
import Conneections from '../Cards/Conneections'


const Rightbar = () => {
  const notifyData = [
    {
      "image": "https://randomuser.me/api/portraits/men/1.jpg",
      "username": "john_doe",
      "text": "Great post! Keep it up!"
    },
    {
      "image": "https://randomuser.me/api/portraits/women/2.jpg",
      "username": "jane_smith",
      "text": "Loved this! Can't wait for more."
    },
    {
      "image": "https://randomuser.me/api/portraits/men/3.jpg",
      "username": "mark_twain",
      "text": "This was really insightful, thank you."
    },
    {
      "image": "https://randomuser.me/api/portraits/women/4.jpg",
      "username": "emily_rose",
      "text": "Your content is always so inspiring!"
    },
    {
      "image": "https://randomuser.me/api/portraits/men/5.jpg",
      "username": "alexander_hamilton",
      "text": "Great read! Thanks for sharing."
    }
  ]
  const reqData = [
    {
      "image": "https://randomuser.me/api/portraits/men/10.jpg",
      "username": "michael_scott",
      "description": "Actor"
    },
    {
      "image": "https://randomuser.me/api/portraits/women/20.jpg",
      "username": "pam_beesly",
      "description": "Director"
    },
    {
      "image": "https://randomuser.me/api/portraits/men/30.jpg",
      "username": "jim_halpert",
      "description": "Producer"
    },
    {
      "image": "https://randomuser.me/api/portraits/women/40.jpg",
      "username": "dwight_schrute",
      "description": "Actor"
    },
    {
      "image": "https://randomuser.me/api/portraits/men/50.jpg",
      "username": "angela_martin",
      "description": "Director"
    },
    {
      "image": "https://randomuser.me/api/portraits/women/60.jpg",
      "username": "kelly_kapoor",
      "description": "Producer"
    },
    {
      "image": "https://randomuser.me/api/portraits/men/70.jpg",
      "username": "ryan_howard",
      "description": "Actor"
    },
    {
      "image": "https://randomuser.me/api/portraits/women/80.jpg",
      "username": "andy_bernard",
      "description": "Director"
    },
    {
      "image": "https://randomuser.me/api/portraits/men/90.jpg",
      "username": "toby_flenderson",
      "description": "Producer"
    },
    {
      "image": "https://randomuser.me/api/portraits/women/100.jpg",
      "username": "meredith_palmer",
      "description": "Actor"
    }
  ]
  
  const [visibleNotifyCount, setVisibleNotifyCount] = useState(2)
  const [isNotifyExpanded, setIsNotifyExpanded] = useState(false)
  const [visibleConnCount, setVisibleConnCount] = useState(2)
  const [isConnExpanded, setIsConnExpanded] = useState(false)

  const toggleNotifyShowMore = () => {
    if (isNotifyExpanded) {
      setVisibleNotifyCount(2)
    } else {
      setVisibleNotifyCount(notifyData.length)
    }
    setIsNotifyExpanded(!isNotifyExpanded)
  }

  const toggleConnShowMore = () => {
    if (isConnExpanded) {
      setVisibleConnCount(2)
    } else {
      setVisibleConnCount(reqData.length)
    }
    setIsConnExpanded(!isConnExpanded)
  }

  return (
    <div className='border-l px-3 '>
      <div className='py-8 px-2'>
        <h1>Notifications</h1>
      </div>
      <div className='px-2 flex flex-col gap-3'>
        {
          notifyData.slice(0, visibleNotifyCount).map((data, index) => (
            <UserDataCard key={index} image={data.image} username={data.username} text={data.text} />
          ))
        }
      </div>
      <div className='px-2 flex justify-center items-center py-4'>
        <button
          onClick={toggleNotifyShowMore}
          className='text-blue-500 hover:underline'
        >
          {isNotifyExpanded ? 'Show Less' : 'Show All'}
        </button>
      </div>

      <div className="connections px-2 flex flex-col gap-3 mt-8">
        <h1>Connections Requests</h1>
        {
          reqData.slice(0, visibleConnCount).map((data, index) => (
            <Conneections key={index} image={data.image} username={data.username} description={data.description} />
          ))
        }
      </div>
      <div className='px-2 flex justify-center items-center py-4'>
        <button
          onClick={toggleConnShowMore}
          className='text-blue-500 hover:underline'
        >
          {isConnExpanded ? 'Show Less' : 'Show All'}
        </button>
      </div>
    </div>
  )
}

export default Rightbar
