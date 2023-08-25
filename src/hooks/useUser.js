import { useEffect, useState } from "react";

const initialUser = null;

const useUser = () => {
  const [user, setUser] = useState(initialUser);

  useEffect(() => {
    const storedUser = sessionStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);
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
