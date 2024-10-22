import React, { createContext } from 'react'
export const IndustryData = createContext();
const IndustryContext = ({children  }) => {
    const talentData = [
        {
            id: 1,
            userpic: "https://randomuser.me/api/portraits/men/1.jpg",
            name: "Nabeel",
            text: "Actor | Model",
        },
        {
            id: 2,
            userpic: "https://randomuser.me/api/portraits/men/14.jpg",
            name: "Jane Smith",
            text: "Model | Director",
        },
        {
            id: 3,
            userpic: "https://randomuser.me/api/portraits/men/12.jpg",
            name: "Michael Johnson",
            text: "Actor | Director",
        },
        {
            id: 4,
            userpic: "https://randomuser.me/api/portraits/women/13.jpg",
            name: "Emily Davis",
            text: "Model",
        },
        {
            id: 5,
            userpic: "https://randomuser.me/api/portraits/men/14.jpg",
            name: "Chris Brown",
            text: "Actor",
        },
        {
            id: 6,
            userpic: "https://randomuser.me/api/portraits/women/15.jpg",
            name: "Sophia Wilson",
            text: "Director",
        },
        {
            id: 7,
            userpic: "https://randomuser.me/api/portraits/men/16.jpg",
            name: "David Miller",
            text: "Actor | Model | Director",
        },
        {
            id: 8,
            userpic: "https://randomuser.me/api/portraits/women/17.jpg",
            name: "Olivia Taylor",
            text: "Model | Actor",
        },
    ];
    return (
        <div>
            <IndustryData.Provider value={talentData}>
            {children}
            </IndustryData.Provider>
        </div>
    )
}

export default IndustryContext