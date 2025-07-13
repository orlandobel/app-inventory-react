import { Navigate, Outlet } from "react-router";
import { useAuth } from "@/context/AuthContextHook";

const PrivateRoute = () => {
    const { isAuthenticated, isLoading } = useAuth();

    if (isLoading) {
        return <div>Cargando...</div>; //más adelante un <SplashScreen />
    }

    return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
}

export default PrivateRoute;