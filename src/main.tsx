import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { PreferencesProvider } from "@/context/PreferencesContext"
import { AuthProvider } from "@/context/AuthContext"
import App from './App.tsx'
import '@/styles/global.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <PreferencesProvider>
      <AuthProvider>
        <App></App>
      </AuthProvider>
    </PreferencesProvider>
  </StrictMode>,
)
