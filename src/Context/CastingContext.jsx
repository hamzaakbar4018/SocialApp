// CastingContext.js
import React, { createContext, useContext, useState, useCallback } from 'react';
import { useCastingData } from '../Hooks/useCastingData';

const CastingContext = createContext();

export const CastingProvider = ({ children }) => {
  const [currentCallId, setCurrentCallId] = useState(null);
  const {
    receivedUsers,
    acceptedUsers,
    rejectedUsers,
    isLoading,
    error,
    refreshData,
    handleStatusUpdate
  } = useCastingData(currentCallId);

  const setCallId = useCallback((id) => {
    setCurrentCallId(id);
  }, []);

  const value = {
    receivedUsers,
    acceptedUsers,
    rejectedUsers,
    isLoading,
    error,
    refreshData,
    handleStatusUpdate,
    setCallId,
    currentCallId
  };

  return (
    <CastingContext.Provider value={value}>
      {children}
    </CastingContext.Provider>
  );
};

export const useCastingContext = () => {
  const context = useContext(CastingContext);
  if (!context) {
    throw new Error('useCastingContext must be used within a CastingProvider');
  }
  return context;
};