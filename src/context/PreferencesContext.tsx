import type { Language, PreferencesAction, PreferencesContextValue, PreferencesProviderProps, PreferencesState, Theme } from '../types/PreferencesContextType';
import React, { useReducer, useEffect } from 'react';
import { PreferencesContext } from "./PreferencesContextHook";


// Preferences reducer
const preferencesReducer = (state: PreferencesState, action: PreferencesAction): PreferencesState => {
  switch (action.type) {
    case 'SET_THEME':
      return { ...state, theme: action.payload };
    case 'SET_LANGUAGE':
      return { ...state, language: action.payload };
    case 'TOGGLE_THEME':
      return { ...state, theme: state.theme === 'light' ? 'dark' : 'light' };
    case 'LOAD_PREFERENCES':
      return action.payload;
    default:
      return state;
  }
};

// Initial state
const initialState: PreferencesState = {
  theme: 'light',
  language: 'en',
};

export const PreferencesProvider: React.FC<PreferencesProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(preferencesReducer, initialState);

  // Load preferences from localStorage on mount
  useEffect(() => {
    const loadPreferences = () => {
      try {
        const savedPreferences = localStorage.getItem('userPreferences');
        if (savedPreferences) {
          const preferences = JSON.parse(savedPreferences);
          dispatch({ type: 'LOAD_PREFERENCES', payload: preferences });
        }
      } catch (error) {
        console.error('Error loading preferences:', error);
        // Keep default preferences if loading fails
      }
    };

    loadPreferences();
  }, []);

  // Save preferences to localStorage whenever they change
  useEffect(() => {
    try {
      localStorage.setItem('userPreferences', JSON.stringify(state));
    } catch (error) {
      console.error('Error saving preferences:', error);
    }
  }, [state]);

  // Apply theme to document root
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', state.theme);

    // Also add a class for easier CSS targeting
    if (state.theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [state.theme]);

  // Set theme function
  const setTheme = (theme: Theme) => {
    dispatch({ type: 'SET_THEME', payload: theme });
  };

  // Set language function
  const setLanguage = (language: Language) => {
    dispatch({ type: 'SET_LANGUAGE', payload: language });
  };

  // Toggle theme function
  const toggleTheme = () => {
    dispatch({ type: 'TOGGLE_THEME' });
  };

  const value: PreferencesContextValue = {
    ...state,
    setTheme,
    setLanguage,
    toggleTheme,
  };

  return (
    <PreferencesContext.Provider value={value}>
      {children}
    </PreferencesContext.Provider>
  );
};