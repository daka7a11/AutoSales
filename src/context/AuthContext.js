import { createContext, useState } from "react";

import useRequest from "../hooks/useRequest";
import useUser from "../hooks/useUser";

export const AuthContext = createContext();

const endpoints = {
  login: "/users/login",
  register: "/users/register",
  logout: "/users/logout",
};

export const AuthProvider = ({ children }) => {
  const [error, setError] = useState(null);

  const { getUserData, setUserData, clearUserData } = useUser();
  const request = useRequest();

  const login = async (email, pass) => {
    try {
      const { password, ...user } = await request.post(endpoints.login, {
        email,
        password: pass,
      });
      setUserData(user);
    } catch (error) {
      setError(error.message);
      throw error;
    }
  };

  const register = async (userData) => {
    try {
      const { password, ...user } = await request.post(
        endpoints.register,
        userData
      );
      setUserData(user);
    } catch (error) {
      setError(error.message);
      throw error;
    }
  };

  const logout = async () => {
    await request.get(endpoints.logout);
    clearUserData();
  };

  const clearError = () => {
    setError(null);
  };

  const providerValue = {
    getUserData,
    setUserData,
    clearUserData,
    login,
    register,
    logout,
    error,
    clearError,
  };
  return (
    <AuthContext.Provider value={providerValue}>
      {children}
    </AuthContext.Provider>
  );
};
