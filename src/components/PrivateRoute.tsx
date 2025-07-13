import { Navigate } from "react-router";
import { useAuth } from "@/context/AuthContextHook";
import Layout from "@/components/Layout";
const PrivateRoute = () => {
    const { isAuthenticated, isLoading } = useAuth();

    if (isLoading) {
        return <div>Cargando...</div>; //más adelante un <SplashScreen />
    }

    return isAuthenticated ? <Layout /> : <Navigate to="/login" replace />;
}

export default PrivateRoute;