import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGoogle } from '@fortawesome/free-brands-svg-icons'
import { faFacebook } from '@fortawesome/free-brands-svg-icons'
import { faGithub } from '@fortawesome/free-brands-svg-icons'
import { useSignInWithGithub, useSignInWithGoogle } from 'react-firebase-hooks/auth';
import auth from '../../../firebase.init';
import { useNavigate } from 'react-router-dom';
import Loading from '../../Shared/Loading/Loading';

const SocialLogin = () => {
    const navigate = useNavigate()
    const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);
    const [signInWithGithub, user1, loading1, error1] = useSignInWithGithub(auth);
    let errorElement;
    if (error || error1) {
        errorElement = <p className='text-danger'>Error: {error?.message} {error1?.message}</p>
    }
    if (loading || loading1) {
        return <Loading></Loading>
    }
    if (user || user1) {
        navigate('/home')
    }
    return (
        <div>
            <div className='d-flex align-items-center'>
                <div style={{ height: '2px', width: '50%', backgroundColor: 'gray' }}></div>
                <p className='mt-2 px-2 fw-bold'>or</p>
                <div style={{ height: '2px', width: '50%', backgroundColor: 'gray' }}></div>
            </div>
            {errorElement}
            <div className='text-center'>
                <button onClick={() => signInWithGoogle()} className='btn btn-danger w-50 mb-2 p-2'><FontAwesomeIcon icon={faGoogle} className="mx-2" />Google sing in</button>
                <br />
                <button className='btn btn-secondary w-50  mb-2 p-2'><FontAwesomeIcon icon={faFacebook} className="mx-2" />Facebook sing in</button>
                <br />
                <button onClick={() => signInWithGithub()} className='btn btn-warning w-50 p-2'><FontAwesomeIcon icon={faGithub} className="mx-2" />Github sing in</button>
            </div>
        </div>
    );
};

export default SocialLogin;