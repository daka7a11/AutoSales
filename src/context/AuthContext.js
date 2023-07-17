import { createContext } from "react";

import useRequest from "../hooks/useRequest";
import useUser from "../hooks/useUser";

export const AuthContext = createContext();

const endpoints = {
  login: "/users/login",
  register: "/users/register",
  logout: "/users/logout",
};

export const AuthProvider = ({ children }) => {
  const { getUserData, setUserData, clearUserData } = useUser();
  const request = useRequest();

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

  const providerValue = {
    getUserData,
    setUserData,
    clearUserData,
    login,
    register,
    logout,
  };
  return (
    <AuthContext.Provider value={providerValue}>
      {children}
    </AuthContext.Provider>
  );
};
