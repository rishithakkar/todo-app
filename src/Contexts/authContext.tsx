import React, { useState, useEffect, createContext } from "react";
import { ChildrenProps } from "./deleteContext";
import { useNavigate } from "react-router-dom";

export interface UserDataProps {
  userId: string | null;
}

export type AuthType = {
  userData: UserDataProps;
  setUserData: Function;
  loading: boolean;
  handleLoading: (flag: boolean) => void;
};

const AuthContext = createContext<AuthType | null>(null);

export const AuthProvider: React.FC<ChildrenProps> = ({ children }) => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({ userId: null });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (userData.userId) {
      // Navigate to home page if user is logged in
      navigate("/");
    }
  }, [userData.userId]);

  const handleLoading = (flag: boolean) => {
    setLoading(flag);
  };

  return (
    <AuthContext.Provider
      value={{ userData, setUserData, loading, handleLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
