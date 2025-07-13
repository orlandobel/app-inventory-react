import type { ReactNode } from "react";

// Preference types
export type Theme = 'light' | 'dark';
export type Language = 'en' | 'es';

// Preferences state
export interface PreferencesState {
  theme: Theme;
  language: Language;
}

// Preferences actions
export type PreferencesAction = 
  | { type: 'SET_THEME'; payload: Theme }
  | { type: 'SET_LANGUAGE'; payload: Language }
  | { type: 'TOGGLE_THEME' }
  | { type: 'LOAD_PREFERENCES'; payload: PreferencesState };

// Context value interface
export interface PreferencesContextValue extends PreferencesState {
  setTheme: (theme: Theme) => void;
  setLanguage: (language: Language) => void;
  toggleTheme: () => void;
}

// Preferences provider component
export interface PreferencesProviderProps {
  children: ReactNode;
}