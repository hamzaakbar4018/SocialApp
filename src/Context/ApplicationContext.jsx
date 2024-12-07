import React, { createContext, useState } from 'react';
export const ApplicationData = createContext();

const ApplicationContext = ({ children }) => {
    const [applicationCollection, setApplicationCollection] = useState([]);
    const [myCallID, setMyCallID] = useState('');

    return (
        <ApplicationData.Provider value={{ applicationCollection, myCallID, setApplicationCollection, setMyCallID }}>
            {children}
        </ApplicationData.Provider>
    );
}

export default ApplicationContext;
