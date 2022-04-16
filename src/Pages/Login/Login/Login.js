import React, { useRef } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import auth from '../../../firebase.init';
import SocialLogin from '../SocialLogin/SocialLogin';

const Login = () => {
    const emailRef = useRef('')
    const passRef = useRef('')
    const navigate = useNavigate()
    const location = useLocation()
    let from = location.state?.from?.pathname || "/";

    const [
        signInWithEmailAndPassword,
        user,
        loading,
        error,
    ] = useSignInWithEmailAndPassword(auth);
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
                    <Button className='text-center' variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
                <p>New to Wasy's car ?<Link to="/register" onClick={navigateRegister} className='text-danger pe-auto text-decoration-none'>Please register.</Link></p>
                <SocialLogin></SocialLogin>
            </div>
        </div>
    );
};

export default Login;