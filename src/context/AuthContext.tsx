import React, { useReducer, useEffect } from 'react';
import type { AuthState, LoginCredentials, AuthAction, AuthContextValue } from "../types/auth";
import { mockUser } from "../data/mockUsers"
import { AuthContext } from "./AuthContextHook"
import type { ComponentLayout } from '@/types/Component';
// Mock credentials
const validCredentials = {
  username: 'admin',
  password: 'password123',
};

// Auth reducer
const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case 'LOGIN_START':
      return { ...state, isLoading: true };
    case 'LOGIN_SUCCESS':
      return {
        user: action.payload,
        isAuthenticated: true,
        isLoading: false,
      };
    case 'LOGIN_FAILURE':
      return {
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: action.payload,
      };
    case 'LOGOUT':
      return {
        user: null,
        isAuthenticated: false,
        isLoading: false,
      };
    case 'RESTORE_SESSION':
      return {
        user: action.payload,
        isAuthenticated: true,
        isLoading: false,
      };
    default:
      return state;
  }
};

// Initial state
const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  isLoading: true, // Start with loading to check for existing session
};

export const AuthProvider: React.FC<ComponentLayout> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Check for existing session on mount
  useEffect(() => {
    const checkExistingSession = () => {
      const rememberedUser = localStorage.getItem('rememberedUser');
      const sessionUser = sessionStorage.getItem('currentUser');
      
      if (rememberedUser) {
        try {
          const user = JSON.parse(rememberedUser);
          dispatch({ type: 'RESTORE_SESSION', payload: user });
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (error) {
          localStorage.removeItem('rememberedUser');
          dispatch({ type: 'LOGIN_FAILURE', payload: 'Invalid session data' });
        }
      } else if (sessionUser) {
        try {
          const user = JSON.parse(sessionUser);
          dispatch({ type: 'RESTORE_SESSION', payload: user });
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (error) {
          sessionStorage.removeItem('currentUser');
          dispatch({ type: 'LOGIN_FAILURE', payload: 'Invalid session data' });
        }
      } else {
        dispatch({ type: 'LOGOUT' });
      }
    };

    checkExistingSession();
  }, []);

  // Login function
  const login = async (credentials: LoginCredentials): Promise<boolean> => {
    dispatch({ type: 'LOGIN_START' });

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Validate credentials
    if (
      credentials.username === validCredentials.username &&
      credentials.password === validCredentials.password
    ) {
      dispatch({ type: 'LOGIN_SUCCESS', payload: mockUser });
      
      // Store user session
      if (credentials.rememberMe) {
        localStorage.setItem('rememberedUser', JSON.stringify(mockUser));
      } else {
        sessionStorage.setItem('currentUser', JSON.stringify(mockUser));
      }
      
      return true;
    } else {
      dispatch({ type: 'LOGIN_FAILURE', payload: 'Invalid credentials' });
      return false;
    }
  };

  // Logout function
  const logout = () => {
    dispatch({ type: 'LOGOUT' });
    localStorage.removeItem('rememberedUser');
    sessionStorage.removeItem('currentUser');
  };

  const value: AuthContextValue = {
    ...state,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
