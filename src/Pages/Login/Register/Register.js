import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import auth from '../../../firebase.init';
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';
import './Register.css'
import SocialLogin from '../SocialLogin/SocialLogin';

const Register = () => {
    const [
        createUserWithEmailAndPassword,
        user,
        loading,
        error,
    ] = useCreateUserWithEmailAndPassword(auth);
    const navigate = useNavigate()
    const navigateLogin = () => {
        navigate('/login')
    }
    if (user) {
        navigate('/home')
    }

    const handleRegister = event => {
        event.preventDefault()
        const name = event.target.name.value
        const email = event.target.email.value
        const password = event.target.password.value
        createUserWithEmailAndPassword(email, password)

    }
    return (
        <div className='register-form'>
            <h1 style={{ textAlign: 'center', color: '#0d6efd' }}>Please registeer</h1>
            <form onSubmit={handleRegister}>
                <input type='text' name='name' id='' placeholder='Your name' />
                <input type='email' name='email' id='' placeholder='Email address' />
                <input type='password' name='password' id='' placeholder='Password' />
                <input type='submit' value='Register' id='' />
            </form>
            <p>Already have an account?<Link to="/login" onClick={navigateLogin} className='text-danger pe-auto text-decoration-none'>Please login.</Link></p>
            <SocialLogin></SocialLogin>
        </div>
    );
};

export default Register;