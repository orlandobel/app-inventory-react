import { BrowserRouter as Router, Routes, Route } from "react-router";
import { useAuth } from "@/context/AuthContextHook";
import { usePreferences } from "@/context/PreferencesContextHook";
import Login from "@/views/auth/Login"
import Dashboard from "@/views/Dashboard"
import PrivateRoute from "@/components/PrivateRoute"

function AppContent() {
  const { theme } = usePreferences();
  const { isLoading } = useAuth();

  if (isLoading) {
    return <div>Cargando...</div>; // spinner opcional
  }

  return (
    <div className={`app ${theme}`}>
      <Routes>
        {/* Ruta pública */}
        <Route path="/login" element={<Login />} />

        {/* Rutas privadas */}
        <Route element={<PrivateRoute />}>
          <Route path="/" element={<Dashboard />} />
          {/* Aquí puedes agregar más rutas privadas después */}
        </Route>

        {/* Ruta por defecto si no existe */}
        <Route path="*" element={<div>Página no encontrada</div>} />
      </Routes>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}