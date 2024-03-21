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
  const [errors, setErrors] = useState([]);

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
  const setUserData = (userData) => {
    setUser(userData);
    sessionStorage.setItem("user", JSON.stringify(userData));
  };
  const clearUserData = () => {
    setUser(initialUser);
    sessionStorage.removeItem("user");
  };

  const request = useRequest(getUserData, clearUserData);

  const login = async (email, pass) => {
    try {
      const loggedUser = await request.post(endpoints.login, {
        email,
        password: pass,
      });
      setUserData(loggedUser);
      return loggedUser;
    } catch (err) {
      setErrors(err.errors);
      throw err;
    }
  };

  const register = async (userData) => {
    try {
      const registeredUser = await request.post(endpoints.register, userData);

      setUserData(registeredUser);
      return registeredUser;
    } catch (err) {
      setErrors(err.errors);
      throw err;
    }
  };

  const logout = () => {
    const userData = getUserData();
    clearUserData();
    return userData;
  };

  const clearError = () => {
    setErrors(null);
  };

  const providerValue = {
    getUserData,
    setUserData,
    clearUserData,
    login,
    register,
    logout,
    errors,
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
