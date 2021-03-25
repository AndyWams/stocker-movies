import React, { createContext, useState, useEffect } from "react";
import jwtDecode from "jwt-decode";

export const UserContext = createContext();
UserContext.displayName = "UserContext";

export const UserProvider = (props) => {
  const [user, setUser] = useState();
  useEffect(() => {
    try {
      const jwt = localStorage.getItem("token");
      const user = jwtDecode(jwt);
      setUser(user);
    } catch (ex) {}
  }, [setUser]);

  return (
    <UserContext.Provider value={[user, setUser]}>
      {props.children}
    </UserContext.Provider>
  );
};
