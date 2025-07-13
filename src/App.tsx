import { BrowserRouter as Router, Routes, Route } from "react-router";
import { useAuth } from "@/context/AuthContextHook";
import { usePreferences } from "@/context/PreferencesContextHook";
import Login from "@/views/auth/Login"
import Dashboard from "@/views/Dashboard"
import PrivateRoute from "@/components/PrivateRoute"
import PublicRoute from "@/components/PublicRoute";
import Suppliers from "@/views/suppliers/Suppliers";
import Orders from "@/views/orders/Orders";
import CreateOrder from "@/views/orders/CreateOrder";
import CustomerShipments from "@/views/orders/CustomerShipments";
import CreateCustomerShipment from "@/views/orders/CreateCustomerShipment";

function AppContent() {
  const { theme } = usePreferences();
  const { isLoading } = useAuth();

  if (isLoading) {
    return <div>Cargando...</div>; // splash o spinner a futuro
  }

  return (
    <div className={`app ${theme}`}>
      <Routes>
        {/* Ruta pública protegida */}
        <Route path="/login" element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        } />

        {/* Rutas privadas */}
        <Route element={<PrivateRoute />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/orders/new" element={<CreateOrder />} />
          <Route path="/shipments" element={<CustomerShipments />} />
          <Route path="/shipments/new" element={<CreateCustomerShipment />} />
          <Route path="/suppliers" element={<Suppliers />} />
        </Route>

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