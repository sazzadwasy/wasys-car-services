
import React, { useRef } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useSendPasswordResetEmail, useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import auth from '../../../firebase.init';
import SocialLogin from '../SocialLogin/SocialLogin';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Helmet } from 'react-helmet-async';

const Login = () => {
    const emailRef = useRef('')
    const passRef = useRef('')
    const navigate = useNavigate()
    const location = useLocation()
    let from = location.state?.from?.pathname || "/";

    let errorElement;
    const [sendPasswordResetEmail] = useSendPasswordResetEmail(auth)
    const [
        signInWithEmailAndPassword,
        user,
        loading,
        error,
    ] = useSignInWithEmailAndPassword(auth);
    if (error) {
        errorElement = <p className='text-danger'>Error: {error?.message}</p>
    }
    if (user) {
        navigate(from, { replace: true });
    }

    const handleSubmit = event => {
        event.preventDefault()
        const email = emailRef.current.value
        const pass = passRef.current.value
        console.log({ email, pass })
        signInWithEmailAndPassword(email, pass)

    }
    const navigateRegister = () => {
        navigate('/register')
    }
    const resetPassword = async () => {
        const email = emailRef.current.value
        if (email) {
            await sendPasswordResetEmail(email)
            toast('Email sent.')
        }
        else {
            toast('Please enter your email')
        }
    }

    return (
        <div>
            <Helmet>
                <title>Login - wasys car services</title>
            </Helmet>
            <h1 className='text-primary text-center'>Please LogIn</h1>
            <div className='w-50 mx-auto'>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Control ref={emailRef} type="email" placeholder="Enter email" required />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Control ref={passRef} type="password" placeholder="Password" required />
                    </Form.Group>
                    <Button className='text-center w-50 mx-auto d-block' variant="primary" type="submit">
                        LogIn
                    </Button>
                </Form>
                <br />
                {errorElement}
                <p className='mt-2'>New to Wasy's car ? <Link to="/register" onClick={navigateRegister} className='text-primary pe-auto text-decoration-none'> Please register.</Link></p>
                <p className='mt-2'>Forget password ?<button
                    onClick={resetPassword}
                    className='text-primary pe-auto text-decoration-none btn btn-link'>Reset password</button></p>
                <SocialLogin></SocialLogin>
            </div>
        </div>
    );
};

export default Login;