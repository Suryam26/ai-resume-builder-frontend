import Header from '@/components/Header.jsx';
import { Toaster } from '@/components/ui/sonner.jsx';
import { useUser } from '@clerk/clerk-react';
import { Navigate, Outlet } from 'react-router-dom';

function ProtectedRoutes() {
    const { isLoaded, isSignedIn } = useUser();

    if (isLoaded && !isSignedIn) {
        return <Navigate to="/auth/sign-in" />;
    }

    return (
        <>
            <Header />
            <Outlet />
            <Toaster />
        </>
    );
}

export default ProtectedRoutes;
