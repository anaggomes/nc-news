import { createContext, useEffect, useState } from "react";
import { getUserByUsername } from "../apis/apis";

export const UserContext = createContext();

export function UserProvider({ children }) {
  const [userLogIn, setUserLogIn] = useState({});

  // useEffect(() => {
  //   getUserByUsername("cooljmessy").then(({ user }) => {
  //     setUserLogIn(user);
  //   });
  // }, []);
  return (
    <UserContext.Provider value={{ userLogIn, setUserLogIn }}>
      {children}
    </UserContext.Provider>
  );
}
