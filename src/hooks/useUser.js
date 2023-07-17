import { useState } from "react";

const initialUser = null;

const useUser = () => {
  const [user, setUser] = useState(initialUser);
  const getUserData = () => {
    return user;
  };
  const setUserData = (user) => {
    setUser(user);
    sessionStorage.setItem("user", JSON.stringify(user));
  };
  const clearUserData = () => {
    setUser(initialUser);
    sessionStorage.removeItem("user");
  };

  return { getUserData, setUserData, clearUserData };
};

export default useUser;
