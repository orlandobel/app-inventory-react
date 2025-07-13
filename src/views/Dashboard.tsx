import React from "react";
import { useAuth } from "@/context/AuthContextHook";
import { usePreferences } from "@/context/PreferencesContextHook";

const Dashboard: React.FC = () => {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = usePreferences();

  return (
    <div className="dashboard">
      <h1>Bienvenido, {user?.username}</h1>
      <p>Rol: {user?.role}</p>
      <p>Tema actual: {theme}</p>

      <button onClick={toggleTheme}>Cambiar tema</button>
      <button onClick={logout}>Cerrar sesión</button>
    </div>
  );
};

export default Dashboard;
