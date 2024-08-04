import DashboardPage from '@/pages/DashboardPage.jsx';
import EditResumePage from '@/pages/EditResumePage.jsx';
import SignInPage from '@/pages/SignInPage.jsx';
import SignUpPage from '@/pages/SignUpPage.jsx';
import ViewResumePage from '@/pages/ViewResumePage.jsx';
import ProtectedRoutes from '@/router/ProtectedRoutes.jsx';
import PublicRoutes from '@/router/PublicRoutes.jsx';
import { createBrowserRouter, Navigate } from 'react-router-dom';

const router = createBrowserRouter([
    {
        element: <ProtectedRoutes />,
        children: [
            {
                path: '/',
                element: <Navigate to="/dashboard" />,
            },
            {
                path: '/dashboard',
                element: <DashboardPage />,
            },
            {
                path: '/dashboard/resume/:resumeId/edit',
                element: <EditResumePage />,
            },
            {
                path: '/my-resume/:resumeId/view',
                element: <ViewResumePage />,
            },
        ],
    },
    {
        element: <PublicRoutes />,
        children: [
            {
                path: '/auth/sign-in',
                element: <SignInPage />,
            },
            {
                path: '/auth/sign-up',
                element: <SignUpPage />,
            },
        ],
    },
]);

export default router;
