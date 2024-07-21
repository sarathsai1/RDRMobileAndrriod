import React, { createContext, useContext, ReactNode, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface User {
  data: {
    exp: number;
    [key: string]: any;
  };
  [key: string]: any;
}

interface AuthContextType {
  user: User | null;
  getUser: () => Promise<User | null>;
  userIsAuthenticated: () => Promise<boolean>;
  userLogin: (user: User) => Promise<void>;
  userLogout: () => Promise<void>;
  confirmationResult: any;
  setConfirmationResult: (value: any) => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [confirmationResult, setConfirmationResult] = useState<any>(null);

  useEffect(() => {
    const loadUser = async () => {
      const storedUser = await AsyncStorage.getItem('user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    };
    loadUser();
  }, []);

  const getUser = async (): Promise<User | null> => {
    const storedUser = await AsyncStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
  };

  const userIsAuthenticated = async (): Promise<boolean> => {
    const storedUser = await AsyncStorage.getItem('user');
    if (!storedUser) {
      return false;
    }
    const parsedUser: User = JSON.parse(storedUser);

    if (Date.now() > parsedUser.data.exp * 1000) {
      await userLogout();
      return false;
    }
    return true;
  };

  const userLogin = async (user: User): Promise<void> => {
    await AsyncStorage.setItem('user', JSON.stringify(user));
    setUser(user);
  };

  const userLogout = async (): Promise<void> => {
    await AsyncStorage.removeItem('user');
    setUser(null);
  };

  const contextValue: AuthContextType = {
    user,
    getUser,
    userIsAuthenticated,
    userLogin,
    userLogout,
    confirmationResult,
    setConfirmationResult,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
