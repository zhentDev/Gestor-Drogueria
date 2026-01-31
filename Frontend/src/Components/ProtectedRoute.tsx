import { Navigate, Outlet, useLocation } from 'react-router-dom';

interface ProtectedRouteProps {
    isAllowed: boolean;
    children?: React.ReactNode;
    redirectTo?: string | null;
}

export const ProtectedRoute = ({ isAllowed, children, redirectTo = "/login" }: ProtectedRouteProps) => {
    const location = useLocation(); // Obtener la ubicación actual
    console.log(isAllowed);
    if (!isAllowed) {
        // Pasar la ubicación actual como estado a la página de login
        return <Navigate to={redirectTo ? redirectTo : "/login"} state={{ from: location }} />;
    }

    return children ? children : <Outlet />
}