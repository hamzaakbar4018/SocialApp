import { collection, getDocs } from 'firebase/firestore';
import React, { createContext, useEffect, useState } from 'react'
import { db } from '../Services/Firebase';

export const IndustryData = createContext();
const IndustryContext = ({children}) => {
    const [talentData,setTalentData] = useState([]);

    const fetchUsers = async () => {
        try {
            const querySnapShot = await getDocs(collection(db,"userCollection"));
            const allUsers = querySnapShot.docs.map((doc)=>({
                id:doc.id,
                ...doc.data(),
            }))
            setTalentData(allUsers);
            // console.log("All users",allUsers)
        } catch (error) {
            console.log("Error in fetching users talent ",error)
        }
    }

    useEffect(()=>{
        fetchUsers();
    },[])






    return (
        <div>
            <IndustryData.Provider value={talentData}>
            {children}
            </IndustryData.Provider>
        </div>
    )
}

export default IndustryContext