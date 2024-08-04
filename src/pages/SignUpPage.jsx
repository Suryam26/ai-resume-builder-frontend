import { SignUp } from '@clerk/clerk-react';

function SignUpPage() {
    return (
        <div className="my-20 flex items-center justify-center">
            <SignUp signInUrl="/auth/sign-in" />
        </div>
    );
}

export default SignUpPage;
