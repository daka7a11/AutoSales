import { createContext, useState } from "react";

import useRequest from "../hooks/useRequest";

export const AuthContext = createContext();

const initialUser = null;

const endpoints = {
  login: "/users/login",
  register: "/users/register",
  logout: "/users/logout",
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(initialUser);

  const request = useRequest();

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

  const login = async (email, password) => {
    const user = await request.post(endpoints.login, { email, password });

    setUserData(user);
  };

  const register = async (email, password) => {
    const user = await request.post(endpoints.register, { email, password });

    setUserData(user);
  };

  const logout = async () => {
    await request.get(endpoints.logout);
    clearUserData();
  };

  const providerValue = { user, getUserData, setUserData, clearUserData };
  return (
    <AuthContext.Provider value={providerValue}>
      {children}
    </AuthContext.Provider>
  );
};
