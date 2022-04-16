import { async } from '@firebase/util';
import React, { useRef } from 'react';
import { Alert, Button, Form } from 'react-bootstrap';
import { useSendPasswordResetEmail, useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import auth from '../../../firebase.init';
import SocialLogin from '../SocialLogin/SocialLogin';

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
        console.log(user)
        navigate(from, { replace: true });
    }

    const handleSubmit = event => {
        event.preventDefault()
        const email = emailRef.current.value
        const pass = passRef.current.value
        signInWithEmailAndPassword(email, pass)
    }
    const navigateRegister = () => {
        navigate('/register')
    }
    const resetPassword = async () => {
        const email = emailRef.current.value
        await sendPasswordResetEmail(email)
        alert('email sent')
    }

    return (
        <div>
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
                <p className='mt-2'>Forget password ? <Link to="/register" onClick={resetPassword} className='text-primary pe-auto text-decoration-none'>Reset password</Link></p>
                <SocialLogin></SocialLogin>
            </div>
        </div>
    );
};

export default Login;