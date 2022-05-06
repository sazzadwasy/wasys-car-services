import React from 'react';
import { useAuthState, useSendEmailVerification } from 'react-firebase-hooks/auth';
import { Navigate, useLocation } from 'react-router-dom';
import auth from '../../../firebase.init';
import Loading from '../../Shared/Loading/Loading';
const RequireAuth = ({ children }) => {
    const [user, loading] = useAuthState(auth);
    const location = useLocation()
    const [sendEmailVerification, sending, error] = useSendEmailVerification(auth);
    if (loading) {
        return <Loading></Loading>
    }
    if (!user) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }
    if (user.providerData[0]?.providerId === 'password' && !user.emailVerified) {
        return <div className='text-center'>
            <h3 className='text-primary mt-4'>Your email was not varified!</h3>
            <h4 className='text-success'>Please varify your email address.</h4>
            <button
                className='btn btn-success'
                onClick={async () => {
                    await sendEmailVerification();
                    alert('Sent email');
                }}
            >
                Verify email
            </button>
        </div>
    }
    return children;
};

export default RequireAuth;