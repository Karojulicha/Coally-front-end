import React, { useContext, createContext, useState, useEffect } from "react";
import { AuthResponse } from "../types/types";

interface AuthProviderProps {
    children: React.ReactNode;
}

const AuthContext = createContext({
    isAuthenticated: false,
    getAccessToken: () => {},
    saveUser: (userData: AuthResponse) => {},
});

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [accessToken, setAccessToken] = useState<string>();
  const [refreshToken, setRefreshToken] = useState<string>();


  useEffect(()=> {}, [])

  const checkAuth= () => {
    if(accessToken) {

    }else{
      

    }
  }

  const getAccessToken = () => {
      return accessToken
  };

  const saveUser = (userData:AuthResponse) => {
    setAccessToken(userData.body.token);
    setRefreshToken(userData.body.refreshToken);
    localStorage.setItem("token", JSON.stringify(userData.body.refreshToken));
    setIsAuthenticated(true);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, getAccessToken, saveUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
