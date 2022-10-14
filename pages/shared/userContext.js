import { createContext, useContext, useState } from 'react';

const UserContext = createContext();

export function UserWrapper({ children }) {
  const [userDetails , setUserDetails] = useState({
    isLoggedIn : false,
    info:{}
  })

  return (
    <UserContext.Provider value={[userDetails , setUserDetails]}>
      {children}
    </UserContext.Provider>
  );
}

export function useUserContext() {
  return useContext(UserContext);
}