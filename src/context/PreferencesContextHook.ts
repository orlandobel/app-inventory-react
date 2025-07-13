import type { PreferencesContextValue } from "@/types/PreferencesContextType";
import { createContext, useContext } from "react";

// Create context
export const PreferencesContext = createContext<PreferencesContextValue | undefined>(undefined);
export const usePreferences = (): PreferencesContextValue => {
  const context = useContext(PreferencesContext);
  if (context === undefined) {
    throw new Error('usePreferences must be used within a PreferencesProvider');
  }
  return context;
};