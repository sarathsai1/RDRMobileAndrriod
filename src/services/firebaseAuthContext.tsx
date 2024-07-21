// AuthContext.tsx
import React, { createContext, useContext, ReactNode, useState } from 'react';
import { FirebaseAuthTypes } from '@react-native-firebase/auth';

interface AuthContextType {
  confirmationResult: FirebaseAuthTypes.ConfirmationResult | undefined;
  setConfirmationResult: (value: FirebaseAuthTypes.ConfirmationResult | undefined) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [confirmationResult, setConfirmationResult] = useState<FirebaseAuthTypes.ConfirmationResult>();

  const value = {
    confirmationResult,
    setConfirmationResult,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
