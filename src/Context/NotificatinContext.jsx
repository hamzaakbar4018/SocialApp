import React, { createContext } from 'react'
export const NotificatinData = createContext();
const NotificatinContext = ({children}) => {
    const notifyData = [
        {
            image: "https://randomuser.me/api/portraits/men/1.jpg",
            username: "john_doe",
            text: "Great post! Keep it up!",
            time: "Just Now"
        },
        {
            image: "https://randomuser.me/api/portraits/women/2.jpg",
            username: "jane_smith",
            text: "Loved this! Can't wait for more.",
            time: "1 Day Ago"
        },
        {
            image: "https://randomuser.me/api/portraits/men/3.jpg",
            username: "mark_twain",
            text: "This was really insightful, thank you.",
            time: "24 hours ago"
        },
        {
            image: "https://randomuser.me/api/portraits/women/4.jpg",
            username: "emily_rose",
            text: "Your content is always so inspiring!",
            time: "Just Now"
        },
        {
            image: "https://randomuser.me/api/portraits/men/5.jpg",
            username: "alexander",
            text: "Great read! Thanks for sharing.",
            time: "1 Day Ago"
        },
    ];
    return (
        <div>
            {
                <NotificatinData.Provider value={notifyData}>
                    {children}
                </NotificatinData.Provider>
            }
        </div>
    )
}

export default NotificatinContext