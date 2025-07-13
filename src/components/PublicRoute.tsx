import { Navigate } from "react-router";
import { useAuth } from "@/context/AuthContextHook";
import type { ComponentLayout } from "@/types/Component";

const PublicRoute: React.FC<ComponentLayout> = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <div>Cargando...</div>;
  }

  return isAuthenticated ? <Navigate to="/" replace /> : <>{children}</>;
};

export default PublicRoute;