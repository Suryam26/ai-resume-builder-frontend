import { useUser } from '@clerk/clerk-react';
import { Navigate, Outlet } from 'react-router-dom';

function PublicRoutes() {
    const { isLoaded, isSignedIn } = useUser();

    if (isLoaded && isSignedIn) {
        return <Navigate to="/" />;
    }

    return <Outlet />;
}

export default PublicRoutes;
