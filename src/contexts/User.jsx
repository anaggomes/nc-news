import { createContext, useState } from "react";

export const UserContext = createContext();

export function UserProvider({ children }) {
  const [userLogIn, setUserLogIn] = useState({});

  return (
    <UserContext.Provider value={{ userLogIn, setUserLogIn }}>
      {children}
    </UserContext.Provider>
  );
}
