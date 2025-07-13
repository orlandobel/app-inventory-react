import type { AuthContextValue } from "@/types/auth";
import { createContext, useContext } from "react";

// Create context
export const AuthContext = createContext<AuthContextValue | undefined>(undefined);
// Custom hook to use auth context
export const useAuth = (): AuthContextValue => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};