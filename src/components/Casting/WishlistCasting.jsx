import React from 'react'
import ApplicantsCard from '../../Cards/CastingCards/ApplicantsCard';

const WishlistCasting = () => {
    const dummyDataArray = [
        {
            name: "John Doe",
            applied: "2 Days Ago",
            age: 25,
            height: "6.0 Feet",
            gender: "Male",
            experience: "3 Years",
            image: "https://randomuser.me/api/portraits/men/1.jpg"
        },
        {
            name: "Jane Smith",
            applied: "5 Days Ago",
            age: 28,
            height: "5.6 Feet",
            gender: "Female",
            experience: "4 Years",
            image: "https://randomuser.me/api/portraits/women/1.jpg"
        },
        {
            name: "Michael Johnson",
            applied: "1 Week Ago",
            age: 30,
            height: "5.9 Feet",
            gender: "Male",
            experience: "6 Years",
            image: "https://randomuser.me/api/portraits/men/2.jpg"
        },
        {
            name: "Emily Davis",
            applied: "3 Days Ago",
            age: 26,
            height: "5.4 Feet",
            gender: "Female",
            experience: "2 Years",
            image: "https://randomuser.me/api/portraits/women/2.jpg"
        },
        {
            name: "Daniel Wilson",
            applied: "4 Days Ago",
            age: 29,
            height: "5.8 Feet",
            gender: "Male",
            experience: "5 Years",
            image: "https://randomuser.me/api/portraits/men/3.jpg"
        }
    ];
    const isWishlistCasting = true;
    return (
            <div className='mb-20'>
                {
                    dummyDataArray.map((data, index) => (
                        <ApplicantsCard {...data} WishlistCasting={isWishlistCasting} />
                    ))
                }
            </div>
    )
}

export default WishlistCasting