import { Navigate, Outlet } from 'react-router-dom';

interface ProtectedRouteProps {
    isAllowed: boolean;
    children?: React.ReactNode;
    redirectTo?: string | null;
}

export const ProtectedRoute = ({ isAllowed, children, redirectTo = "/login" }: ProtectedRouteProps) => {
    console.log(isAllowed);
    if (!isAllowed) {
        return <Navigate to={redirectTo ? redirectTo : "/login"} />;
    }

    return children ? children : <Outlet />
}