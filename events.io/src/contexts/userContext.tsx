'use client';

import React, { createContext, ReactNode, useContext, useState } from 'react';

interface UserContextType {
  currentUserProfilePicture: string;
  updateCurrentUserProfilePicture: (profilePicture: string) => void;
}
 
interface UserProviderProps {
  children: ReactNode;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [currentUserProfilePicture, setCurrentUserProfilePicture] =
    useState<string>('');

  const updateCurrentUserProfilePicture = (profilePicture: string) => {
    setCurrentUserProfilePicture(profilePicture);
  };

  return (
    <UserContext.Provider
      value={{ currentUserProfilePicture, updateCurrentUserProfilePicture }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
