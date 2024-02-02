// src/scenes/userRole/UserRoleContext.tsx
import React, { createContext, useContext, ReactNode, useState } from 'react';

type UserRoleContextType = {
  userRole: 'driver' | 'passenger';
  setUserRole: (role: 'driver' | 'passenger') => void;
};

const defaultState: UserRoleContextType = {
  userRole: 'passenger',
  setUserRole: () => {}
};

const UserRoleContext = createContext<UserRoleContextType>(defaultState);

type UserRoleProviderProps = {
  children: ReactNode;
};

export const UserRoleProvider: React.FC<UserRoleProviderProps> = ({ children }) => {
  const [userRole, setUserRole] = useState<'driver' | 'passenger'>('driver');

  return (
    <UserRoleContext.Provider value={{ userRole, setUserRole }}>
      {children}
    </UserRoleContext.Provider>
  );
};

export const useUserRole = () => useContext(UserRoleContext);
