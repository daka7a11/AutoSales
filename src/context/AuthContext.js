import { createContext, useContext, useEffect, useState } from "react";

import useRequest from "../hooks/useRequest";

export const AuthContext = createContext();

const initialUser = null;

const endpoints = {
  login: "/users/login",
  register: "/users/register",
  logout: "/users/logout",
};

export const AuthProvider = ({ children }) => {
  const [error, setError] = useState(null);

  const [user, setUser] = useState();

  useEffect(() => {
    const storedUser = sessionStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      return;
    }
    setUser(initialUser);
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

  const request = useRequest(getUserData, clearUserData);

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

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext must be used within a AuthContextProvider");
  }
  return context;
};
