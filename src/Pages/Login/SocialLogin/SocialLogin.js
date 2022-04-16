import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGoogle } from '@fortawesome/free-brands-svg-icons'
import { faFacebook } from '@fortawesome/free-brands-svg-icons'
import { faGithub } from '@fortawesome/free-brands-svg-icons'
import { useSignInWithGithub, useSignInWithGoogle } from 'react-firebase-hooks/auth';
import auth from '../../../firebase.init';
import { useNavigate } from 'react-router-dom';

const SocialLogin = () => {
    const navigate = useNavigate()
    const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);
    let errorElement;
    if (error) {
        errorElement = <div>
            <p className='text-danger'>Error: {error.message}</p>
        </div>
    }
    if (user) {
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
                <button className='btn btn-warning w-50 p-2'><FontAwesomeIcon icon={faGithub} className="mx-2" />Github sing in</button>
            </div>
        </div>
    );
};

export default SocialLogin;