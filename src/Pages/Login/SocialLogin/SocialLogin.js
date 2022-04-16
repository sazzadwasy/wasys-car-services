import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee } from '@fortawesome/free-solid-svg-icons'

const SocialLogin = () => {
    return (
        <div>
            <div className='d-flex align-items-center'>
                <div style={{ height: '2px', width: '50%', backgroundColor: 'gray' }}></div>
                <p className='mt-2 px-2 fw-bold'>or</p>
                <div style={{ height: '2px', width: '50%', backgroundColor: 'gray' }}></div>
            </div>
            <div className='text-center'>
                <button className='btn btn-success w-50 mb-2'><FontAwesomeIcon icon={faCoffee} className="mx-2" />Google sing in</button>
                <br />
                <button className='btn btn-success w-50  mb-2'><FontAwesomeIcon icon={faCoffee} className="mx-2" />Facebook sing in</button>
                <br />
                <button className='btn btn-success w-50 '><FontAwesomeIcon icon={faCoffee} className="mx-2" />Github sing in</button>
            </div>
        </div>
    );
};

export default SocialLogin;