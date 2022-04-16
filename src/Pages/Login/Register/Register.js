import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import auth from '../../../firebase.init';
import { useCreateUserWithEmailAndPassword, useUpdateProfile } from 'react-firebase-hooks/auth';
import './Register.css'
import SocialLogin from '../SocialLogin/SocialLogin';

const Register = () => {
    const [agree, setAgree] = useState(false)
    const [updateProfile, updating, updateError] = useUpdateProfile(auth);
    const [
        createUserWithEmailAndPassword,
        user,
        loading,
        error,
    ] = useCreateUserWithEmailAndPassword(auth, { sendEmailVerification: true });
    const navigate = useNavigate()
    const navigateLogin = () => {
        navigate('/login')
    }
    if (user) {
        console.log(user)
    }

    const handleRegister = async (event) => {
        event.preventDefault()
        const name = event.target.name.value
        const email = event.target.email.value
        const password = event.target.password.value
        // const agree = event.target.terms.checked
        // if(agree){}
        await createUserWithEmailAndPassword(email, password)
        await updateProfile({ displayName: name });
        console.log('updated profile')
        navigate('/home')
    }
    return (
        <div className='register-form'>
            <h1 style={{ textAlign: 'center', color: '#0d6efd' }}>Please registeer</h1>
            <form onSubmit={handleRegister}>
                <input type='text' name='name' id='' placeholder='Your name' />
                <input type='email' name='email' id='' placeholder='Email address' required />
                <input type='password' name='password' id='' placeholder='Password' required />
                <input onClick={() => setAgree(!agree)} type='checkbox' name='terms' id='terms' />
                {/* <label className={agree ? 'ps-2' : 'text-danger ps-2'} htmlFor='terms'> Accept Wasys car all terms and conditions.</label> */}
                <label className={`ps-2 ${agree ? '' : 'text-danger'}`} htmlFor='terms'> Accept Wasys car all terms and conditions.</label>
                <input
                    disabled={!agree}
                    className='btn btn-primary mt-2'
                    type='submit'
                    value='Register' id='' />
            </form>
            <p>Already have an account ? <Link to="/login" onClick={navigateLogin} className='text-primary pe-auto text-decoration-none'>Please login.</Link></p>
            <SocialLogin></SocialLogin>
        </div>
    );
};

export default Register;