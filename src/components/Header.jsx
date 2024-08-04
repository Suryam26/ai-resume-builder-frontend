import { Button } from '@/components/ui/button.jsx';
import { UserButton, useUser } from '@clerk/clerk-react';
import { Link } from 'react-router-dom';

function Header() {
    const { isSignedIn } = useUser();
    return (
        <div className="not-print flex justify-between p-3 px-5 shadow-md">
            <Link to="/">
                <img src="/logo.svg" width="40" height="40" alt="logo" />
            </Link>

            {isSignedIn ? (
                <div className="flex items-center gap-2">
                    <Link to={'/dashboard'}>
                        <Button variant="outline">Dashboard</Button>
                    </Link>
                    <UserButton />
                </div>
            ) : (
                <Link to={'/auth/sign-in'}>
                    <Button>Get Started</Button>
                </Link>
            )}
        </div>
    );
}

export default Header;
